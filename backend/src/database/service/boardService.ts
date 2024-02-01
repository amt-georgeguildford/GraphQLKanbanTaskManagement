import { asc, eq, ilike, inArray } from "drizzle-orm";
import db from "../config";
import { DBBoard, DBBoardNew, board } from "../schema/boardModel";
import {} from "@apollo/server/errors"
import { BadRequest } from "../../helpers/errorHandler";
import { DBColumn, DBColumnNew, column } from "../schema/columnModel";
import { validateColumnNameOnUpdate, validateColumnNames} from "../../helpers/validator";
import { AddNewColumn, ColumnNew, InputMaybe } from "../../graphql/graphql-types";
import { ColumnService } from "./columnService";
export class BoardService{
    static async getBoards(){db.query.board.findMany()
        return await db.query.board.findMany({
            orderBy:[asc(board.createdAt)]
        })
    }

    static async getBoard(boardId: string){
        const boardExist= await db.query.board.findFirst({
            where: eq(board.id, boardId)
        })
        if(!boardExist){
            throw new BadRequest("Board does not exist")
        }
        return boardExist 
    }

    static async createBoard(newBoard: DBBoardNew, newColumns?: InputMaybe<string[]>){
        const {name}= newBoard
        const boardExist= await db.query.board.findFirst({
            where: ilike(board.name,name)
        })
        
        if(boardExist){
            throw new BadRequest("Board already exist")
        }

        let validatedNames: String[]=[]
        if(newColumns){
            if(newColumns.length>0){
                validatedNames= validateColumnNames(newColumns)
            }
        }
        // create board
        const createBoard= await db.insert(board).values({
            name
        }).returning()

        let createColumns: DBColumn[]=[]
        if(validatedNames.length>0){
            const formatBeforeSave= validatedNames.map((name, index)=>({
                name,
                boardId: createBoard[0].id,
                position: index+1
            })) as  DBColumnNew[]
            createColumns= await db.insert(column).values([...formatBeforeSave]).returning()
        }

        return {
            ...createBoard[0], columns: [...createColumns]
        }
    }

    static async deleteBoard(boardId: string){
        const boardExist = await db.query.board.findFirst({
            where: eq(board.id, boardId)
        })

        if(!boardExist){
            throw new BadRequest("Board does not exist")
        }
        const deletedBoard= await db.delete(board).where(eq(board.id,boardId)).returning()
        return deletedBoard[0]
    }
    
    static async updateBoard(boardInfo: {id: string, name?: InputMaybe<string>},oldColumns: ColumnNew[], newAddedColumns?:InputMaybe<string[]>, deletedColumns?: InputMaybe<string[]>){
        const boardExist= await db.query.board.findFirst({
            where: eq(board.id, boardInfo.id)
        })

        if(!boardExist){
            throw new BadRequest("Board does not exist")
        }
        // check for duplicate column name
        validateColumnNameOnUpdate(oldColumns, newAddedColumns)

        // check if deleted column exist
        if(deletedColumns){
            if(deletedColumns.length>0){
                const potentialDeletedColumns= await db.query.column.findMany({
                    where: inArray(column.id, deletedColumns)
                })
                if(potentialDeletedColumns.length!==deletedColumns.length){
                    throw new BadRequest(`Some columns of ${boardExist.name} does not exist`)
                }
                await Promise.all(
                    deletedColumns.map(async (columnId)=>{
                        await ColumnService.deleteColumn(columnId)
                    })
                )
            }

        }
        // update registered columns
        await Promise.all(oldColumns.map(async (column)=>{
            return await ColumnService.updateColumn(column.id, column.name)
        }))

        // add new columns
        const currentColumnLength= (await db.query.column.findMany({
            where: eq(column.boardId, boardInfo.id)
        })).length
        if(newAddedColumns){
            if(newAddedColumns.length>0){

                const reformatBeforeBeforeSave= newAddedColumns.map((column, index)=>({
                    name: column,
                    boardId: boardInfo.id,
                    position: currentColumnLength+index+1
    
                } satisfies DBColumnNew))
                await db.insert(column).values([...reformatBeforeBeforeSave])
            }
        }

        // update board
        if(boardInfo.name){
            const updatedBoarded= (await db.update(board).set({name: boardInfo.name}).where(eq(board.id, boardInfo.id)).returning())
            return updatedBoarded[0]
        }
        
        return boardExist

    }
    
}