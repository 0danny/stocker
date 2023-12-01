import { BrowserRouter, HashRouter, Routes, Route } from "react-router-dom"
import { createTheme } from "@mui/material/"
import { ThemeProvider } from "@mui/material/styles"

import { FrontPage } from "./pages/FrontPage"
import { Main } from "./pages/Main"

const theme = createTheme({
    typography: {
        fontFamily: "Custom",
    },
})

export default function App() {
    return (
        <ThemeProvider theme={theme}>
            <HashRouter>
                <Routes>
                    <Route index element={<FrontPage />} />
                    <Route path="app" element={<Main />} />
                </Routes>
            </HashRouter>
        </ThemeProvider>
    )
}

// "/app" -> Main app route.
// "/" Front page route.
