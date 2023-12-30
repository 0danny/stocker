import { useEffect, useState } from "react"

import { Stack, Tab } from "@mui/material"
import TabContext from "@mui/lab/TabContext"
import TabList from "@mui/lab/TabList"
import TabPanel from "@mui/lab/TabPanel"
import Typography from "@mui/material/Typography"
import ShowChart from "@mui/icons-material/ShowChart"

import HomeIcon from "@mui/icons-material/Home"
import ViewModuleIcon from "@mui/icons-material/ViewModule"
import StorefrontIcon from "@mui/icons-material/Storefront"
import SettingsIcon from "@mui/icons-material/Settings"
import AccountCircleIcon from "@mui/icons-material/AccountCircle"

import Log from "../components/Logger"
import { setAuthToken } from "../components/JWT"
import { GetRequest } from "../components/Network"

import "./Main.css"

export const Main = () => {
    const [username, setUsername] = useState("Unknown")
    const [tab, setTab] = useState("home")
    const [userDetails, setUserDetails] = useState({})

    const handleTabChange = (event, newTab) => {
        setTab(newTab)
    }

    const getUserDetails = async () => {
        //Get user details.
        var jsonResp = await GetRequest("user/me", true)

        Log(`Received user details.`, "AuthModal", jsonResp)

        if (jsonResp.status) {
            setUserDetails(jsonResp.payload)
            setUsername(jsonResp.payload.username)
        }
    }

    useEffect(() => {
        //Check if the token is set in local storage.
        var jwtToken = localStorage.getItem("token")

        if (jwtToken == "undefined" || jwtToken == null) {
            Log(`No token found in local storage.`, "Main")

            window.location.href = "/"
        } else {
            setAuthToken(jwtToken)

            Log(`Current token is:`, "Main", jwtToken)
        }

        getUserDetails()
    }, [])

    return (
        <>
            <TabContext value={tab}>
                <Stack direction="row" height="100%" width="100%">
                    <TabList
                        onChange={handleTabChange}
                        aria-label="main-tab-control"
                        orientation="vertical"
                        variant="scrollable"
                        sx={{ borderRight: 1, borderColor: "divider" }}
                    >
                        <Stack
                            direction="row"
                            width={"100"}
                            spacing={1}
                            justifyContent="center"
                            alignItems="center"
                            padding={3}
                        >
                            <ShowChart fontSize="large" color="primary" />
                            <Typography fontSize={28}>Stocker</Typography>
                        </Stack>

                        <Tab
                            value="home"
                            icon={<HomeIcon />}
                            iconPosition="start"
                            label="Home"
                            style={{ minHeight: "55px" }}
                        />

                        <Tab
                            value="modules"
                            icon={<ViewModuleIcon />}
                            iconPosition="start"
                            label="Modules"
                            style={{ minHeight: "55px" }}
                        />

                        <Tab
                            value="marketplace"
                            icon={<StorefrontIcon />}
                            iconPosition="start"
                            label="Marketplace"
                            style={{ minHeight: "55px" }}
                        />

                        <Tab
                            value="settings"
                            icon={<SettingsIcon />}
                            iconPosition="start"
                            label="Settings"
                            style={{ minHeight: "55px" }}
                        />
                    </TabList>

                    <TabPanel value="home">
                        <p>Home</p>
                    </TabPanel>

                    <TabPanel value="modules">
                        <p>Modules</p>
                    </TabPanel>

                    <TabPanel value="marketplace">
                        <p>Marketplace</p>
                    </TabPanel>

                    <TabPanel value="settings">
                        <p>Settings</p>
                    </TabPanel>

                    <Stack
                        direction="row"
                        className="main-user-icon"
                        justifyContent="center"
                        alignItems="center"
                    >
                        <Typography fontSize={18} marginRight={1} marginBottom={0.5}>
                            {username}
                        </Typography>
                        <AccountCircleIcon fontSize="large" color="primary" />
                    </Stack>
                </Stack>
            </TabContext>
        </>
    )
}
