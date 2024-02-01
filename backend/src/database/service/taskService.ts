import { and, asc, desc, eq, gt, inArray, sql } from "drizzle-orm";
import { CreateTask, InputMaybe, SubtaskUpdate } from "../../graphql/graphql-types";
import db from "../config";
import { column } from "../schema/columnModel";
import { BadRequest } from "../../helpers/errorHandler";
import { task,} from "../schema/taskModel";
import { DBSubtaskNew, subtask } from "../schema/subtaskModel";
import { SubtaskSevice } from "./subtaskService";

export class TaskService{
    
    static getColumnTask(columnId: string){
        return db.query.task.findMany({
            where: eq(task.columnId,columnId),
            orderBy: [asc(task.position), desc(task.createdAt)]
        })
    }
    static async createTask(createTask: CreateTask){
        const {columnId, title,description, subtasks}= createTask

        const columnExist= await db.query.column.findFirst({
            where: eq(column.id, columnId)
        })

        if(!columnExist){
            throw new BadRequest("Column does not exist")
        }

       await db.update(task).set({
        position: sql`${task.position} + 1`
       }).where(eq(task.columnId, columnId))

        const newTask= await db.insert(task).values({
            title,
            description,
            columnId,
            position: 1
        }).returning()

        // add subtasks if eny
        if(subtasks){
            if(subtasks.length>0){
                const reformatSubtasksBeforeSave= subtasks.map((subtask)=>({
                    title: subtask,
                    taskId: newTask[0].id,
                    checked: false
                } satisfies DBSubtaskNew))

                await db.insert(subtask).values([...reformatSubtasksBeforeSave])
            }

        }

        return newTask[0]
        
    }

    static async updateTask(taskInfo: {id: string, description?: InputMaybe<string>, title?:InputMaybe<string>, columnId: string},oldSubtasks:SubtaskUpdate[], newSubtasks?: InputMaybe<string[]>, deletedSubtasks?: InputMaybe<string[]>){

        const taskExist= await db.query.task.findFirst({
            where: eq(task.id, taskInfo.id)
        })

        if(!taskExist){
            throw new BadRequest("Task does not exist")
        }

        // delete subtask
        if(deletedSubtasks){
            if(deletedSubtasks.length>0){
                await db.delete(subtask).where(inArray(subtask.id, deletedSubtasks))
            }
        }

        // update current subtask
        await Promise.all([oldSubtasks.map(async (oldSubtask)=>{
            const {subtaskId,checked,description,title}= oldSubtask
            return await SubtaskSevice.updateSubtask(subtaskId, {title,description,checked} as {title?: string, description?: string, checked?: boolean})
        })])
        // add new subtasks
        if(newSubtasks){
            if(newSubtasks.length>0){
                const reformatSubtasksBeforeSave= newSubtasks.map((subtask)=>({
                    title: subtask,
                    checked: false,
                    taskId: taskInfo.id
                } satisfies DBSubtaskNew))
                await db.insert(subtask).values([...reformatSubtasksBeforeSave])
            }
        }

        // update task
        if(taskExist.columnId===taskInfo.columnId){
            // task stayed at the same column
            const newTaskUpdate= await db.update(task).set({
                title: taskInfo.title as string,
                description: taskInfo.description
            }).where(eq(task.id, taskInfo.id)).returning()

            return newTaskUpdate[0]
        }
        // move task to another column
        await db.update(task).set({
            position: sql`${task.position} + 1`
        }).where(eq(task.columnId, taskInfo.columnId))
        const newTaskUpdate= await db.update(task).set({
            position: 1,
            title: taskInfo.title as string,
            description: taskInfo.description,
            columnId: taskInfo.columnId
        }).where(eq(task.id, taskInfo.id)).returning()

        // update on column position
        await db.update(task).set({
            position: sql`${task.position} - 1`
        }).where(and(eq(task.columnId, taskExist.columnId), gt(task.position, taskExist.position)))
        return newTaskUpdate[0]
    }

    static async deleteTask(taskId: string){
        const taskExist= await db.query.task.findFirst({
            where: eq(task.id, taskId)
        })

        if(!taskExist){
            throw new BadRequest("Task does not exist")
        }

        await db.delete(task).where(eq(task.id, taskId))

        return taskExist
    }
}