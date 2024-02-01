import React, { useState } from 'react'
import ModalTemplate from '../modal/ModalTemplate';
import { Form, Formik } from 'formik';
import { Box, TextField } from '@mui/material';
import PrimaryButton from '../button/PrimaryButton';
import { gql } from '../../graphql';
import { useMutation } from '@apollo/client';
import { GETBOARD } from '../../context/BoardContext';
import { useParams } from 'react-router-dom';

const CREATENEWCOLUMN= gql(`
    mutation CreateColumn($column: AddNewColumn!) {
  createColumn(column: $column) {
    id
    name  
  }
}
`)
const CreateColumn = ({open, handleClose}: {open: boolean, handleClose: ()=>void}) => {
    const [formData, setFormData] = useState({
        name: ""
    })
    const {id}= useParams()
    const [createColumnRequest]= useMutation(CREATENEWCOLUMN, {
        refetchQueries: [GETBOARD]
    })
    const handleSubmit= async ()=>{
        try {
            await createColumnRequest({
                variables: {
                    column: {
                        boardId: id as string,
                        name: formData.name
                    }
                }
            })
            setFormData({name: ""})
            handleClose()
        } catch (error) {
            
        }
    }
  return (
    <ModalTemplate open={open} handleClose={()=>{setFormData({name: ""}); handleClose()}}>
        <Formik initialValues={formData} onSubmit={handleSubmit} >
            <Box>
                <h3 className='form-header'>Add New Column</h3>
                <Form>
                    <label htmlFor="">Name</label>
                    <TextField name='name' size="small" variant="outlined" fullWidth sx={{marginBottom: "1.5rem"}} value={formData.name} onChange={(e)=>setFormData({...formData, name: e.currentTarget.value})}/>

                    <PrimaryButton title='Create New Column' type="submit" />
                </Form>

            </Box>
        </Formik>
    </ModalTemplate>
  )
}

export default CreateColumn