import Pool from '../pool';
import config from '../config';
import { QueryResult } from 'pg';
import { Duration } from 'luxon';

// There's two tables for timers
// timer_info holds the core information of the timer to load, such as it's name and it stores the unique ID
// timer_data stores the individual timer data for each session


export class TimerRepo {
  pool: Pool;

  constructor(pool: Pool) {
    this.pool = pool;
  }

  async createTimer(name: string, userEmail: string): Promise<void> {
    const sql =
      'INSERT INTO timer_info (name, user_email) VALUES ($1, $2)';
    const params = [name, userEmail];

    await this.pool.query(sql, params);
  }

  async getTimersByEmail(userEmail: string): Promise<QueryResult> {
    const sql = 'SELECT * FROM timer_info WHERE user_email = ($1)';
    const params = [userEmail];

    return this.pool.query(sql, params);
  }

  async startTimer(id: string): Promise<void> {
    const sql = "INSERT INTO timer_data (info_id) VALUES ($1) RETURNING id";
    const params = [id];

    try {
      const { rows } = await this.pool.query(sql, params);
      const generatedUUID = rows[0].id;
      return generatedUUID;
    } catch (e) {
      console.log('HERE')
      console.log(e)
    }
  }

  async updateTimer(id: string, timeElapsed: number): Promise<void> {
    const duration = Duration.fromObject({ seconds: timeElapsed });
    const isoDuration = duration.toISOTime();
    console.log(timeElapsed)

    const sql = "UPDATE timer_data SET time_elapsed = ($1) WHERE id = ($2)"
    const params = [isoDuration, id]

    await this.pool.query(sql, params)
  }

}

const timers = new TimerRepo(new Pool(config.db));


export default timers;

/*
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
*/