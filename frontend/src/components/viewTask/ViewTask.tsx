import React, { useContext, useState } from "react";
import ModalTemplate from "../modal/ModalTemplate";
import { Card, CardHeader, Menu, IconButton, MenuItem, CardContent, Typography, Box, Checkbox, FormGroup, FormControlLabel, Button, SxProps, Theme } from "@mui/material";
import { DashboardCustomizeSharp, Expand, ExpandMore, ModeEdit, MoreVert } from "@mui/icons-material";
import { colorRange } from "../../colorRange";
import EditTask from "../forms/EditTask";
import ActionModal from "../actionmodal/ActionModal";
import { customThemeInitial } from "../../theme";
import { gql } from "../../graphql";
import { useMutation } from "@apollo/client";
import { GETBOARD } from "../../context/BoardContext";

const DELETETASK= gql(`
    mutation DeleteTask($deleteTaskId: ID!) {
  deleteTask(id: $deleteTaskId) {
    id
    title
    description
    position
  }
}
`)

const CHECKSUBTASK=gql(`
    mutation CheckSubtask($checkSubtask: checkSubtask!) {
  checkSubtask(checkSubtask: $checkSubtask) {
    id
    title
    checked
  }
}
`)
const ViewTask = ({
  open,
  handleClose,
  task,
  column
}: {
  open: boolean;
  handleClose: () => void;
    task: TTask,
    column: TColumn
}) => {
  console.log(task)
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const dropMenuShow = Boolean(anchorEl);
  const [showEditTask, setShowEditTask] = useState(false);
  const [showDeleteTask, setShowDeleteTask] = useState(false);

  const [subtasks, setSubtasks] = useState(task.subtasks? task.subtasks: [])
  console.log(subtasks)
  const {mode}= useContext(customThemeInitial)
  const [deleTaskRequest]= useMutation(DELETETASK, {
    refetchQueries: [GETBOARD]
  })
  const [checksubtaskrequest]= useMutation(CHECKSUBTASK, {
    refetchQueries: [GETBOARD]
  })

  const checkboxStyle: SxProps<Theme>= {
      color : colorRange["main-purple"],
    "&.Mui-checked": {
        color : colorRange["main-purple"]
    },
  }
  const checkboxLabeStyle= {
      backgroundColor: mode=== "dark"? colorRange["very-dark-grey"]: colorRange["light-grey"],
      borderRadius: "4px",
    "&:hover":{
        backgroundColor: mode=== "dark"? colorRange["main-purple"]: colorRange["light-main-purple"],
    }
  }
  const cardHeaderStyle:SxProps<Theme>= {
    color: mode==="dark"?"white": "black", 
    "& .css-1hol7jf-MuiTypography-root": {
        fontSize: '1.2rem',
    }
  }

  const statusStyle:SxProps<Theme>={
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    border: `1px solid ${colorRange["medium-grey"]}`,
    padding: '3px',
    borderRadius: "4px",
    color: mode==="dark"? "white": "black"
  }
  const handleDeleteTask =async ()=>{
    try {
        await deleTaskRequest({
            variables: {
                deleteTaskId: task.id
            }
        })
        setShowDeleteTask(false)
        handleClose()
    } catch (error) {
        
    }
  }
  const handleCheckSubtaskStatus= async (subtaskId: string, checked: boolean)=>{
    try {
        await checksubtaskrequest({
            variables: {
                checkSubtask: {
                    id: subtaskId,
                    checked
                }
            }
        })
        setSubtasks((prev)=>{
            const subtasks= prev.map((subtask)=>{
                if(subtask.id===subtaskId){
                    return {
                        ...subtask,
                        checked
                    }
                }
                return subtask
            })
            return [...subtasks]
        })
    } catch (error) {
        
    }
  }

  const resetCloseModal = ()=>{
    setSubtasks([])
    handleClose()
  }
  return (
    <>
      <ModalTemplate open={open} handleClose={resetCloseModal}>
        <Card style={{boxShadow: "none", backgroundImage: "none", backgroundColor: "transparent"}}>
          <CardHeader
            title={task.title}
            action={
              <IconButton onClick={(e) => setAnchorEl(e.currentTarget)} style={{color: colorRange["medium-grey"]}}>
                <MoreVert />
              </IconButton>
            }
            sx={cardHeaderStyle}
          />
          <CardContent>
            <Typography variant="subtitle2" width={"400px"} color={colorRange["medium-grey"]} marginBottom={"10px"}>
                 {
                    task.description
                 }
            </Typography>
            {
                subtasks.length>0?
            (<Box>
                <small style={{color: mode==="dark"? "white": colorRange["medium-grey"]}}>Subtask {
                    `${subtasks.filter((subtask)=>subtask.checked).length} of ${subtasks.length}`
                }</small>
                <FormGroup sx={{marginTop: "10px"}}>
                    {
                        subtasks.map((subtask)=>(
                                <FormControlLabel label={subtask.title} sx= {checkboxLabeStyle} key={subtask.id} control={<Checkbox sx={checkboxStyle} checked= {subtask.checked as boolean} onChange={()=>{handleCheckSubtaskStatus(subtask.id, !subtask.checked)}}/>}/>
                        ))
                    }
                </FormGroup>
            </Box>): 
            (
                <Typography>No Subtasks</Typography>
            )
            }

            <small>Current Status</small>
            <Box sx={statusStyle}>
                <p>{column.name}</p>
                <span><ExpandMore /></span>
            </Box>
          </CardContent>
        </Card>
      </ModalTemplate>
      <Menu
        open={dropMenuShow}
        anchorEl={anchorEl}
        onClose={() => setAnchorEl(null)}
      >
        <MenuItem
          onClick={() => {
            setShowEditTask(true);
            setAnchorEl(null);
          }}
          sx={{ color: colorRange["medium-grey"] }}
        >
          Edit Task
        </MenuItem>
        <MenuItem
          onClick={() => {
            setShowDeleteTask(true);
            setAnchorEl(null);
          }}
          sx={{ color: colorRange.red }}
        >
          Delete task
        </MenuItem>
      </Menu>
      <EditTask
        open={showEditTask}
        handleClose={() => setShowEditTask(false)}
        closeParent={handleClose}
      />
      <ActionModal
        open={showDeleteTask}
        handleClose={() => {
          setShowDeleteTask(false);
        }}
        title="Delete Task"
        message="Are you sure you want to delete the ‘Build settings UI’ task and its subtasks? This action cannot be reversed."
        action={handleDeleteTask}
      />
    </>
  );
};

export default ViewTask;
