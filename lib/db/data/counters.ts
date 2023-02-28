import Pool from '../pool';
import config from '../config';
import { QueryResult } from 'pg';

// There's two tables for counters
// counter_info holds the core information of the counter to load, such as it's name and it stores the unique ID
// counter_data stores the individual counter data for each session/day

export class CounterRepo {
  pool: Pool;

  constructor(pool: Pool) {
    this.pool = pool;
  }

  // Creates a counter for a user
  async createCounter(name: string, userEmail: string): Promise<void> {
    const sql = 'INSERT INTO counter_info (name, user_email) VALUES ($1, $2)';
    const params = [name, userEmail];

    await this.pool.query(sql, params);
  }

  // Gets all the timers the user has created
  async getCountersByEmail(userEmail: string): Promise<QueryResult> {
    const sql = 'SELECT * FROM counter_info WHERE user_email = ($1)';
    const params = [userEmail];

    return this.pool.query(sql, params);
  }

  // Enters in a counter to counter_data with the information from counter_info
  async startCounter(infoId: string): Promise<void> {
    const sql = "INSERT INTO counter_data (info_id) VALUES ($1) RETURNING id";
    const params = [infoId];

    try {
      const { rows } = await this.pool.query(sql, params);
      const generatedUUID = rows[0].id;
      return generatedUUID;
    } catch (e) {
      console.log(e)
    }
  }

  // Gets the counter if one has already been created today
  async getCounterByDate(infoId: string) {
    const sql = "SELECT * FROM counter_data WHERE info_id = ($1) AND date_created = CURRENT_DATE";
    const params = [infoId];
    const { rows } = await this.pool.query(sql, params)

    return rows
  }

  // Updates the count column for the counter
  async updateCounter(id: string, amount: number): Promise<void> {
    const sql = "UPDATE counter_data SET amount = amount + ($1) WHERE id = ($2)";
    const params = [amount, id]; 

    await this.pool.query(sql, params)
  }
}

const counters = new CounterRepo(new Pool(config.db));
export default counters;

