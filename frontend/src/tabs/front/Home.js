import { Stack, Button } from "@mui/material"

import PlayCircle from "@mui/icons-material/PlayCircleFilledWhiteOutlined"
import Article from "@mui/icons-material/ArticleOutlined"

import "./Home.css"

export const Home = () => {
    return (
        <Stack
            direction={"column"}
            justifyContent={"center"}
            alignItems={"center"}
            sx={{ width: "100%" }}
        >
            <span className="front-home-largetext">Modern stock checker</span>
            <span className="front-home-mediumtext">Don't miss out on your favourite items.</span>
            <span className="front-home-mediumtext">Sign up now to get started!</span>

            <Stack direction={"row"} spacing={2} sx={{ marginTop: 3 }}>
                <Button component="label" variant="contained" startIcon={<PlayCircle />}>
                    Get Started
                </Button>

                <Button component="label" variant="outlined" startIcon={<Article />}>
                    Documentation
                </Button>
            </Stack>
        </Stack>
    )
}
