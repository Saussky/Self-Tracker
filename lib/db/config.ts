import { PoolConfig } from 'pg';

const config: Record<string, PoolConfig> = {
    users: {
        host: process.env.DB_HOST,
        port: Number(process.env.DB_PORT),
        database: process.env.DB_DATABASE,
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
    }
}

export default config