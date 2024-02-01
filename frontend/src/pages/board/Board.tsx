import {Routes, Route, useParams} from "react-router-dom"
import Header from "../../components/header/Header"
import { Box, SxProps, Theme, useTheme } from "@mui/material"
import NonEmptyColumns from "../../components/nonEmptyColumns/NonEmptyColumns"
import { gql } from "../../graphql"
import { useQuery } from "@apollo/client"
import { GetBoardQuery } from "../../graphql/graphql"
import EmptyColumn from "../../components/emptyColumn/EmptyColumn"
import { useSelectBaord } from "../../context/BoardContext"
import CurrentTaskSelectProvider from "../../context/CurentTaskContext"
import {DragDropContext, OnDragEndResponder} from "react-beautiful-dnd"
const Board = () => {
    const theme= useTheme()
    const data =useSelectBaord()
    const boardStyle:SxProps<Theme>= {
        width: "100%",
        minHeight: "100vh",
    }
    const boardContentStyle:SxProps<Theme>= {
        minHeight: 'calc(100vh - 100px)'
    }

    const handleDragEnd:OnDragEndResponder=(moveData)=>{
        console.log(moveData)
    }
  return (
      <CurrentTaskSelectProvider>

        <Box sx={{...boardStyle}} >
        <Header />
        <Box sx= {{...boardContentStyle, backgroundColor: theme.palette.secondary.main}} className="board-content">
            {
                data?.getBoard.columns?.length? (
                    <DragDropContext onDragEnd={handleDragEnd}>
                        <NonEmptyColumns columns={data.getBoard.columns}/>
                    </DragDropContext>
                ): (
                    <EmptyColumn />
                )
            }
            
        </Box>
        </Box>
      </CurrentTaskSelectProvider>

  )
}

export default Board