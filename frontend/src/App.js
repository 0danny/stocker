import { BrowserRouter, HashRouter, Routes, Route } from "react-router-dom"
import { createTheme } from "@mui/material/"
import { ThemeProvider } from "@mui/material/styles"

import { FrontPage } from "./pages/FrontPage"
import { Main } from "./pages/Main"
import { NotFound } from "./pages/NotFound"
import { Success } from "./pages/Success"

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
                    <Route path="/app" element={<Main />} />
                    <Route path="/success" element={<Success />} />
                    <Route path="/*" element={<NotFound />} />
                </Routes>
            </BrowserRouter>
        </ThemeProvider>
    )
}

// "/app" -> Main app route.
// "/" Front page route.
