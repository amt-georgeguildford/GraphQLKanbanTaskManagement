import React, { useState } from "react";
import { Box, IconButton, SxProps, TextField, Theme } from "@mui/material";
import ModalTemplate from "../modal/ModalTemplate";
import { Formik, Form, useFormik } from "formik";
import { Close } from "@mui/icons-material";
import PrimaryButton from "../button/PrimaryButton";
import { colorRange } from "../../colorRange";
import * as Yup from "yup";
import { gql } from "../../graphql";
import { useMutation } from "@apollo/client";
import { GETBOARDS } from "../siderbar/SideBar";
const formBtnGroupStyle: SxProps<Theme> = {
  display: "flex",
  flexDirection: "column",
  "&>button:first-child": {
    backgroundColor: "#d2d1ebad",
    margin: "10px 0 2rem 0",
    color: colorRange["main-purple"],
  },
  "&>button:first-child:hover": {
    backgroundColor: "#a09ed3ad",
  },
};
const createBoardsSchema = Yup.object().shape({
  name: Yup.string().required("Please provide board name").min(5),
  columns: Yup.array(),
});

const CREATEBOARDCOMMAND = gql(`
    mutation CreateBoard($board: BoardNew!) {
  createBoard(board: $board) {
    id
    name
    columns {
      id
      name
    }
  }
}
`)
const CreateBoard = ({
  open,
  handleClose,
}: {
  open: boolean;
  handleClose: () => void;
}) => {
    const [createrequest]= useMutation(CREATEBOARDCOMMAND, {
        refetchQueries: [GETBOARDS]
    })
  const handleNameChange= (e:React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>)=>{
      const name= e.currentTarget.value
    setFormData((prev)=>{
        return {...prev, name}
    })
  }
  const [formData, setFormData] = useState({
    name: "",
    columns: [""],
  });

  const handleSubmit = async () => {
    try {
        await createrequest({
            variables: {
                board: formData
            }
        })
        handleClose();
    } catch (error) {
        
    }
  };

  const handleAddNewColumn = () => {
    setFormData((prev) => {
      const columns = prev.columns;
      columns.push("");
      return {
        ...prev,
        columns,
      };
    });
  };

  const handleColumnDelete = (columnIndex: number) => {
    if (formData.columns.length > 1) {
      setFormData((prev) => {
        console.log("columnIndex: ", columnIndex);
        const columns = prev.columns;
        columns.splice(columnIndex, 1);
        console.log("newColumn: ", columns);
        return {
          ...prev,
          columns,
        };
      });
    }
  };

  const handleColumnChange = (columnIndex: number, value: string) => {
    setFormData((prev) => {
      const columns = prev.columns;
      columns[columnIndex] = value;
      return {
        ...prev,
        columns,
      };
    });
  };
  return (
    <ModalTemplate
      open={open}
      handleClose={() => {
        setFormData({
          name: "",
          columns: [""],
        });
        handleClose();
      }}
    >
      <Formik initialValues={formData} onSubmit={handleSubmit}>
        {
            ({touched,errors,values,handleBlur,handleChange,handleSubmit})=>(
                <Box>
          <h3 className="form-header">Add New Board</h3>
          <Form>
            <label htmlFor="">Name</label>
            <TextField
              name="name"
              size="small"
              variant="outlined"
              fullWidth
              sx={{ marginBottom: "1.5rem" }}
              value={formData.name}
              error= {touched.name && Boolean(errors.name) }
              helperText= {touched.name && errors.name }
              onChange={handleNameChange}
              onBlur={handleBlur}
            />
            <Box>
              <label htmlFor="">Columns</label>
              {formData.columns.map((column, index) => (
                <Box display={"flex"} mb={"10px"} key={index}>
                  <TextField
                    name={`subtasks[${index}]`}
                    size="small"
                    variant="outlined"
                    fullWidth
                    placeholder={`column ${index + 1}`}
                    value={column}
                    onChange={(e) => {
                      handleColumnChange(index, e.currentTarget.value);
                    }}
                  />
                  <IconButton
                    sx={{ marginLeft: "10px" }}
                    onClick={() => handleColumnDelete(index)}
                  >
                    <Close />
                  </IconButton>
                </Box>
              ))}
            </Box>
            <Box className="form-btn-group" sx={formBtnGroupStyle}>
              <PrimaryButton
                title="+Add New Column"
                onClick={handleAddNewColumn}
              />
              <PrimaryButton title="Create New baord" type="submit" />
            </Box>
          </Form>
        </Box>
            )
        }
        
      </Formik>
    </ModalTemplate>
  );
};

export default CreateBoard;
