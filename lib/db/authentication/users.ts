import Pool from "../pool";
import config from "../config"
import { QueryResult } from 'pg';


export class UserRepo {
  pool: Pool;

  constructor(pool: Pool) {
    this.pool = pool;
  }

  async getUser(email: string): Promise<QueryResult> {
    return this.pool.query('SELECT * FROM users WHERE email = $1', [email]);
  }

  async createUser(email: string, password: string, age: number, country: string): Promise<QueryResult> {

    const verificationCode = "heythere"
    const sql = 'INSERT INTO users (email, password, age, country, verification, verified) VALUES ($1, $2, $3, $4, $5, $6)';
    const params = [email, password, age, country, verificationCode, false];

    return this.pool.query(sql, params);
  }
}


const user = new UserRepo(new Pool(config.db))

export default user