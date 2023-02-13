import pg, { PoolConfig, QueryResult } from 'pg';

export class Pool {
  pool: pg.Pool;
  config: PoolConfig;

  constructor(config: PoolConfig) {
    this.config = config;
    this.pool = new pg.Pool(config);
  }

  close() {
    return this.pool.end();
  }

  query(sql: string, params: any[] = []): Promise<QueryResult> {
    return this.pool.query(sql, params);
  }
}

export default Pool;