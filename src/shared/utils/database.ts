import { Database, PostgresConnector } from "denodb";
import Models from "../../domain/user/models/index.ts"

export class DatabaseConnector {
  public connect(): Database {
    const connection = new PostgresConnector({
      host: Deno.env.get("POSTGRES_HOSTNAME") as string,
      username: Deno.env.get("POSTGRES_USER") as string,
      password: Deno.env.get("POSTGRES_PASSWORD") as string,
      database: Deno.env.get("POSTGRES_DB") as string,
    });
    const db = new Database(connection);
    this.linkModels(db)
    return db
  }

  public linkModels(db: Database): Database {
    db.link(Models);
    return db
  }
  public async syncDb(db: Database): Promise<Database> {
    await db.sync();
    return db
  }
}