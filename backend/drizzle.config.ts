import {Config} from "drizzle-kit"
import envConfig from "./src/envConfig"
export default{
    schema: "./src/database/schema/*",
    out: "./src/database/migration",
    driver: "pg",
    dbCredentials: {
        connectionString: envConfig.DATABASE_URL 
    }

} satisfies Config