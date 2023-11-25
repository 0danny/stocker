import { BrowserRouter, Routes, Route } from "react-router-dom"

import { FrontPage } from "./pages/FrontPage"
import { Main } from "./pages/Main"

export default function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route index element={<FrontPage />} />
                <Route path="app" element={<Main />} />
            </Routes>
        </BrowserRouter>
    )
}

// "/app" -> Main app route.
// "/" Front page route.
