export interface TaskDnDPayload{
    taskId: string
    prevLocation: {
        columnId: string,
        position: number
    },
    newLocation: {
        columnId: string,
        position: number
    }

}