import {ApolloServer} from "@apollo/server"
import {startStandaloneServer} from "@apollo/server/standalone"
import {readFileSync} from "fs"
import dotenv from "dotenv"
import resolvers from "./graphql/resolver"
dotenv.config()
const typeDefs= readFileSync("./src/graphql/schema.graphql", "utf8")

const PORT= Number(process.env["PORT"]) || 5000;

(
    async ()=>{
        const server= new ApolloServer<any>({
            typeDefs,
            resolvers
        })
    
        const {url}= await startStandaloneServer(server, {
            listen: {
                port : PORT
            }
        })
    
        console.log(`SERVER RUNNING AT ${url}`)
    }
)()