import Pool from '../pool';
import config from '../config';
import { QueryResult } from 'pg';
import parse from 'postgres-interval'

// There's two tables for timers
// timer_info holds the core information of the timer to load, such as it's name and it stores the unique ID
// timer_data stores the individual timer data for each session

// TODO: date_of_last_use and frequency need to be updated in the timer_info when updating timer_data stuff
// TODO: get all timers from timer_data when passing in an ID 

export class TimerRepo {
  pool: Pool;

  constructor(pool: Pool) {
    this.pool = pool;
  }

  // Creates a timer for a user
  async createTimer(name: string, userEmail: string): Promise<void> {
    const sql =
      'INSERT INTO timer_info (name, user_email) VALUES ($1, $2)';
    const params = [name, userEmail];

    await this.pool.query(sql, params);
  }

  // Gets all the timers from timer_info the user has created
  async getTimersByEmail(userEmail: string): Promise<QueryResult> {
    const sql = 'SELECT * FROM timer_info WHERE user_email = ($1)';
    const params = [userEmail];

    return this.pool.query(sql, params);
  }

  async updateFrequency(infoId: string) {
    const sql = "UPDATE timer_info SET frequency = frequency + 1 WHERE id = ($1)"
    const params = [infoId]
    await this.pool.query(sql, params)
  }

  async updateDateOfLastUse(infoId: string) {
    const sql = 'UPDATE timer_info SET date_of_last_use = CURRENT_DATE WHERE id = ($1)'
    const params = [infoId]
    await this.pool.query(sql, params)
  }

  // Enters in a timer to timer_data which is now ready to count
  async startTimer(infoId: string): Promise<void> {
    this.updateFrequency(infoId)
    this.updateDateOfLastUse(infoId)

    const sql = "INSERT INTO timer_data (info_id) VALUES ($1) RETURNING id";
    const params = [infoId];

    try {
      const { rows } = await this.pool.query(sql, params);
      const generatedUUID = rows[0].id;
      return generatedUUID;
    } catch (e) {
      console.log(e)
    }
  }


  async deleteTimerData(infoId: string): Promise<void> {
    const sql = "DELETE FROM timer_data WHERE info_id = ($1)"
    const params = [infoId]
    await this.pool.query(sql, params)
  }

  async deleteTimerInfo(infoId: string): Promise<void> {
    // Have to clear out all the data that depends on the timer_info first
    await this.deleteTimerData(infoId)

    const sql = " DELETE FROM timer_info WHERE id = ($1)"
    const params = [infoId]
    await this.pool.query(sql, params)
  }

  // Gets the timer if one has already been created today, adds the time it has already tracked
  async getTimerByDate(infoId: string) {
    const sql = "SELECT *, to_char(time_elapsed, 'HH24:MI:SS') AS formatted_time FROM timer_data WHERE info_id = ($1) AND date_created = CURRENT_DATE";
    const params = [infoId];

    const { rows } = await this.pool.query(sql, params);

    const rowsWithElapsedSeconds = rows.map(row => {
      const [hoursStr, minutesStr, secondsStr] = row.formatted_time.split(':');
      const hours = parseInt(hoursStr, 10);
      const minutes = parseInt(minutesStr, 10);
      const seconds = parseInt(secondsStr, 10);
      const elapsedSeconds = hours * 3600 + minutes * 60 + seconds;
      return {
        ...row,
        elapsedSeconds,
      };
    });

    return rowsWithElapsedSeconds;
  }

  async getTimerById(infoId: string): Promise<QueryResult> {
    const sql = "SELECT * FROM timer_data WHERE info_id = ($1)"
    const params = [infoId]
    return await this.pool.query(sql, params)
  }

  // Updates the time_elapsed column for the timer
  async updateTimer(id: string, timeElapsed: string): Promise<void> {
    const interval = parse(timeElapsed).toPostgres()

    const sql = "UPDATE timer_data SET time_elapsed = ($1) WHERE id = ($2)"
    const params = [interval, id]

    await this.pool.query(sql, params)
  }

}

const timers = new TimerRepo(new Pool(config.db));
export default timers;