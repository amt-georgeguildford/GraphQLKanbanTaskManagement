import React, { useContext } from 'react'
import ModalTemplate from '../modal/ModalTemplate'
import { Box, SxProps, Theme, Typography } from '@mui/material'
import DangerButton from '../button/DangerButton'
import NeutralButton from '../button/NeutralButton'
import { colorRange } from '../../colorRange'
import { customThemeInitial } from '../../theme'
const actionModalStyle:SxProps<Theme>= {
    "& .action-modal-btn-group": {
        display: "flex",

    },

    "& button": {
        width: "100%",
    },

    "& button:nth-child(1)": {
        marginRight: "1rem"
    }
}
const ActionModal = ({open, handleClose, title, message, action}: {open: boolean, title: string, message: string, action: ()=>void, handleClose: ()=>void}) => {
    const {mode}= useContext(customThemeInitial)
  return (
    <ModalTemplate open= {open} handleClose={handleClose} >
        <Box maxWidth={"400px"} sx= {actionModalStyle}>
            <Typography variant='h2' sx= {{color: colorRange.red}}>{title}</Typography>
            <Typography variant='caption' sx={{color: colorRange['medium-grey'], margin: "2rem 0", display: "block"}}>{message}</Typography>
            <Box  className= "action-modal-btn-group">
                <DangerButton title='Delete' onClick={action}/>
                <NeutralButton title='Cancel' onClick={handleClose}/>
            </Box>
        </Box>
    </ModalTemplate>
  )
}

export default ActionModal