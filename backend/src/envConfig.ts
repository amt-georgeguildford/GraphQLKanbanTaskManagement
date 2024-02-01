import dotenv from "dotenv"
dotenv.config()
const NODE_ENV= process.env["NODE_ENV"] as "development"

const development= {
    PORT: process.env["PORT"] as string,
    DATABASE_URL: process.env["DATABASE_URL"] as string
}
const config= {
    development,

}

export default config[NODE_ENV]