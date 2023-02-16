import Pool from "./pool";
import config from "./config"
import { QueryResult } from 'pg';


export class UserRepo {
  pool: Pool;

  constructor(pool: Pool) {
    this.pool = pool;
  }

  async getUser(email: string): Promise<QueryResult> {
    const sql = 'SELECT * FROM users WHERE email = $1';
    const params = [email];

    return this.pool.query(sql, params);
  }

  async createUser(email: string, password: string, age: number, country: string): Promise<QueryResult> {
    const sql = 'INSERT INTO users (email, password, age, country) VALUES ($1, $2, $3, $4)';
    const params = [email, password, age, country];

    return this.pool.query(sql, params);
  }
}


const user = new UserRepo(new Pool(config.users))

export default user