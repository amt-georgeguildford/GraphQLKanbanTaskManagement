import db from "../database/config";
import { board } from "../database/schema/boardModel";
import { BoardService } from "../database/service/boardService";
import { ColumnService } from "../database/service/columnService";
import { SubtaskSevice } from "../database/service/subtaskService";
import { TaskService } from "../database/service/taskService";
import { dragAndDropTask } from "../helpers/draganddrop";
import { validateColumnNameOnUpdate } from "../helpers/validator";
import { Resolvers } from "./graphql-types";

const resolvers: Resolvers={
    Mutation: {
        createBoard(_, args){
            const {name,columns}= args.board
            return BoardService.createBoard({name}, columns)
        },
        deleteBoard(_, {id}){
            return BoardService.deleteBoard(id)
        },
        updateBoard(_, args){
            const {id, name,newColumns,oldColumns,deletedColumns}= args.updateBoard
            
            return BoardService.updateBoard({id,name},oldColumns,newColumns, deletedColumns)
        },

        createColumn(_, args){
            const {boardId,name}= args.column
            return ColumnService.createColumn(name,boardId)
        },
        updateColumn(_, args){
            const {id,name}= args.updateColumn
            return ColumnService.updateColumn(id, name)
        },
        deleteColumn(_, {id}){
            return ColumnService.deleteColumn(id)
        },

        createTask(_, args){
            const {createTask}=args
            return TaskService.createTask(createTask)
        },
        updateTask(_, args){
            const {id, title,description,newSubtasks,oldSubtasks,columnId,deletedSubtasks}= args.updateTask
            return TaskService.updateTask({id,description,title, columnId},oldSubtasks,newSubtasks,deletedSubtasks)
        },
        deleteTask(_, args){
            const {id}= args
            return TaskService.deleteTask(id)
        },

        checkSubtask(_, args){
            const {checked,id}= args.checkSubtask
            return SubtaskSevice.checkSubtask(id,checked)
        },

        dragAndDropTask(_, args){
            return dragAndDropTask(args.dragAndDropTask)
        }
    },
    Query: {
        getBoards(){
            return BoardService.getBoards()
        },
        getBoard(_, {id}){
            return BoardService.getBoard(id)
        }
        
    },
    Board: {
        columns(parent){
            const {id}= parent
            return ColumnService.getBoardColumns(id)
        }
    },

    Column: {
        tasks(parent){
            const {id}=parent
            return TaskService.getColumnTask(id)
        }
    },
    Task: {
        subtasks(parent){
            const {id}=parent
            return SubtaskSevice.getTaskSubtasks(id)
        }
    },

}

export default resolvers