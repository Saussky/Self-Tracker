import Pool from '../pool';
import config from '../config';
import { QueryResult } from 'pg';

export class TimerRepo {
  pool: Pool;

  constructor(pool: Pool) {
    this.pool = pool;
  }

  async createTimer(
    name: string,
    frequency: string,
    dateOfLastUse: Date,
    timeElapsedToday: number,
    timeElapsedAll: number,
    userEmail: string
  ): Promise<QueryResult> {
    const sql =
      'INSERT INTO timers (name, frequency, date_of_last_use, time_elapsed_today, time_elapsed_all, user_email) VALUES ($1, $2, $3, $4, $5, $6)';
    const params = [name, frequency, dateOfLastUse, timeElapsedToday, timeElapsedAll, userEmail];

    return this.pool.query(sql, params);
  }

  async getTimersByUserEmail(userEmail: string): Promise<QueryResult> {
    const sql = 'SELECT * FROM timers WHERE user_email = $1';
    const params = [userEmail];

    return this.pool.query(sql, params);
  }

  async getTimerById(id: string): Promise<QueryResult> {
    const sql = 'SELECT * FROM timers WHERE id = $1';
    const params = [id];

    return this.pool.query(sql, params);
  }

  async updateTimer(
    id: string,
    name: string,
    frequency: string,
    dateOfLastUse: Date,
    timeElapsedToday: number,
    timeElapsedAll: number
  ): Promise<QueryResult> {
    const sql =
      'UPDATE timers SET name=$2, frequency=$3, date_of_last_use=$4, time_elapsed_today=$5, time_elapsed_all=$6 WHERE id = $1';
    const params = [id, name, frequency, dateOfLastUse, timeElapsedToday, timeElapsedAll];

    return this.pool.query(sql, params);
  }

  async deleteTimer(id: string): Promise<QueryResult> {
    const sql = 'DELETE FROM timers WHERE id = $1';
    const params = [id];

    return this.pool.query(sql, params);
  }
}

const timers = new TimerRepo(new Pool(config.timers));

export default timers;