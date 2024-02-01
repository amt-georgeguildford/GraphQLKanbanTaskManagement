import { useState } from "react"
import ModalTemplate from "../modal/ModalTemplate"
import { Form, Formik } from "formik"
import { Box, IconButton, SxProps, TextField, Theme } from "@mui/material"
import { Close } from "@mui/icons-material"
import PrimaryButton from "../button/PrimaryButton"
import { colorRange } from "../../colorRange"
import { useSelectBaord } from "../../context/BoardContext"
import { gql } from "../../graphql"
import { useMutation } from "@apollo/client"
import { GETBOARDS } from "../../context/AllBoardContext"

const UPDATEBOARD= gql(`
    mutation UpdateBoard($updateBoard: UpdateBoard!) {
  updateBoard(updateBoard: $updateBoard) {
    id
    name,
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
const EditBoard = ({open, handleClose}: {open: boolean, handleClose: ()=>void,}) => {
    const {getBoard}= useSelectBaord()
    const oldColumns: {id: string, name: string}[]=getBoard.columns? getBoard.columns.map((column)=>({id: column.id, name: column.name})):  []
    const newColumns: string[]=[]
    const deletedColumns: string[]=[]
  const [formData, setFormData] = useState({
    name: getBoard.name,
    oldColumns,
    newColumns,
    deletedColumns
})
    const [updateBoardRequest]= useMutation(UPDATEBOARD, {
        refetchQueries: [GETBOARDS]
    })
const handleSubmit= async ()=>{
        try {
            await updateBoardRequest({
                variables: {
                    updateBoard: {...formData, id: getBoard.id}
                }
            })
            resetCloseModal()
        } catch (error) {
            
        }
}

const resetCloseModal= ()=>{
    setFormData({
        name: getBoard.name,
        oldColumns,
        newColumns,
        deletedColumns: []
    })
    handleClose()
}
const handleAddNewColumn= ()=>{
    setFormData((prev)=>{
        const newColumns= prev.newColumns
        newColumns.push("")
        return {
            ...prev, newColumns
        }
    })
}

const handleOldColumnDelete= (columnId: string)=>{
    if(formData.oldColumns.length>0){

        setFormData((prev)=>{
            const oldColumns= prev.oldColumns.filter((column)=>column.id!==columnId)
            const deletedColumns= prev.deletedColumns
            deletedColumns.push(columnId)
            return {
                ...prev, oldColumns
            }
        })
    }
}
const handleNewColumnDelete= (columnIndex: number)=>{
    setFormData((prev)=>{
        const newColumns=prev.newColumns
        newColumns.splice(columnIndex, 1)
        return {...prev, newColumns}
    })
}
const handleNewColumnChange= (columnIndex: number, value: string)=>{
    setFormData((prev)=>{
        const newColumns= prev.newColumns
        newColumns[columnIndex]= value
        return {
            ...prev, newColumns
        }
    })
}

const handleOldColumnChange= (columnId: string, value: string)=>{
    setFormData((prev)=>{
        const oldColumns= prev.oldColumns
        const index= oldColumns.findIndex((column)=>column.id===columnId)
        oldColumns[index].name=value
        return{
            ...prev, oldColumns
        }
    })
}
return (
<ModalTemplate open={open} handleClose={()=>{resetCloseModal()}}>
    <Formik initialValues={formData} onSubmit={handleSubmit} >
        <Box>
            <h3 className='form-header'>Edit Board</h3>
            <Form>
                <label htmlFor="">Name</label>
                <TextField name='name' size="small" variant="outlined" fullWidth sx={{marginBottom: "1.5rem"}} value={formData.name} onChange={(e)=>setFormData({...formData, name: e.currentTarget.value})}/>
                <Box>

                    <label htmlFor="">Columns</label>
                    {
                        // previous columns
                        formData.oldColumns.map((column, index)=>(

                                <Box display={"flex"} mb={"10px"} key={index}>
                                    <TextField  name={`oldcolumns[${index}]`} size="small" variant="outlined" fullWidth placeholder={`column ${index+1}`} value={column.name} onChange={(e)=>{handleOldColumnChange(column.id, e.currentTarget.value)}}/>
                                    <IconButton sx={{marginLeft: "10px"}}  onClick={()=>handleOldColumnDelete(column.id)}>
                                        <Close />
                                    </IconButton>
                                </Box>
                        ))
                    }
                    {
                        // new columns
                        formData.newColumns.map((column, index)=>(

                                <Box display={"flex"} mb={"10px"} key={index}>
                                    <TextField  name={`newcolumns[${index}]`} size="small" variant="outlined" fullWidth placeholder={`column ${index+1+oldColumns.length}`} value={column} onChange={(e)=>{handleNewColumnChange(index, e.currentTarget.value)}}/>
                                    <IconButton sx={{marginLeft: "10px"}}  onClick={()=>handleNewColumnDelete(index)}>
                                        <Close />
                                    </IconButton>
                                </Box>
                        ))
                    }
                </Box>
                <Box className="form-btn-group" sx= {formBtnGroupStyle}>
                    <PrimaryButton title="+Add New Column"  onClick={handleAddNewColumn}/>
                    <PrimaryButton title='Save Changes' type="submit" />

                </Box>
            </Form>

        </Box>
    </Formik>
</ModalTemplate>
)
}

export default EditBoard