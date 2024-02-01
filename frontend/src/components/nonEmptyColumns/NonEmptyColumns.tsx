import { Box, Button, Card, CardActionArea, Stack, SxProps, Theme, useTheme } from "@mui/material"
import ColumnCard from "../columnCard/ColumnCard"
import { useContext, useState } from "react"
import { customThemeInitial } from "../../theme"
import { colorRange } from "../../colorRange"
import { GetBoardQuery } from "../../graphql/graphql"
import CreateColumn from "../forms/CreateColumn"
const newColumnSTyle:SxProps<Theme>= {
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  width: "255px",
  minHeight: "300px",
  marginTop: "2.5rem"
}
const NonEmptyColumns = ({columns}: {columns: TColumn[]}) => {
  const theme= useTheme()
  const {mode}= useContext(customThemeInitial)
  const [showAddColumn, setShowAddColumn] = useState(false)
  return (
    <>
      <Stack spacing={2} direction={"row"}>
        {
          columns?.map((column)=>(
            <ColumnCard key={column.id} column={column}/>
          ))
        }
        <Box >
          <CardActionArea   sx= {{...newColumnSTyle, backgroundColor: mode==="dark"? colorRange["dark-grey"]:"#a4c3f324"}} onClick={()=>setShowAddColumn(true)}>
            <Button>+New Column</Button>
          </CardActionArea>

        </Box>
      </Stack>
      <CreateColumn open={showAddColumn} handleClose={()=>{setShowAddColumn(false)}}/>
    </>
  )
}

export default NonEmptyColumns