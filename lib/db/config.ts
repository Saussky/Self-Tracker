import { PoolConfig } from 'pg';
import * as dotenv from 'dotenv'
dotenv.config()

const config: Record<string, PoolConfig> = {
    db: {
        host: process.env.DB_HOST,
        port: Number(process.env.DB_PORT),
        database: process.env.DB_DATABASE,
        user: process.env.DB_USER,
        password: String(process.env.DB_PASSWORD),
    }
}

export default config
