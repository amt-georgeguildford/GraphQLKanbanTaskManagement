import { relations } from "drizzle-orm"
import {date, integer, pgTable, text, uuid} from "drizzle-orm/pg-core"
import { task } from "./taskModel"
import { board } from "./boardModel"

export const column= pgTable("columnB", {
    id: uuid("id").primaryKey().defaultRandom(),
    name: text("name").notNull(),
    position: integer("position").notNull(),
    boardId: uuid("boardId").notNull().references(()=>board.id, {onDelete: "cascade"}),
    createdAt: date("createdAt").defaultNow()
})

export type DBColumn= typeof column.$inferSelect
export type DBColumnNew= typeof column.$inferInsert

export const columnRelation= relations(column, ({one, many})=>({
    tasks: many(task),
    board: one(board, {
        fields: [column.boardId],
        references: [board.id]
    })
}))