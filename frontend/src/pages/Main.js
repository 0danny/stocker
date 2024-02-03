import { useEffect, useState } from "react"

import { Stack, Tab, Button, Box, Tabs, LinearProgress } from "@mui/material"
import TabContext from "@mui/lab/TabContext"
import Typography from "@mui/material/Typography"
import ShowChart from "@mui/icons-material/ShowChart"
import AppBar from "@mui/material/AppBar"

import PropTypes from "prop-types"

import HomeIcon from "@mui/icons-material/Home"
import ViewModuleIcon from "@mui/icons-material/ViewModule"
import StorefrontIcon from "@mui/icons-material/Storefront"
import SettingsIcon from "@mui/icons-material/Settings"
import AccountCircleIcon from "@mui/icons-material/AccountCircle"

import Log from "../components/Logger"
import { GetRequest } from "../components/Network"

import "./Main.css"
import { Settings, logoutClicked } from "../tabs/main/Settings"
import { getMemberById, membershipId, setMembershipId } from "../components/Subscriptions"
import { Home } from "../tabs/main/Home"
import { Modules } from "../tabs/main/Modules"

function TabPanel(props) {
    const { children, value, index, usePadding = true, isLoading, ...other } = props

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`main-tabpanel-${index}`}
            aria-labelledby={`main-tab-${index}`}
            {...other}
        >
            {value === index && (
                <Box sx={{ p: usePadding ? 3 : 0 }}>
                    {isLoading ? <LinearProgress /> : children}
                </Box>
            )}
        </div>
    )
}

TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.number.isRequired,
    value: PropTypes.number.isRequired,
}

export const Main = () => {
    const [tab, setTab] = useState(0)
    const [subscribed, setSubscribed] = useState(0) //0 -> Not Set, 1 -> Subscribed, 2 - Not Subscribed
    const [member, setMember] = useState("")

    const [modules, setModules] = useState([])

    const handleAddModule = (newModule) => {
        setModules([...modules, newModule])

        Log(`Added module ${newModule.moduleName}.`, "Main", newModule)
    }

    const [userDetails, setUserDetails] = useState({
        username: "Unknown",
        authorities: [],
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

            setSubscribed(2)

            if (jsonResp.payload.authorities && jsonResp.payload.authorities.length > 0) {
                setSubscribed(1)

                setMember(getMemberById(jsonResp.payload.authorities[0].authority).name)

                setMembershipId(jsonResp.payload.authorities[0].authority)
            }
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
            <AppBar
                position="static"
                sx={{ flexDirection: "row" }}
                color="primary"
                enableColorOnDark
            >
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

                    <Stack direction={"column"}>
                        <Typography fontSize={28}>Stocker</Typography>
                    </Stack>
                </Stack>

                <Tabs
                    value={tab}
                    onChange={handleTabChange}
                    aria-label="main-tab-control"
                    variant="scrollable"
                    scrollButtons="auto"
                    indicatorColor="secondary"
                    textColor="inherit"
                >
                    <Tab value={0} icon={<HomeIcon />} iconPosition="start" label="Home" />

                    <Tab
                        value={1}
                        icon={<ViewModuleIcon />}
                        iconPosition="start"
                        label="Modules"
                        disabled={subscribed == 2}
                    />

                    <Tab
                        value={2}
                        icon={<StorefrontIcon />}
                        iconPosition="start"
                        label="Marketplace"
                        disabled={subscribed == 2}
                    />
                    <Tab value={3} icon={<SettingsIcon />} iconPosition="start" label="Settings" />
                </Tabs>

                <Stack
                    direction="row"
                    justifyContent="center"
                    alignItems="center"
                    marginLeft="auto"
                    padding={2}
                >
                    <Typography fontSize={20} color="inherit" marginBottom={0.5} marginRight={2}>
                        {subscribed == 1 ? <b>{member}</b> : ""}
                    </Typography>
                    <Typography fontSize={20} marginRight={1} marginBottom={0.5}>
                        {userDetails.username}
                    </Typography>
                    <AccountCircleIcon fontSize="large" color="inherit" />
                    <Button
                        size="filled"
                        variant="outlined"
                        color="inherit"
                        sx={{ marginLeft: 2 }}
                        onClick={logoutClicked}
                    >
                        Logout
                    </Button>
                </Stack>
            </AppBar>

            <TabPanel value={tab} index={0} usePadding={false} isLoading={subscribed == 0}>
                <Home subscribed={subscribed == 1} />
            </TabPanel>

            <TabPanel value={tab} index={1} usePadding={false} isLoading={subscribed == 0}>
                <Modules
                    modules={modules}
                    handleAddModule={handleAddModule}
                    setModules={setModules}
                />
            </TabPanel>

            <TabPanel value={tab} index={2} isLoading={subscribed == 0}>
                <p>Marketplace</p>
            </TabPanel>

            <TabPanel value={tab} index={3} isLoading={subscribed == 0}>
                <Settings />
            </TabPanel>
        </>
    )
}
