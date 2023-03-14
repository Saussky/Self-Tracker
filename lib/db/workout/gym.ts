import { QueryResult } from "pg";
import config from "../config";
import Pool from "../pool";

/*
 Start a session once user has clicked on Gym, gets the time and creates a unique session ID
After each set a user submits, it records the category, exercise, reps, weight and date/time
Assumes whatever is the last submitted set is the end date/time for the session
*/

export class GymRepo {
    pool: Pool;

    constructor(pool: Pool) {
        this.pool = pool;
    }

    async createSession(userEmail: string): Promise<QueryResult> {
        return this.pool.query(
            'INSERT INTO sessions (user_email) VALUES ($1) RETURNING id',
            [userEmail],
        );
    }

    async createSet(
        sessionId: string,
        category: string,
        exercise: string,
        reps: number,
        weight: number,
    ): Promise<QueryResult> {
        return this.pool.query(
            'INSERT INTO sets (session_id, category, exercise, reps, weight) VALUES ($1, $2, $3, $4, $5)',
            [sessionId, category, exercise, reps, weight],
        );
    }

    async getSession(sessionId: string): Promise<QueryResult> {
        return await this.pool.query('SELECT * FROM sessions WHERE id = $1', [sessionId]);
    }

    async getSessionsByUserEmail(userEmail: string): Promise<QueryResult> {
        return await this.pool.query('SELECT * FROM sessions WHERE user_email = $1', [userEmail]);
    }

    async getSetsBySessionId(sessionId: string): Promise<QueryResult> {
        return await this.pool.query('SELECT * FROM sets WHERE session_id = $1', [sessionId]);
    }

    async getExercises(userEmail: string) {
        const sql = `
          SELECT array(SELECT unnest(compound) FROM gym_exercises WHERE user_email = ($1)) AS compound_exercises,
                 array(SELECT unnest(push) FROM gym_exercises WHERE user_email = ($1)) AS push_exercises,
                 array(SELECT unnest(pull) FROM gym_exercises WHERE user_email = ($1)) AS pull_exercises,
                 array(SELECT unnest(legs) FROM gym_exercises WHERE user_email = ($1)) AS legs_exercises,
                 array(SELECT unnest(core) FROM gym_exercises WHERE user_email = ($1)) AS core_exercises,
                 array(SELECT unnest(other) FROM gym_exercises WHERE user_email = ($1)) AS other_exercises`;
        const params = [userEmail];
        return await this.pool.query(sql, params);
    }

    async addExercise(userEmail: string, category: string, exercise: string) {
        console.log('ccc', category)
        const sql = `UPDATE gym_exercises SET ${category} = array_append(${category}, ($1)) WHERE user_email = ($2)`
        const params = [exercise, userEmail]
        return await this.pool.query(sql, params)
    }

    async deleteExercise(userEmail: string, category: string, exercise: string) {
        const sql = `UPDATE gym_exercises SET ${category} = array_remove(${category}, ($1)) WHERE user_email = ($2)`
        const params = [exercise, userEmail]
        return await this.pool.query(sql, params)
    }
}


const gym = new GymRepo(new Pool(config.db));
export default gym