import { Divider, Stack } from "@mui/material"
import ShowChart from "@mui/icons-material/ShowChart"
import Card from "@mui/material/Card"
import CardActions from "@mui/material/CardActions"
import CardContent from "@mui/material/CardContent"
import Button from "@mui/material/Button"
import Typography from "@mui/material/Typography"
import TextField from "@mui/material/TextField"
import IconButton from "@mui/material/IconButton"
import ArrowBackIcon from "@mui/icons-material/ArrowBack"

import { useState } from "react"

import PortalBackground from "../images/portal/bg.jpeg"

export const Portal = () => {
    const BackPressed = (event) => {
        window.location.href = "/"
    }

    return (
        <Stack
            direction={"column"}
            justifyContent={"center"}
            alignItems={"center"}
            width={"100%"}
            height={"100%"}
            sx={{
                backgroundImage: `url(${PortalBackground})`,
                backgroundRepeat: "no-repeat",
                backgroundSize: "cover",
                backgroundPosition: "center",
                position: "relative",
            }}
        >
            <IconButton
                aria-label="delete"
                size="medium"
                sx={{
                    bgcolor: "white",
                    color: "primary.main",
                    boxShadow: 2,
                    position: "absolute",
                    top: 20,
                    left: 20,
                }}
                onClick={BackPressed}
            >
                <ArrowBackIcon fontSize="inherit" />
            </IconButton>
            <Login />
        </Stack>
    )
}

const Login = () => {
    return (
        <Card
            sx={{
                minWidth: 400,
                mt: 3,
                borderColor: "primary.main",
                borderWidth: "1px",
                borderStyle: "solid",
                boxShadow: 2,
                padding: 2,
            }}
        >
            <CardContent
                sx={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    flexDirection: "column",
                }}
            >
                <Stack
                    direction="row"
                    width={"100"}
                    spacing={2}
                    justifyContent="center"
                    alignItems="center"
                    padding={1}
                >
                    <ShowChart fontSize="large" color="primary" />
                    <Typography variant="h4">Stocker</Typography>
                </Stack>

                <Divider sx={{ width: "100%" }} />

                <TextField
                    label="Username"
                    size="small"
                    sx={{ marginTop: 3 }}
                    variant="filled"
                    fullWidth
                />

                <TextField
                    label="Password"
                    size="small"
                    type={"password"}
                    sx={{ marginTop: 3 }}
                    variant="filled"
                    fullWidth
                />
            </CardContent>
            <CardActions>
                <Stack direction={"column"} width={"100%"} spacing={1.5}>
                    <Button size="small" variant="contained" fullWidth>
                        Login
                    </Button>

                    <Divider sx={{ width: "100%" }}>
                        <span>Don't have an account?</span>
                    </Divider>

                    <Button size="small" variant="outlined" fullWidth>
                        Sign Up
                    </Button>
                </Stack>
            </CardActions>
        </Card>
    )
}
