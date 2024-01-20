import { useEffect, useState } from "react"

import { Stack, Tab } from "@mui/material"
import TabContext from "@mui/lab/TabContext"
import TabList from "@mui/lab/TabList"
import TabPanel from "@mui/lab/TabPanel"
import Typography from "@mui/material/Typography"
import ShowChart from "@mui/icons-material/ShowChart"
import AppBar from "@mui/material/AppBar"

import HomeIcon from "@mui/icons-material/Home"
import ViewModuleIcon from "@mui/icons-material/ViewModule"
import StorefrontIcon from "@mui/icons-material/Storefront"
import SettingsIcon from "@mui/icons-material/Settings"
import AccountCircleIcon from "@mui/icons-material/AccountCircle"

import Log from "../components/Logger"
import { GetRequest } from "../components/Network"

import "./Main.css"
import { Settings } from "../tabs/main/Settings"

export const Main = () => {
    const [tab, setTab] = useState("home")
    const [userDetails, setUserDetails] = useState({
        username: "Unknown",
    })

    const handleTabChange = (event, newTab) => {
        setTab(newTab)
    }

    const getUserDetails = async () => {
        //Get user details.
        var jsonResp = await GetRequest("user/me")

        Log(`Received user details.`, "AuthModal", jsonResp)

        if (jsonResp.status) {
            setUserDetails(jsonResp.payload)
        } else {
            //Redirect to home.
            window.location.href = "/"
        }
    }

    useEffect(() => {
        getUserDetails()
    }, [])

    return (
        <>
            <TabContext value={tab}>
                <AppBar position="static" sx={{ flexDirection: "row" }}>
                    <Stack
                        direction="row"
                        width={"100"}
                        spacing={1}
                        justifyContent="center"
                        alignItems="center"
                        marginRight={4}
                        sx={{ paddingLeft: "9px", paddingBottom: "7px" }}
                    >
                        <ShowChart fontSize="large" color="inherit" />
                        <Typography fontSize={28}>Stocker</Typography>
                    </Stack>

                    <TabList
                        onChange={handleTabChange}
                        aria-label="main-tab-control"
                        variant="scrollable"
                        scrollButtons="auto"
                        indicatorColor="secondary"
                        textColor="inherit"
                    >
                        <Tab value="home" icon={<HomeIcon />} iconPosition="start" label="Home" />

                        <Tab
                            value="modules"
                            icon={<ViewModuleIcon />}
                            iconPosition="start"
                            label="Modules"
                        />

                        <Tab
                            value="marketplace"
                            icon={<StorefrontIcon />}
                            iconPosition="start"
                            label="Marketplace"
                        />

                        <Tab
                            value="settings"
                            icon={<SettingsIcon />}
                            iconPosition="start"
                            label="Settings"
                        />
                    </TabList>

                    <Stack
                        direction="row"
                        justifyContent="center"
                        alignItems="center"
                        marginLeft="auto"
                        padding={2}
                    >
                        <Typography fontSize={20} marginRight={1} marginBottom={0.5}>
                            {userDetails.username}
                        </Typography>
                        <AccountCircleIcon fontSize="large" color="inherit" />
                    </Stack>
                </AppBar>

                <TabPanel value="home">
                    <p>Home</p>
                </TabPanel>

                <TabPanel value="modules">
                    <p>Modules</p>
                </TabPanel>

                <TabPanel value="marketplace">
                    <p>Marketplace</p>
                </TabPanel>

                <TabPanel value="settings" sx={{ display: "flex", justifyContent: "center" }}>
                    <Settings />
                </TabPanel>
            </TabContext>
        </>
    )
}
