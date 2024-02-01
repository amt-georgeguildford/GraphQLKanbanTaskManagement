import { asc, eq } from "drizzle-orm";
import db from "../config";
import { subtask } from "../schema/subtaskModel";
import { BadRequest } from "../../helpers/errorHandler";

export class SubtaskSevice{
    static getTaskSubtasks(taskId: string){
        return db.query.subtask.findMany({
            where: eq(subtask.taskId, taskId),
            orderBy: [asc(subtask.createdAt)]
        })
    }
    static async updateSubtask(subtaskId: string, data: {title?: string, description?: string, checked?: boolean}){
        const subtaskExist= await db.query.subtask.findFirst({
            where: eq(subtask.id, subtaskId)
        })
        if(!subtaskExist){
            throw new BadRequest("Subatsk does not exist")
        }

        const newSubtask= await db.update(subtask).set({...data}).where(eq(subtask.id, subtaskId)).returning()
        return newSubtask[0]
    }

    static async checkSubtask(id: string, checked: boolean){
        const subtaskExist= await db.query.subtask.findFirst({
            where: eq(subtask.id, id)
        })
        if(!subtaskExist){
            throw new BadRequest("Subatsk does not exist")
        }

        const checkedSubtask= await db.update(subtask).set({
            checked
        }).where(eq(subtask.id, id)).returning()
        return checkedSubtask[0]
    }
}