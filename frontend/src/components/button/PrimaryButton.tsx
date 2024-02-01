import { Button } from "@mui/material"
import {CSSProperties} from "react"
import { colorRange } from "../../colorRange"
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
const PrimaryButton = ({title, type, onClick, disabled }: {title: string, type?: "button" | "submit" | "reset", onClick?: React.MouseEventHandler<HTMLButtonElement>, disabled?: boolean}) => {
  return (
    <Button variant="contained" type= {type} sx={styleSX} onClick={onClick} disabled= {disabled}>
        {title}
    </Button>
  )
}

export default PrimaryButton