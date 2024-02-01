import { useContext, createContext } from "react";
import { useParams } from "react-router-dom";
import { useQuery } from "@apollo/client";
import { gql } from "../graphql";
import { GetBoardQuery } from "../graphql/graphql";
export const GETBOARD= gql(`
    query GetBoard($getBoardId: ID!) {
  getBoard(id: $getBoardId) {
    id
    name
    columns {
      id
      name, position,
      tasks {
        id,
        title,
        position,
        description
        subtasks {
          id
          title
          checked
        }
      }
    }
  }
}
`)
export const currentBoardInitial= createContext<GetBoardQuery | undefined>(undefined)

const BoardProvider= ({children}: {children: React.ReactNode})=>{
    const {id}= useParams()
    const {error, loading,data}= useQuery(GETBOARD, {
        variables: {
            getBoardId: id as string
        }
    })
    console.log(data)
    return (
        <currentBoardInitial.Provider value= {data}>
            {
                error && (<h1>Error fetching selected board</h1>)
            }
            {
                loading && (<h1>Loading Seleted Board Data</h1>)
            }
            {
                data && children
            }
        </currentBoardInitial.Provider>
    )
}
export const useSelectBaord= ()=>{
    return useContext(currentBoardInitial) as GetBoardQuery
}
export default BoardProvider