import {date, pgTable, text, uuid} from "drizzle-orm/pg-core"
import {relations} from "drizzle-orm"
export const board= pgTable("board",{
    id: uuid("id").primaryKey().defaultRandom(),
    name: text("name").notNull(),
    createdAt: date("createdAt").defaultNow()
})

export type DBBoard= typeof board.$inferSelect
export type DBBoardNew= typeof board.$inferInsert

export const boardRelation= relations(board, ({many})=>{
    return {
        columns: many(board)
    }
})