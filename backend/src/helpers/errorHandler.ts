import {GraphQLError} from "graphql"
import {ApolloServerErrorCode} from "@apollo/server/errors"
export class BadRequest extends GraphQLError{
    constructor(message: string){
        super(message, {
            extensions:{
                code: ApolloServerErrorCode.BAD_REQUEST
            }
        })
    }
}

export class Unauthenticated extends GraphQLError{
    constructor(message: string){
        super(message, {
            extensions: {
                code: "UNAUTHENTICATED"
            }
        })
    }
}

export class Unauthorized extends GraphQLError{
    constructor(message: string){
        super(message, {
            extensions: {
                code: "UNAUTHORIZED"
            }
        })
    }
}