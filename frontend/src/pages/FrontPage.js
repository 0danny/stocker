import { Tab, Stack, Divider, Button } from "@mui/material"
import TabContext from "@mui/lab/TabContext"
import TabList from "@mui/lab/TabList"
import TabPanel from "@mui/lab/TabPanel"
import Modal from "@mui/material/Modal"
import Card from "@mui/material/Card"
import CardContent from "@mui/material/CardContent"
import ShowChart from "@mui/icons-material/ShowChart"
import Typography from "@mui/material/Typography"
import TextField from "@mui/material/TextField"
import CardActions from "@mui/material/CardActions"
import IconButton from "@mui/material/IconButton"
import Backdrop from "@mui/material/Backdrop"
import Fade from "@mui/material/Fade"

import ShowChartIcon from "@mui/icons-material/ShowChart"
import InstagramIcon from "@mui/icons-material/Instagram"
import FacebookIcon from "@mui/icons-material/FacebookOutlined"
import AccountCircleIcon from "@mui/icons-material/AccountCircle"

import { useState } from "react"
import "./FrontPage.css"

import { Home } from "../tabs/front/Home"
import { PlaceHolder } from "../tabs/PlaceHolder"

export const FrontPage = () => {
    const [modalState, setModalState] = useState(false)
    const handleOpen = () => setModalState(true)
    const handleClose = () => setModalState(false)

    const [tab, setTab] = useState("home")

    const handleTabChange = (event, newTab) => {
        setTab(newTab)
    }

    //TODO
    //Fix the tabs when the window size is small.

    return (
        <>
            <TabContext value={tab}>
                <Stack direction="row" width={"100"} spacing={2} alignItems="center" padding={2}>
                    <Stack direction={"row"} className="frontpage-header" spacing={1} flex={1}>
                        <ShowChartIcon fontSize="large" color="primary" />
                        <span>Stocker</span>
                    </Stack>

                    <TabList
                        onChange={handleTabChange}
                        aria-label="main-tab-control"
                        sx={{ flex: 2 }}
                        centered
                    >
                        <Tab value="home" label="Home" />
                        <Tab value="t&c" label="Terms & Conditions" />
                        <Tab value="about" label="About Us" />
                    </TabList>

                    <Stack flex={1}>
                        <IconButton
                            aria-label="front-user-icon"
                            size="large"
                            color="primary"
                            onClick={handleOpen}
                            sx={{ marginLeft: "auto" }}
                        >
                            <AccountCircleIcon fontSize="inherit" />
                        </IconButton>
                    </Stack>
                </Stack>

                <Divider />

                <TabPanel value="home">
                    <Home />
                </TabPanel>

                <TabPanel value="t&c">
                    <PlaceHolder />
                </TabPanel>

                <TabPanel value="about">
                    <PlaceHolder />
                </TabPanel>
            </TabContext>

            <Footer />

            <Modal
                open={modalState}
                onClose={handleClose}
                aria-labelledby="front-auth-modal"
                aria-describedby="front-auth-modal-description"
                slots={{ backdrop: Backdrop }}
                slotProps={{
                    backdrop: {
                        timeout: 200,
                    },
                }}
                closeAfterTransition
            >
                <AuthenticationModal modalState={modalState} />
            </Modal>
        </>
    )
}

const AuthenticationModal = ({ modalState }) => {
    const [username, setUsername] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    const loginClicked = () => {}

    const registerClicked = () => {
        //Do all of the validation on user input before we register.
        /* Validation 
            Username -> Not Blank, 3-13 Characters, Only special characters (., _)
            Email -> Not Blank, Valid Email Address
            Password -> Not Blank, 6-20 Characters.
        */
    }

    const usernameChanged = (event) => {
        setUsername(event.target.value)
    }

    const emailChanged = (event) => {
        setEmail(event.target.value)
    }

    const passwordChanged = (event) => {
        setPassword(event.target.value)
    }

    return (
        <Fade in={modalState}>
            <Card
                sx={{
                    width: 400,
                    borderColor: "primary.main",
                    borderWidth: "1px",
                    borderStyle: "solid",
                    boxShadow: 2,
                    padding: 2,
                    position: "absolute",
                    top: "50%",
                    left: "50%",
                    transform: "translate(-50%, -50%)",
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

                    <TextField
                        label="Username"
                        size="small"
                        sx={{ marginTop: 3 }}
                        variant="filled"
                        value={username}
                        onChange={usernameChanged}
                        fullWidth
                    />

                    <TextField
                        label="Password"
                        size="small"
                        type={"password"}
                        sx={{ marginTop: 3 }}
                        variant="filled"
                        value={password}
                        onChange={passwordChanged}
                        fullWidth
                    />
                </CardContent>
                <CardActions>
                    <Stack direction={"column"} width={"100%"} spacing={1.5}>
                        <Button size="small" variant="contained" onClick={loginClicked} fullWidth>
                            Login
                        </Button>

                        <Divider sx={{ width: "100%" }}>
                            <span>Don't have an account?</span>
                        </Divider>

                        <Button size="small" variant="outlined" onClick={registerClicked} fullWidth>
                            Sign Up
                        </Button>
                    </Stack>
                </CardActions>
            </Card>
        </Fade>
    )
}

const Footer = () => {
    return (
        <>
            <Stack
                width={"100"}
                sx={{ backgroundColor: "#11508E" }}
                color={"white"}
                padding={3}
                justifyContent={"center"}
                alignItems={"center"}
                marginTop={3}
            >
                <Stack direction={"row"} marginBottom={4} spacing={{ xs: 5, md: 15 }}>
                    <Stack direction={"column"} spacing={1} alignItems={"center"}>
                        <ShowChartIcon fontSize="large" color="primary" />
                        <span>Stocker @ 2023</span>
                    </Stack>

                    <Stack direction={"column"} spacing={1}>
                        <span style={{ fontWeight: "bold" }}>Landing</span>
                        <span>Home</span>
                        <span>Products</span>
                    </Stack>

                    <Stack direction={"column"} spacing={1}>
                        <span style={{ fontWeight: "bold" }}>Company</span>
                        <span>Terms & Conditions</span>
                        <span>Privacy Policy</span>
                        <span>About Us</span>
                    </Stack>

                    <Stack direction={"column"} spacing={1}>
                        <span style={{ fontWeight: "bold" }}>Get in touch</span>

                        <Stack direction={"row"} spacing={2}>
                            <InstagramIcon />
                            <FacebookIcon />
                        </Stack>
                    </Stack>
                </Stack>

                <Divider
                    sx={{
                        "&::before, &::after": {
                            borderColor: "white",
                        },
                        width: "100%",
                    }}
                >
                    @ 2023 Stocker, All rights reserved.
                </Divider>
            </Stack>
        </>
    )
}
