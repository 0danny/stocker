import { BrowserRouter, HashRouter, Routes, Route } from "react-router-dom"
import { createTheme } from "@mui/material/"
import { ThemeProvider } from "@mui/material/styles"
import { CssBaseline } from "@mui/material/"

import { FrontPage } from "./pages/FrontPage"
import { Main } from "./pages/Main"
import { NotFound } from "./pages/NotFound"
import { Success } from "./pages/Success"
import { Cancel } from "./pages/Cancel"

const { palette } = createTheme()

const theme = createTheme({
    palette: {
        primaryDarker: palette.augmentColor({
            color: {
                main: "#123EB1",
            },
        }),
        background: {
            paper: "#E9E9E9", // your color
        },
    },

    typography: {
        fontFamily: "Custom",
    },
})

export default function App() {
    return (
        <ThemeProvider theme={theme}>
            <CssBaseline />
            <BrowserRouter>
                <Routes>
                    <Route index element={<FrontPage />} />
                    <Route path="/app" element={<Main />} />
                    <Route path="/success" element={<Success />} />
                    <Route path="/cancel" element={<Cancel />} />
                    <Route path="/*" element={<NotFound />} />
                </Routes>
            </BrowserRouter>
        </ThemeProvider>
    )
}

// "/app" -> Main app route.
// "/" Front page route.
