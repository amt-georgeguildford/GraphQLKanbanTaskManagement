import { relations } from "drizzle-orm"
import {boolean, date, pgTable, text, uuid} from "drizzle-orm/pg-core"
import { task } from "./taskModel"

export const subtask= pgTable("subtask", {
    id: uuid("id").primaryKey().defaultRandom(),
    title: text("title").notNull(),
    checked:boolean("checked").notNull(),
    taskId: uuid("taskId").notNull().references(()=>task.id, {onDelete: "cascade"}),
    createdAt: date("createdAt").defaultNow() 
})

export type DBSubtask= typeof subtask.$inferSelect
export type DBSubtaskNew = typeof subtask.$inferInsert

export const subtaskRelation= relations(subtask, ({one})=>({
    task: one(task, {
        fields: [subtask.taskId],
        references: [task.id],
    })
}))