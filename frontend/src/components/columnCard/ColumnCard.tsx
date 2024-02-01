import { Box, Card, Stack, Typography, useTheme, IconButton, CardActionArea} from "@mui/material"
import { CSSProperties, useCallback, useContext, useState } from "react"
import EditTask from "../forms/EditTask"
import { customThemeInitial } from "../../theme"
import { colorRange } from "../../colorRange"
import { GetBoardQuery } from "../../graphql/graphql"
import ViewTask from "../viewTask/ViewTask"
import { useCurrentTask } from "../../context/CurentTaskContext"
import {Droppable, Draggable} from "react-beautiful-dnd"
const bulletAvatar:CSSProperties= {
  width: "15px",
  height: "15px",
  backgroundColor: "red",
  borderRadius: "50%",
  marginRight: "10px"
}
const ColumnCard = ({column}: {column:TColumn}) => {
  const theme= useTheme()
  const {setCurrentTask}= useCurrentTask()
  const {mode}= useContext(customThemeInitial)
  const [showViewTask, setShowViewTask] = useState(false)
  const [clickedTask, setClickedTask] = useState<undefined | TTask>(undefined)

  const handleTaskClicked= (task: TTask)=>{
    setCurrentTask({task, columnId: column.id})
    setClickedTask(task)
    setShowViewTask(true)
  }
  return (
    <>
      <Box>
        <Box display= "flex" alignItems={"center"} margin={"12px 0 12px 0"}>
          <span style={bulletAvatar}></span>
          <span style={{color: mode=== "dark"? colorRange["medium-grey"]: undefined}}>{column.name} ({column.tasks? column.tasks.length: 0})</span>
        </Box>
        <Droppable droppableId={column.id}>
          {
            ({innerRef, droppableProps})=>(
              <Box ref={innerRef} {...droppableProps}>

                  <Stack spacing={2}>
                {
                  column.tasks?.map((task, index)=>(
                    <Draggable draggableId={task.id} index={index} key={task.id}>
                      {
                        ({innerRef, dragHandleProps, draggableProps})=>(
                        <Box ref={innerRef} {...draggableProps} {...dragHandleProps}>
                          <Card sx={{width: "300px"}}>
                          <CardActionArea sx={{backgroundColor: theme.palette.primary.main, padding: "15px"}} onClick={()=>{handleTaskClicked(task)}}>
                              <Typography paragraph mb="0">
                              {
                                task.title
                              }
                              </Typography>
                              <Typography variant="caption">
                                {
                                  `${task.subtasks?.filter((subtask)=>subtask.checked).length} of ${task.subtasks?.length} subtasks` 
                                }
                              </Typography>
                          </CardActionArea>
                      </Card>

                        </Box>

                        )
                      }
                    </Draggable>
                  ))
                }

              </Stack>
              </Box>
            )
          }
          
        </Droppable>
      </Box>
      {
        showViewTask && 
        <ViewTask open= {showViewTask} handleClose={()=>setShowViewTask(false)} task={clickedTask as TTask} column={column
        }/>
      }
    </>
  )
}

export default ColumnCard