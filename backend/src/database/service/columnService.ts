import { asc, eq, sql } from "drizzle-orm";
import db from "../config";
import { column } from "../schema/columnModel";
import { BadRequest } from "../../helpers/errorHandler";
import { board } from "../schema/boardModel";
import { InputMaybe } from "../../graphql/graphql-types";

export class ColumnService{

    static getBoardColumns(boardId: string){
        return db.query.column.findMany({
            where: eq(column.boardId, boardId),
            orderBy:[asc(column.position)]
        })
    }

    static async createColumn(columnName: string, boardId: string){

        const boardExist= await db.query.board.findFirst({
            where: eq(board.id, boardId)
        })
        if(!boardExist){
            throw new BadRequest("Board does not exist")
        }
        const currentColumnCount= (await db.query.column.findMany({
            where: eq(column.boardId, boardId)
        })).length

        const newColumn= await db.insert(column).values({
            name: columnName,
            boardId,
            position: currentColumnCount+1
        }).returning()

        return newColumn[0]
    }

    static async deleteColumn(columnId: string){
        const columnExist= await db.query.column.findFirst({
            where: eq(column.id, columnId)
        })
        if(!columnExist){
            throw new BadRequest("Column does not exist")
        }

        await db.delete(column).where(eq(column.id, columnId))

        if(columnExist.position>=1){
            await db.execute(sql`UPDATE "columnB" set position= position-1 WHERE "boardId"= ${columnExist.boardId} and position>1`)
        }

        return columnExist
    }

    static async updateColumn(columnId: string, columnName?: InputMaybe<string>){
        const columnExist= await db.query.column.findFirst({
            where: eq(column.id, columnId)
        })
        if(!columnExist){
            throw new BadRequest("Column does not exist")
        }
        if(columnName){
            const newColumnUpdate= await db.update(column).set({
                name: columnName
            }).where(eq(column.id,columnId)).returning()
    
            return newColumnUpdate[0]
        }
        return columnExist
    }
}

