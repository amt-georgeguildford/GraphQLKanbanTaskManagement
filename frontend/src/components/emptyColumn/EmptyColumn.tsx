import { Box, SxProps, Typography, useTheme } from "@mui/material"
import PrimaryButton from "../button/PrimaryButton"
import { Theme } from "@emotion/react"
import { useState } from "react"
import CreateColumn from "../forms/CreateColumn"

const EmptyColumn = () => {
    const theme= useTheme()
    const [showAddColumn, setShowAddColumn] = useState(false)
    const style:SxProps<Theme>= {
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "calc(100vh - 100px)",
        textAlign: "center",
        "& button": {
            marginTop: "10px"
        }
    }
  return (
    <>
        <Box sx= {style}>
            <Box>
                <Typography variant="h3">This board is empty. Create a new column to get started</Typography>
                <PrimaryButton title="+Add New Column" onClick={()=>setShowAddColumn(true)}/>
            </Box>

        </Box>
        <CreateColumn open={showAddColumn} handleClose={()=>{setShowAddColumn(false)}}/>
    </>
  )
}

export default EmptyColumn