import { gql } from "."

export const GETBOARDS= gql(`
    query GETBOARDS{
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