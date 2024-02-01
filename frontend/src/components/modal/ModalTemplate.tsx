import { Box, Modal, SxProps, Theme, useTheme } from "@mui/material"
import { useContext } from "react"
import { customThemeInitial } from "../../theme"
import { colorRange } from "../../colorRange"
const ModalTemplate = ({open, handleClose, children}: {open: boolean, handleClose: ()=>void, children: React.ReactElement}) => {
    const theme= useTheme()
    const {mode}= useContext(customThemeInitial)
    const modalStyle: SxProps<Theme>= {
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        color: mode==="dark"? colorRange.white : undefined,
        "&>.modal-content": {
            minWidth: "400px",
            borderRadius: "5px",
            padding: "1rem",
            backgroundColor:theme.palette.primary.main 
        },

        
    }
  return (
    <Modal open= {open} onClose={handleClose} sx= {modalStyle}>
        <Box className="modal-content">
            {children}

        </Box>
    </Modal>
  )
}

export default ModalTemplate