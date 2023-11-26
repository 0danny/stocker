import { BrowserRouter, Routes, Route } from "react-router-dom"

import { FrontPage } from "./pages/FrontPage"
import { Main } from "./pages/Main"
import { Portal } from "./pages/Portal"

export default function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route index element={<FrontPage />} />
                <Route path="app" element={<Main />} />
                <Route path="portal" element={<Portal />} />
            </Routes>
        </BrowserRouter>
    )
}

// "/app" -> Main app route.
// "/" Front page route.
