import { Database, PostgresConnector } from "denodb";
import Models from "../../domain/user/models/index.ts"
import { DatabaseMigrations } from "./migrations.ts";

export class DatabaseConnector {
  public async connect(): Promise<Database> {
    const connection = new PostgresConnector({
      host: Deno.env.get("POSTGRES_HOSTNAME") as string,
      username: Deno.env.get("POSTGRES_USER") as string,
      password: Deno.env.get("POSTGRES_PASSWORD") as string,
      database: Deno.env.get("POSTGRES_DB") as string,
    });
    const db = new Database({ connector: connection, debug: false });
    const migrations = new DatabaseMigrations(db)
    await migrations.syncMigrations()
    await this.linkModels(db)
    return db
  }

  private async linkModels(db: Database): Promise<Database> {
    await db.link(Models);
    return db
  }
  private async syncDb(db: Database): Promise<Database> {
    await db.sync();
    return db
  }
}