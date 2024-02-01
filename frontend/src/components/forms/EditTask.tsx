import React, { useState } from 'react'
import ModalTemplate from '../modal/ModalTemplate'
import { Form, Formik } from 'formik'
import { Box, IconButton, MenuItem, Select, SxProps, TextField, Theme } from '@mui/material'
import { Close } from '@mui/icons-material'
import PrimaryButton from '../button/PrimaryButton'
import { colorRange } from '../../colorRange'
import { useCurrentTask } from '../../context/CurentTaskContext'
import { GETBOARD, useSelectBaord } from '../../context/BoardContext'
import { gql } from '../../graphql'
import { useMutation } from '@apollo/client'
const UPDATETASK= gql(`
    mutation UpdateTask($updateTask: updateTask!) {
  updateTask(updateTask: $updateTask) {
    id
    title
    description
    position
    subtasks {
      id,
      title,
      checked
    }
  }
}
`)
const formBtnGroupStyle:SxProps<Theme>= {
    display: "flex",
    flexDirection: "column",
    "&>button:first-child": {
        backgroundColor: "#d2d1ebad",
        margin: "10px 0 2rem 0",
        color: colorRange['main-purple']
    },
    "&>button:first-child:hover": {
        backgroundColor: "#a09ed3ad",
    }
}
const EditTask = ({open, handleClose, closeParent}: {open: boolean, handleClose: ()=>void, closeParent: ()=>void}) => {
    const {currentTask}= useCurrentTask()
    const {task, columnId}= currentTask
    const {id, subtasks, description,title}=task
    const {getBoard}= useSelectBaord()
    const [formData, setFormData] = useState({
        title,
        description,
        oldSubtasks: subtasks? subtasks.map(({id, title,checked})=>({subtaskId: id, title,checked})): [],
        newSubtasks: [] as string[],
        deletedSubtasks: [] as string[],
        columnId
    })
    const [updateTaskRequest]= useMutation(UPDATETASK,{
        refetchQueries: [GETBOARD]
    })

    const handleSubmit= async ()=>{
        try {
            await updateTaskRequest({
                variables: {
                    updateTask: {...formData, id}
                }
            })
            resetModalClose()
        } catch (error) {
            
        }
    }

    const resetModalClose= ()=>{
        setFormData({
            title: "",
            description: "",
            oldSubtasks: [],
            newSubtasks: [],
            deletedSubtasks: [],
            columnId: ""
        })
        handleClose() 
        closeParent()  
    }
    const handleAddNewSubtask= ()=>{
        setFormData((prev)=>{
            const newSubtasks= prev.newSubtasks
            newSubtasks.push("")
            return {
                ...prev, newSubtasks
            }
        })
    }

    const handleOldSubtaskDelete= (subtaskId: string)=>{
        if(formData.oldSubtasks?.length as number>0){

            setFormData((prev)=>{
                const oldSubtasks= prev.oldSubtasks
                const deletedSubtasks= prev.deletedSubtasks
                const index= oldSubtasks?.findIndex((subtask)=>subtask.subtaskId==subtaskId)
                index && oldSubtasks?.splice(index, 1)
                deletedSubtasks.push(subtaskId)
                return {
                    ...prev, oldSubtasks, deletedSubtasks
                }
            })
        }
    }

    const handleNewSubtaskDelete= (subtaskIndex: number)=>{
        setFormData((prev)=>{
            const newSubtasks= prev.newSubtasks
            newSubtasks.splice(subtaskIndex, 1)
            return {
                ...prev, newSubtasks
            }
        })
    }
    const handleOldSubtaskChange= (subtaskId: string, value: string)=>{
        setFormData((prev)=>{
            const oldSubtasks= prev.oldSubtasks 
            const index=oldSubtasks?.findIndex((subtasks)=>subtasks.subtaskId===subtaskId)
            oldSubtasks[index].title=value
            return {
                ...prev, oldSubtasks
            }
        })
    }

    const handleNewSubtaskChange= (subtaskIndex: number, value: string)=>{
        setFormData((prev)=>{
            const newSubtasks= prev.newSubtasks
            newSubtasks[subtaskIndex]=value
            return {...prev, newSubtasks}
        })
    }
  return (
    <ModalTemplate open={open} handleClose={()=>{setFormData({
        title: "",
        description: "",
        oldSubtasks: [],
        newSubtasks: [],
        deletedSubtasks: [],
        columnId: ""
    }); handleClose()}}>
        <Formik initialValues={formData} onSubmit={handleSubmit} >
            <Box>
                <h3 className='form-header'>Add New Board</h3>
                <Form>
                    <label htmlFor="">Title</label>
                    <TextField name='name' size="small" variant="outlined" fullWidth sx={{marginBottom: "1.5rem"}} value={formData.title} onChange={(e)=>setFormData({...formData, title: e.currentTarget.value})}/>
                    <label htmlFor="">Description</label>
                    <TextField name='description' multiline rows={4} size="small" variant="outlined" fullWidth sx={{marginBottom: "1.5rem"}} value={formData.description} onChange={(e)=>setFormData({...formData, description: e.currentTarget.value})}/>

                    <Box>

                        <label htmlFor="">Subtasks</label>
                        {
                            formData.oldSubtasks.map((subtask, index)=>(
                                    <Box display={"flex"} mb={"10px"} key={subtask.subtaskId}>
                                        <TextField  name={`subtasks[${index}]`} size="small" variant="outlined" fullWidth placeholder={`subtask ${index+1}`} value={subtask.title} onChange={(e)=>{handleOldSubtaskChange(subtask.subtaskId, e.currentTarget.value)}}/>
                                        <IconButton sx={{marginLeft: "10px"}}  onClick={()=>handleOldSubtaskDelete(subtask.subtaskId)}>
                                            <Close />
                                        </IconButton>
                                    </Box>
                            ))
                        }
                        {
                            formData.newSubtasks.map((subtask, index)=>(
                                    <Box display={"flex"} mb={"10px"} key={index}>
                                        <TextField  name={`subtasks[${index}]`} size="small" variant="outlined" fullWidth placeholder={`subtask ${index+1+ formData.oldSubtasks.length}`} value={subtask} onChange={(e)=>{handleNewSubtaskChange(index, e.currentTarget.value)}}/>
                                        <IconButton sx={{marginLeft: "10px"}}  onClick={()=>handleNewSubtaskDelete(index)}>
                                            <Close />
                                        </IconButton>
                                    </Box>
                            ))
                        }
                    </Box>
                    <Box className="form-btn-group" sx= {formBtnGroupStyle}>
                        <PrimaryButton title="+Add New Subtask"  onClick={handleAddNewSubtask}/>
                        <Box mb="2rem">
                            <label htmlFor="">Status</label>
                            <Select size='small' fullWidth variant='outlined' value={formData.columnId} onChange={(e)=>setFormData({...formData, columnId:e.target.value})} defaultValue={formData.columnId}>
                                            <MenuItem value="" selected>
                                                Status
                                            </MenuItem>
                                    {
                                        getBoard.columns?.map((column,index)=>(
                                            <MenuItem key={column.id} value={column.id}>
                                                {column.name}
                                            </MenuItem>
                                        ))
                                    }
                            </Select>

                        </Box>
                        <PrimaryButton title='Create Task' type="submit" />
                    </Box>
                </Form>

            </Box>
        </Formik>
    </ModalTemplate>
  )
}

export default EditTask