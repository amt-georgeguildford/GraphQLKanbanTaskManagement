type TBoard= {
    __typename?: "Board";
    id: string;
    name: string;
    columns?: TColumn[] | null

}

interface TColumn{
    __typename?: "Column";
    id: string;
    name: string;
    position: number;
    tasks?: TTask[] | null
}

interface TTask{
    __typename?: "Task";
    id: string;
    title: string;
    position?: number | null;
    description?: string | null;
    subtasks?: ISubtask[] | null
}

interface ISubtask{
    __typename?: "Subtask";
    id: string;
    title: string;
    checked?: boolean | null;
}