import { BrowserRouter, Routes, Route } from "react-router-dom"
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
            <BrowserRouter>
                <Routes>
                    <Route index element={<FrontPage />} />
                    <Route path="app" element={<Main />} />
                </Routes>
            </BrowserRouter>
        </ThemeProvider>
    )
}

// "/app" -> Main app route.
// "/" Front page route.
