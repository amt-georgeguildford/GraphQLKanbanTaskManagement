import {Button} from "@mui/material"
import { colorRange } from "../../colorRange"
const styleSX= {
  backgroundColor: colorRange.red,
  color: colorRange.white,
  borderRadius: "24px",
  fontWeight: "bold",
  fontFamily: `'Plus Jakarta Sans', sans-serif`,
  cursor: "pointer",
  padding: "10px 1.5rem",
  "&:hover": {
      backgroundColor: colorRange.lightRed,
      color: colorRange.white,
  },
  "&:disabled": {
      backgroundColor: colorRange.lightRed,
      color: colorRange.white,
  },
  textTransform: "none"
  
}
const DangerButton = ({title, onClick}: {title: string, onClick?: React.MouseEventHandler<HTMLButtonElement>}) => {
  return (
    <Button onClick={onClick} sx= {styleSX}>
        {title}
    </Button>
  )
}

export default DangerButton