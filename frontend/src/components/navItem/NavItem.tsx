import { ListItem, ListItemButton, ListItemIcon, ListItemText, SxProps, Theme, useTheme } from '@mui/material'
import { Link, useParams, NavLink } from 'react-router-dom'
import { colorRange } from '../../colorRange'
import { GridView } from '@mui/icons-material'
import { useContext } from 'react'
import { customThemeInitial } from '../../theme'

const navItemStyle:SxProps<Theme>= {
    color: colorRange["medium-grey"], 
    borderRadius: "0 32px 32px 0",
}


const NavItem = ({boardId, title}: {boardId: string, title: string}) => {
    const {mode}= useContext(customThemeInitial)
    const hoverState:SxProps<Theme>= {
        "&:hover": {
            backgroundColor: mode==="dark"?colorRange.white: colorRange['light-grey'],
            color: colorRange['main-purple']
        },
        "&:hover .icon": {
            color: colorRange['main-purple']
        }
    }

    const listStyle:SxProps<Theme>= {
        "& .active .navItem": {
            backgroundColor: colorRange['main-purple'],
            color: colorRange.white,
        },
        "&:hover .active .icon": {
            color: colorRange.white,
        },
        "& .active .icon": {
            color: colorRange.white,
        },
    }
  return (
    <ListItem disablePadding color={colorRange["medium-grey"]} sx= {{...listStyle}}>
        <NavLink to={`./${boardId}`} style={{width: "100%"}} >
            <ListItemButton style={{paddingLeft: "1.5rem"}} sx={{...navItemStyle, ...hoverState}} className='navItem'>
                        <ListItemIcon>
                            <GridView  className='icon'/>
                        </ListItemIcon>
                        <ListItemText primary={title} />
            </ListItemButton>
        </NavLink>
        
    </ListItem>
  )
}

export default NavItem