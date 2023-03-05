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
        return this.pool.query('SELECT * FROM sessions WHERE id = $1', [sessionId]);
    }

    async getSessionsByUserEmail(userEmail: string): Promise<QueryResult> {
        return this.pool.query('SELECT * FROM sessions WHERE user_email = $1', [userEmail]);
    }

    async getSetsBySessionId(sessionId: string): Promise<QueryResult> {
        return this.pool.query('SELECT * FROM sets WHERE session_id = $1', [sessionId]);
    }
}


const gym = new GymRepo(new Pool(config.db));
export default gym