import {useContext, createContext, useState} from "react"
type ProviderType= {
    currentTask: {task: TTask, columnId: string}, 
    setCurrentTask:  React.Dispatch<React.SetStateAction<{
        task: TTask;
        columnId: string;
    }>>
}
const initialContextValue= createContext({} as ProviderType)

const CurrentTaskSelectProvider= ({children}: {children: React.ReactNode})=>{
    const [currentTask, setCurrentTask] = useState<{task: TTask, columnId: string}>({} as ProviderType["currentTask"])
    return (
        <initialContextValue.Provider value={{currentTask, setCurrentTask}}>
            {children}
        </initialContextValue.Provider>
    )
}

export const useCurrentTask= ()=>{
    return useContext(initialContextValue)
}
export default CurrentTaskSelectProvider