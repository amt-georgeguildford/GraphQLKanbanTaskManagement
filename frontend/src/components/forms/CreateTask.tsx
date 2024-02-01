import { useState } from 'react'
import ModalTemplate from '../modal/ModalTemplate'
import { Form, Formik } from 'formik'
import { Box, IconButton, Menu, SxProps, TextField, Theme, MenuItem, Select} from '@mui/material'
import { Close } from '@mui/icons-material'
import PrimaryButton from '../button/PrimaryButton'
import { colorRange } from '../../colorRange'
import { GETBOARD, useSelectBaord } from '../../context/BoardContext'
import { gql } from '../../graphql'
import { useMutation } from '@apollo/client'

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

const CREATETASKCOMMAND= gql(`
    mutation CreateTask($createTask: CreateTask!) {
  createTask(createTask: $createTask) {
    id
    title
    description
    position
    subtasks {
      id
      title
      checked
    }
  }
}
`)
const CreateTask = ({open, handleClose}: {open: boolean, handleClose: ()=>void}) => {
    const selectBoardData= useSelectBaord()
    const [createTaskRequest]= useMutation(CREATETASKCOMMAND, {
        refetchQueries: [GETBOARD]
    })
    const [formData, setFormData] = useState({
        title: "",
        description: "",
        subtasks: [""],
        columnId: ""
    })
    

    const handleSubmit= async ()=>{
        try {
            await createTaskRequest({
                variables: {
                    createTask: formData,
                }
            })
            resetCloseModal()

        } catch (error) {
            
        } 
    }


    const handleAddNewSubtask= ()=>{
        setFormData((prev)=>{
            const subtasks= prev.subtasks
            subtasks.push("")
            return {
                ...prev, subtasks
            }
        })
    }
    const resetCloseModal= ()=>{
        setFormData({
            title: "",
            description: "",
            subtasks: [""],
            columnId: ""
        }) 
        handleClose()
    }
    const handleSubtaskDelete= (columnIndex:number)=>{
        if(formData.subtasks.length>1){

            setFormData((prev)=>{
                console.log("columnIndex: ", columnIndex)
                const columns= prev.subtasks
                columns.splice(columnIndex, 1)
                console.log("newColumn: ", columns)
                return {
                    ...prev, columns
                }
            })
        }
    }

    const handleSubtaskChange= (columnIndex: number, value: string)=>{
        setFormData((prev)=>{
            const subtasks= prev.subtasks
            subtasks[columnIndex]= value
            return {
                ...prev, subtasks
            }
        })
    }
  return (
    <ModalTemplate open={open} handleClose={()=>{resetCloseModal()}}>
        <Formik initialValues={formData} onSubmit={handleSubmit} >
            <Box>
                <h3 className='form-header'>Add New Task</h3>
                <Form>
                    <label htmlFor="">title</label>
                    <TextField name='name' size="small" variant="outlined" fullWidth sx={{marginBottom: "1.5rem"}} value={formData.title} onChange={(e)=>setFormData({...formData, title: e.currentTarget.value})}/>
                    <label htmlFor="">Description</label>
                    <TextField name='name' multiline rows={4} size="small" variant="outlined" fullWidth sx={{marginBottom: "1.5rem"}} value={formData.description} onChange={(e)=>setFormData({...formData, description: e.currentTarget.value})}/>

                    <Box>

                        <label htmlFor="">Subtasks</label>
                        {
                            formData.subtasks.map((subtask, index)=>(

                                    <Box display={"flex"} mb={"10px"} key={index}>
                                        <TextField  name={`subtasks[${index}]`} size="small" variant="outlined" fullWidth placeholder={`subtask ${index+1}`} value={subtask} onChange={(e)=>{handleSubtaskChange(index, e.currentTarget.value)}}/>
                                        <IconButton sx={{marginLeft: "10px"}}  onClick={()=>handleSubtaskDelete(index)}>
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
                                        selectBoardData.getBoard.columns?.map((column,index)=>(
                                            <MenuItem key={index} value={column.id}>
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

export default CreateTask