import { Link, useNavigate, useParams } from "react-router-dom"
import { Box, useTheme, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Typography, IconButton, Switch, Button, SxProps, Theme} from "@mui/material"
import { CSSProperties, useContext, useEffect, useState } from "react"
import { colorRange } from "../../colorRange"
import { GridView, LightMode,DarkMode,VisibilityOff} from "@mui/icons-material"
import { customThemeInitial } from "../../theme"
import NavItem from "../navItem/NavItem"
import CreateBoard from "../forms/CreateBoard"
import { useQuery } from "@apollo/client"
import { gql } from "../../graphql"
import { GetBoardsQuery } from "../../graphql/graphql"
import { useAllBoards } from "../../context/AllBoardContext"

export const GETBOARDS= gql(`
    query GetBoards {
  getBoards {
    id
    name
    columns {
      id
      name
    }
  }
}
`)

const modeSwitchContainer:SxProps<Theme>= {
    padding: '10px 0',
    borderRadius: "6px",
    margin: '0 2rem 1rem 2rem',
    '&>.MuiBox-root': {
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
    }
}



const sideButtonStyle: SxProps<Theme>= {
    color: colorRange["medium-grey"], margin: "0 2rem",
    fontWeight: 'bold',
    "&:hover": {
        color: "#9aa0ab"
    }
}

const createBoardStyle: SxProps<Theme>= {
    color: colorRange["medium-grey"], 
    borderRadius: "0 5px 5px 0",
    fontWeight: "bold"
}

const switchState: SxProps<Theme>= {
        
        "& .MuiSwitch-thumb": {
            backgroundColor: colorRange.white
        },
        "& .MuiSwitch-track": {
            backgroundColor: colorRange["main-purple"],
            opacity: 1
        },



}
const SideBar = () => {
    const {data} = useAllBoards()
    const {setMode,mode}= useContext(customThemeInitial)
    const theme= useTheme()
    const [showCreateBoard, setShowCreateBoard] = useState(false)
    const navigate= useNavigate()
    const createBoardHoverState:SxProps<Theme>= {
        "&:hover": {
            backgroundColor: mode==="dark"?colorRange.white: colorRange['light-grey'],
            color: colorRange['main-purple']
        },
        "&:hover .icon": {
            color: colorRange['main-purple']
        }
    }
    
    useEffect(()=>{
        if(data){
            if(data.getBoards.length>0){
                navigate(`./${data.getBoards[0].id}`)
            }
        }
    }, [data])
    
  return (
            <>
                <Box display={"flex"} flexDirection={"column"} justifyContent={"space-between"} alignContent={"center"} sx={{backgroundColor: theme.palette.primary.main, height: "100vh", width: "400px", padding: "2.5rem 0"}}>
                <Box>
                    <Box paddingX="2rem" mb="3rem"><img src={mode==="dark"? "./logodark.svg" :"./logo.svg"} alt="" /></Box>
                    <Typography variant="h3" paddingX="2rem" color={colorRange["medium-grey"]}>ALL BOARDS ({data?.getBoards.length || 0})</Typography>
                    <List>
                        {
                            data && data.getBoards.map((board)=>(
                                <>
                                    <NavItem boardId={board.id} title={board.name} key={board.id}/>
                                </>
                            ))
                        }
                        <ListItemButton style={{paddingLeft: "1.5rem"}} sx={{...createBoardStyle, ...createBoardHoverState}} className='navItem' onClick={()=>setShowCreateBoard(true)}>
                            <ListItemIcon>
                                <GridView  className='icon'/>
                            </ListItemIcon>
                            <ListItemText primary="+Create New Board"/>
                        </ListItemButton>
                    </List>
                </Box>
                <Box >
                    <Box sx={{...modeSwitchContainer, backgroundColor: theme.palette.secondary.main}}>
                        <Box >
                            <IconButton onClick={()=>setMode("light")}>
                                <LightMode />
                            </IconButton>
                            <Switch onChange={()=>setMode(mode==="dark"?"light": "dark")} checked= {mode==="dark"?true: false} sx= {switchState}/>
                            <IconButton onClick={()=>setMode("dark")}>
                                <DarkMode />
                            </IconButton>
                        </Box>
                    </Box>
                    <Button startIcon= {<VisibilityOff />  } sx= {sideButtonStyle}>
                          Hide Sidebar
                    </Button>
                </Box>
            </Box>

                <CreateBoard open= {showCreateBoard} handleClose={()=>{setShowCreateBoard(false)}}/>
            </>
  )
}

export default SideBar