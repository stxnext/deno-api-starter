import { Database, PostgresConnector } from "denodb";
import Models from "../../domain/user/models/index.ts"
import { Application } from "oak";

import { DataTypes, Model } from 'denodb';
import { AppState } from "../../types/state.ts";
import { Logger } from "./logger.ts";


class MigrationsModel extends Model {
    static table = Deno.env.get('POSTGRES_MIGRATIONS_TABLE_NAME') as string;
    static timestamps = true;
    static fields = {
        id: { primaryKey: true, autoIncrement: true },
        name: DataTypes.STRING,
    };
}

export class DatabaseMigrations {
    appliedMigrations: string[]
    migrationsFiles: string[]
    migrationsToApply: string[]
    logger: Logger
    db: Database
    constructor(db: Database) {
        this.appliedMigrations = []
        this.migrationsFiles = []
        this.migrationsToApply = []
        this.logger = new Logger({ logLevel: Number(Deno.env.get("LOG_LEVEL")), requestId: "migration" });
        this.db = db
    }

    public async syncMigrations() {
        await this.db.link([MigrationsModel])
        await this.db.sync()
        this.appliedMigrations = (await MigrationsModel.all()).map(migrationModel => migrationModel.name) as string[]
        await this.readMigrationsFromFolder()
        this.checkMigrations()
        await this.applyMigrations()
    }

    private async applyMigrations() {
        if (this.migrationsToApply.length) {
            this.logger.info(`Migrations to apply: ${this.migrationsToApply.join(', ')}`)
        }
        for await (const migrationName of this.migrationsToApply) {
            const migrationSource = await import(`${Deno.cwd()}/migrations/${migrationName}`);
            const migrationClassName = this.getModuleName(migrationName)
            await this.runAndSaveMigration(migrationSource, migrationClassName, migrationName)
        }
    }

    private async runAndSaveMigration(migrationSource: any, migrationClassName: string, migrationName: string) {
        this.logger.info(`Appling migration: ${migrationName} with class ${migrationClassName}`)
        const migrationClass = new migrationSource[migrationClassName]()
        await migrationClass.up(this.db.getClient())
        MigrationsModel.create({ name: migrationName })
        this.logger.info(`Migration (${migrationName}) applied successfully`)
    }

    private checkMigrations() {
        this.migrationsToApply = this.migrationsFiles.filter(migrationName => !this.appliedMigrations.includes(migrationName))
    }

    private async readMigrationsFromFolder() {
        const migrationsFiles = Deno.readDir(`${Deno.cwd()}/migrations/`)
        for await (const dirEntry of migrationsFiles) {
            if (dirEntry.isFile) {
                this.migrationsFiles.push(dirEntry.name)
            }
        }
        this.migrationsFiles.sort((a, b) => a.localeCompare(b))
    }

    private getModuleName(fileName: string): string {
        const dateMigration = fileName.split('-')[0]

        const firstPartRaw = this.removeExtension(fileName.replace(`${dateMigration}-`, ''))
        const firstPart = firstPartRaw.charAt(0).toUpperCase() + firstPartRaw.slice(1)

        return `${firstPart}${dateMigration}`
    }

    private removeExtension(fileName: string): string {
        return fileName.replace(/.ts/g, "")
    }
}