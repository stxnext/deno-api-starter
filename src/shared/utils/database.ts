import { Pool, PoolClient, ClientOptions , Transaction } from "postgres";

interface DatabaseDependencies {
  dbOptions: ClientOptions;
  poolSize: number;
  lazyConnections: boolean;
}

export class Database {
  private pool: Pool | undefined;
  constructor(private readonly dependencies: DatabaseDependencies) {}

  private getPool(): Pool {
    if(this.pool) return this.pool;
    const {dbOptions, poolSize, lazyConnections} = this.dependencies;
    this.pool = new Pool(dbOptions, poolSize, lazyConnections);
    return this.pool;
  }

  public getClient(): Promise<PoolClient> {
    return this.getPool().connect();
  }

  public createTransaction(payload: {requestId: string, client: PoolClient}): Transaction {
    const { requestId, client } = payload;
    const transaction = client.createTransaction(requestId);
    transaction.begin();
    return transaction;
  }

  public async release(payload: {transaction: Transaction, client: PoolClient}) {
    const { transaction, client } = payload;
    await transaction.commit();
    client.release();
  }
}