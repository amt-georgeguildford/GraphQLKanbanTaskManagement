import React, { useContext, createContext, useEffect } from "react";
import { ApolloError, QueryResult, useQuery } from "@apollo/client";
import { gql } from "../graphql";
import { Exact, GetBoardsQuery } from "../graphql/graphql";
import { Navigate } from "react-router-dom";
Navigate
const allBoardContext= createContext({} as {loading: boolean, error: ApolloError | undefined, data: GetBoardsQuery | undefined})

export const GETBOARDS= gql(`
    query GetBoards {
  getBoards {
    id
    name
    columns {
      id
      name
    }
  }
}
`)
export const AllBoardProvider= ({children}: {children: React.ReactNode})=>{
    const {loading, error, data}= useQuery(GETBOARDS)
    return (
        <allBoardContext.Provider value={{loading, error, data}}>
            {
                loading && (<h1>Loading</h1>)
            }
            {
                error && (<h1>Error</h1>)
            }
            {
                data && children
            }
        </allBoardContext.Provider>
    )
}

export const useAllBoards= ()=>{
    return useContext(allBoardContext)
}