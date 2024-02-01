import React, { createContext, useState } from "react"
import {createTheme, Theme, ThemeOptions,} from '@mui/material'
import { colorRange } from "./colorRange"

const token= (mode: "dark" | "light"):ThemeOptions=>{
    return {
        palette: mode==="dark"?{
            primary: {
                main: colorRange["dark-grey"]
            },
            secondary: {
                main: colorRange.dark,
            },
            mode 
        }:{
            primary: {
                main: colorRange.white
            },
            secondary: {
                main: colorRange["light-grey"],
            },
            mode
        },
        typography: {
            h1: {
                fontFamily: `'Plus Jakarta Sans',sans-serif`,
                fontWeight: "bold",
                fontSize: '24px',
                lineHeight: '30px'
            },
            h2: {
                fontFamily: `'Plus Jakarta Sans',sans-serif`,
                fontWeight: "bold",
                fontSize: '18px',
                lineHeight: '23px'
            },
            h3: {
                fontFamily: `'Plus Jakarta Sans',sans-serif`,
                fontWeight: "bold",
                fontSize: '12px',
                lineHeight: '15px'
            },
            button: {
                cursor: "pointer",
                fontFamily: `'Plus Jakarta Sans',sans-serif`,
                fontWeight: "bold",
            },
            fontFamily: `'Plus Jakarta Sans',sans-serif`,

        },
    }
}


export const customThemeInitial= createContext({} as {theme: Theme, mode: "dark" | "light",setMode:React.Dispatch<React.SetStateAction<"dark" | "light">>})
export const CustomeThemeProvider= ({children}: {children: React.ReactNode})=>{
    const [mode, setMode]= useState<"dark" | "light">("light")
    const theme= createTheme(token(mode))
    return (
        <customThemeInitial.Provider value={{mode, setMode, theme}}>
            {children}
        </customThemeInitial.Provider>
    )
}

