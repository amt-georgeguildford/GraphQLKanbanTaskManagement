import { Box, Typography, IconButton, SxProps, Menu, MenuItem, useTheme } from "@mui/material"
import PrimaryButton from "../button/PrimaryButton"
import {MoreVert} from "@mui/icons-material"
import { Theme } from "@emotion/react"
import { colorRange } from "../../colorRange"
import { useContext, useEffect, useState } from "react"
import { customThemeInitial } from "../../theme"
import CreateTask from "../forms/CreateTask"
import EditBoard from "../forms/EditBoard"
import ActionModal from "../actionmodal/ActionModal"
import { gql } from "../../graphql"
import {useMutation} from "@apollo/client"
import { useParams } from "react-router-dom"
import { GETBOARDS } from "../siderbar/SideBar"
import { useAllBoards } from "../../context/AllBoardContext"
import { useNavigate } from "react-router-dom"
import { useSelectBaord } from "../../context/BoardContext"
const DELETEBOARD= gql(`
    mutation DeleteBoard($deleteBoardId: ID!) {
  deleteBoard(id: $deleteBoardId) {
    id
    name
  }
}
`)
const Header = () => {
    const [anchorEl, setAnchorEl] = useState<null |  HTMLElement>(null)
    const [boardName, setBoardName] = useState("")
    const navigate= useNavigate()
    const {data}= useAllBoards()
    const theme= useTheme()
    const {mode}= useContext(customThemeInitial)
    const open= Boolean(anchorEl)
    const headerStyle: SxProps<Theme>= {
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        height: "100px",
        borderBottom: `1px solid ${colorRange["light-grey"]}`
    }
    const {id}= useParams()
    const {getBoard}= useSelectBaord()
    const [showCreateTask, setShowCreateTask] = useState(false)
    const [showEditBoard, setShowEditBoard] = useState(false)
    const [showDeleteBoard, setShowDeleteBoard] = useState(false)
    const [deleteBoard]= useMutation(DELETEBOARD, {
        refetchQueries: [GETBOARDS],
        variables: {
            deleteBoardId: id as string
        }
    })
    const handleDeleteBoard= async ()=>{
        if(id){
            await deleteBoard()
            setShowDeleteBoard(false)

            const index= data?.getBoards.findIndex((board)=>board.id===id) || 0
            if(data?.getBoards.length=== index+1){

                navigate(`/${data?.getBoards[0].id}`)
            }
            else {
                navigate(`/${data?.getBoards[index].id}`)
            }
        }
    }

    useEffect(()=>{
        if(id){
            const currentName= data?.getBoards.find((board)=>board.id===id)
            setBoardName(currentName? currentName.name: "")
        }
    }, [id])
  return (
    <>
    <Box sx={{...headerStyle, backgroundColor: theme.palette.primary.main}}>
        <Typography variant="h1" sx= {{color: mode=== "light"? "black": colorRange.white}}>{boardName}</Typography>
        <Box>
            <PrimaryButton title="Add New Task" onClick={()=>setShowCreateTask(true)} disabled= {(!getBoard || !getBoard.columns || getBoard.columns.length==0)}/>
            <IconButton sx={{marginLeft: "10px"}} onClick={(e)=>setAnchorEl(e.currentTarget)}><MoreVert /></IconButton>
            <Menu open={open} anchorEl={anchorEl} onClose={()=>setAnchorEl(null)}>
                <MenuItem onClick={()=>{setShowEditBoard(true); setAnchorEl(null)}} sx= {{color: colorRange["medium-grey"]}}>Edit Board</MenuItem>
                <MenuItem onClick={()=>{setShowDeleteBoard(true); setAnchorEl(null)}} sx= {{color: colorRange.red}}>Delete Board</MenuItem>
            </Menu>
        </Box>
    </Box>
    
    <CreateTask open= {showCreateTask} handleClose={()=>{setShowCreateTask(false)}} />
    <EditBoard open= {showEditBoard} handleClose={()=>{setShowEditBoard(false)}}/>
    <ActionModal open= {showDeleteBoard} handleClose={()=>{setShowDeleteBoard(false)}} title="Delete this board?" message="Are you sure you want to delete the 'Platform Launch board? This action will remove all columns and tasks and cannot be reversed." action={handleDeleteBoard}/>
    </>
  )
}

export default Header