import { ThemeProvider, Box } from "@mui/material";
import { CustomeThemeProvider, customThemeInitial } from "./theme";
import SideBar from "./components/siderbar/SideBar";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Board from "./pages/board/Board";
import { useContext } from "react";
import { ApolloClient, ApolloProvider, InMemoryCache } from "@apollo/client";
import { AllBoardProvider } from "./context/AllBoardContext";
import BoardProvider from "./context/BoardContext";

const client = new ApolloClient({
  uri: "http://localhost:5000",
  cache: new InMemoryCache(),
});
function App() {
  const { theme, mode } = useContext(customThemeInitial);

  return (
    <>
      <BrowserRouter>
        <ThemeProvider theme={theme}>
          <ApolloProvider client={client}>
            <AllBoardProvider>
              <Box display="flex" alignItems="start">
                <SideBar />
                <Routes>
                  <Route
                    path="/:id"
                    element={
                      <BoardProvider>
                        <Board />
                      </BoardProvider>
                    }
                  />
                </Routes>
              </Box>
            </AllBoardProvider>
          </ApolloProvider>
        </ThemeProvider>
      </BrowserRouter>
    </>
  );
}

export default App;
