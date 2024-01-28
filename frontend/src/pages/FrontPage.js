import { Tab, Stack, Divider, Button, Alert } from "@mui/material"
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
import KeyboardReturnIcon from "@mui/icons-material/KeyboardReturn"

import { forwardRef, useEffect, useState } from "react"
import "./FrontPage.css"

import { Home } from "../tabs/front/Home"
import { PlaceHolder } from "../tabs/PlaceHolder"
import Log from "../components/Logger"
import { PostRequest, GetRequest } from "../components/Network"

export const FrontPage = () => {
    const [loggedIn, setLoggedIn] = useState(false)
    const [username, setUsername] = useState("Unknown")

    const [modalState, setModalState] = useState(false)
    const handleOpen = () => {
        if (loggedIn) {
            window.location.href = "/app"
            return
        } else {
            setModalState(true)
        }
    }
    const handleClose = () => setModalState(false)

    const [tab, setTab] = useState("home")

    const handleTabChange = (event, newTab) => {
        setTab(newTab)
    }

    useEffect(() => {
        //Make request to user/me to check if the user is logged in.

        GetRequest("user/me").then((jsonResp) => {
            Log(`Received response.`, "FrontPage", jsonResp)

            setLoggedIn(jsonResp.status)

            if (jsonResp.status === true) {
                setUsername(jsonResp.payload.username)
            }
        })
    }, [])

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
                            {loggedIn && (
                                <span style={{ margin: " 0px 5px 5px 0px" }}>{username}</span>
                            )}

                            <AccountCircleIcon fontSize="inherit" />
                        </IconButton>
                    </Stack>
                </Stack>

                <Divider />

                <TabPanel value="home">
                    <Home
                        membershipClicked={() => {
                            setModalState(true)
                        }}
                    />
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

const AuthenticationModal = forwardRef((props, ref) => {
    const [username, setUsername] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    const [signUpMode, setSignUpMode] = useState(false)

    //Alert
    const [alertState, setAlertState] = useState(false)
    const [alertMessage, setAlertMessage] = useState("")

    const loginClicked = async () => {
        //Send the API request.
        if (username == "" || password == "") {
            setAlertState(true)
            setAlertMessage("Please enter a username and password.")
            return
        }

        var jsonResp = await PostRequest("auth/authenticate", {
            username: username,
            password: password,
        })

        Log(`Received response.`, "AuthModal", jsonResp)

        if (jsonResp.status) {
            //Redirect to the dashboard.
            window.location.href = "/app"
        } else {
            //Display the error message to the user.
            setAlertState(true)
            setAlertMessage(jsonResp.message)
        }
    }

    const registerClicked = async () => {
        if (!signUpMode) {
            setSignUpMode(true)
            return
        }

        //Do all of the validation on user input before we register.

        /* Validation 
            Username -> Not Blank, 3-13 Characters, Only special characters (., _)
            Email -> Not Blank, Valid Email Address
            Password -> Not Blank, 6-20 Characters.
        */

        //Username
        if (username.length < 3 || username.length > 13) {
            setAlertState(true)
            setAlertMessage("Username must be between 3-13 characters.")
            return
        }

        if (!username.match(/^[a-zA-Z0-9_.]+$/)) {
            setAlertState(true)
            setAlertMessage("Username can only contain letters, numbers, . and _")
            return
        }

        //Email
        if (!email.includes("@")) {
            setAlertState(true)
            setAlertMessage("Please enter a valid email address.")
            return
        }

        //Password
        if (password.length < 6 || password.length > 20) {
            setAlertState(true)
            setAlertMessage("Password must be between 6-20 characters.")
            return
        }

        //Send the API request.
        var jsonResp = await PostRequest("auth/register", {
            username: username,
            email: email,
            password: password,
        })

        Log(`Received register response.`, "AuthModal", jsonResp)

        if (jsonResp.status) {
            //Redirect to the dashboard.
            window.location.href = "/app"
        } else {
            //Display the error message to the user.
            setAlertState(true)
            setAlertMessage(jsonResp.message)
        }
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

    const backPressed = (event) => {
        setSignUpMode(false)

        //Reset the alert state.
        setAlertState(false)
        setAlertMessage("")
    }

    //Run login or register when enter is clicked
    const enterPressed = (event) => {
        if (event.key === "Enter") {
            if (signUpMode) {
                registerClicked()
            } else {
                loginClicked()
            }
        }
    }

    return (
        <Fade in={props.modalState} ref={ref}>
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
                onKeyDown={enterPressed}
            >
                <CardContent
                    sx={{
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        flexDirection: "column",
                    }}
                >
                    {signUpMode && (
                        <IconButton
                            aria-label="auth-modal-back"
                            size="large"
                            color="primary"
                            onClick={backPressed}
                            sx={{ position: "absolute", top: 10, left: 10 }}
                        >
                            <KeyboardReturnIcon fontSize="inherit" />
                        </IconButton>
                    )}

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

                    {alertState && <Alert severity="error">{alertMessage}</Alert>}

                    <TextField
                        label="Username"
                        size="small"
                        sx={{ marginTop: 3 }}
                        variant="filled"
                        value={username}
                        onChange={usernameChanged}
                        fullWidth
                    />

                    {signUpMode && (
                        <TextField
                            label="Email"
                            size="small"
                            sx={{ marginTop: 3 }}
                            variant="filled"
                            value={email}
                            onChange={emailChanged}
                            type="email"
                            fullWidth
                        />
                    )}

                    <TextField
                        label="Password"
                        size="small"
                        type="password"
                        sx={{ marginTop: 3 }}
                        variant="filled"
                        value={password}
                        onChange={passwordChanged}
                        fullWidth
                    />
                </CardContent>
                <CardActions>
                    <Stack direction={"column"} width={"100%"} spacing={1.5}>
                        {!signUpMode && (
                            <>
                                <Button
                                    size="small"
                                    variant="contained"
                                    onClick={loginClicked}
                                    fullWidth
                                >
                                    Login
                                </Button>

                                <Divider sx={{ width: "100%" }}>
                                    <span>Don't have an account?</span>
                                </Divider>
                            </>
                        )}

                        <Button size="small" variant="outlined" onClick={registerClicked} fullWidth>
                            Sign Up
                        </Button>
                    </Stack>
                </CardActions>
            </Card>
        </Fade>
    )
})

export const Footer = () => {
    return (
        <>
            <Stack
                width={"100"}
                bgcolor={"primary.main"}
                color={"white"}
                padding={3}
                justifyContent={"center"}
                alignItems={"center"}
                marginTop={3}
            >
                <Stack direction={"row"} marginBottom={4} spacing={{ xs: 5, md: 15 }}>
                    <Stack direction={"column"} spacing={1} alignItems={"center"}>
                        <ShowChartIcon fontSize="large" color="inherit" />
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
