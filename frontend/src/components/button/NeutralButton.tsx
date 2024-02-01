import { Button } from '@mui/material'
import React from 'react'
import { colorRange } from '../../colorRange'

const styleSX= {
    backgroundColor: colorRange["main-purple"],
    color: colorRange.white,
    borderRadius: "24px",
    fontWeight: "bold",
    fontFamily: `'Plus Jakarta Sans', sans-serif`,
    cursor: "pointer",
    padding: "10px 1.5rem",
    "&:hover": {
        backgroundColor: colorRange["light-main-purple"],
        color: colorRange.white,
    },
    "&:disabled": {
        backgroundColor: colorRange["light-main-purple"],
        color: colorRange.white,
    },
    textTransform: "none"
    
}
const NeutralButton = ({title, type, onClick}: {title: string, type?: "button" | "submit" | "reset", onClick?: React.MouseEventHandler<HTMLButtonElement>}) => {
  return (
    <Button variant="contained" type= {type} sx={styleSX} onClick={onClick}>
        {title}
    </Button>
  )
}

export default NeutralButton