import { relations } from "drizzle-orm"
import {date, integer, pgTable, text, uuid} from "drizzle-orm/pg-core"
import { subtask } from "./subtaskModel"
import { column } from "./columnModel"

export const task= pgTable("task", {
    id: uuid("id").primaryKey().defaultRandom(),
    title: text("title").notNull(),
    description: text("description"),
    position: integer("position").notNull(),
    columnId: uuid("columnId").notNull().references(()=>column.id, {onDelete: "cascade"}),
    createdAt: date("createdAt").defaultNow()
})

export type DBTask= typeof task.$inferSelect
export type DBTaskNew = typeof task.$inferInsert

export const taskRelation= relations(task, ({one, many})=>({
    subtasks: many(subtask),
    column: one(column, {
        fields: [task.columnId],
        references: [column.id]
    })
}))