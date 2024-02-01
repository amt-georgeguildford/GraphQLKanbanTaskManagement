import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { CustomeThemeProvider } from './theme.tsx'

ReactDOM.createRoot(document.getElementById('root')!).render(
    <CustomeThemeProvider>
    <App /> 

</CustomeThemeProvider>,
)
