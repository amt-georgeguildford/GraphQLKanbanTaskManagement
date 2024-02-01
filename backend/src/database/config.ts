import {Pool} from "pg"
import {drizzle} from "drizzle-orm/node-postgres"
import envConfig from "../envConfig"
import schema from "./schema"
const pool= new Pool({
    connectionString: envConfig.DATABASE_URL
})

const db= drizzle(pool,{schema})

export default db