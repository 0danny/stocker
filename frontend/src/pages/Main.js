import { useEffect, useState } from "react"

import { Stack, Tab, Button } from "@mui/material"
import TabContext from "@mui/lab/TabContext"
import TabList from "@mui/lab/TabList"
import TabPanel from "@mui/lab/TabPanel"
import Typography from "@mui/material/Typography"
import ShowChart from "@mui/icons-material/ShowChart"
import AppBar from "@mui/material/AppBar"

import { membershipItems } from "../components/Subscriptions"
import { MembershipItem, Memberships } from "../tabs/front/Home"

import HomeIcon from "@mui/icons-material/Home"
import ViewModuleIcon from "@mui/icons-material/ViewModule"
import StorefrontIcon from "@mui/icons-material/Storefront"
import SettingsIcon from "@mui/icons-material/Settings"
import AccountCircleIcon from "@mui/icons-material/AccountCircle"

import Log from "../components/Logger"
import { GetRequest, PostRequest } from "../components/Network"

import "./Main.css"
import { Settings, logoutClicked } from "../tabs/main/Settings"
import { getMemberById } from "../components/Subscriptions"

import BuildingsImage from "../images/main/buildings.jpeg"
import HomeImage from "../images/main/home-icon.png"
import { Footer } from "./FrontPage"

export const Main = () => {
    const [tab, setTab] = useState("home")
    const [subscribed, setSubscribed] = useState(false)
    const [member, setMember] = useState("")

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

            if (jsonResp.payload.authorities && jsonResp.payload.authorities.length > 0) {
                setSubscribed(true)

                setMember(getMemberById(jsonResp.payload.authorities[0].authority).name)
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
                        <Typography fontSize={28}>
                            Stocker {subscribed ? <b>{member}</b> : ""}
                        </Typography>
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

                <TabPanel value="home" sx={{ padding: 0 }}>
                    {subscribed ? <p>Home</p> : <NotSubscribedHome />}
                </TabPanel>

                <TabPanel value="modules">
                    {subscribed ? <p>Modules</p> : <NotSubscribed />}
                </TabPanel>

                <TabPanel value="marketplace">
                    {subscribed ? <p>Marketplace</p> : <NotSubscribed />}
                </TabPanel>

                <TabPanel value="settings">
                    <Settings />
                </TabPanel>
            </TabContext>
        </>
    )
}

const NotSubscribedHome = () => {
    const purchaseClicked = (id) => {
        Log(`Purchase clicked for ${id}.`, "NotSubscribedHome")

        PostRequest("payment/createCheckout", { id: id }).then((jsonResp) => {
            Log(`Received response from purchase.`, "NotSubscribedHome", jsonResp)

            if (jsonResp.status) {
                window.location.href = jsonResp.payload
            }
        })
    }

    return (
        <>
            <Stack
                direction="row"
                height={"450px"}
                width={"100%"}
                sx={{ borderBottomRightRadius: 60, borderBottomLeftRadius: 60 }}
                bgcolor={"primary.dark"}
                position={"relative"}
                justifyContent={"center"}
                alignItems={"center"}
            >
                <Stack
                    direction="row"
                    sx={{ zIndex: 2 }}
                    justifyContent={"center"}
                    alignItems={"center"}
                    width={"100%"}
                    height={"100%"}
                >
                    <Stack
                        direction={"column"}
                        justifyContent={"center"}
                        alignItems={"center"}
                        spacing={1}
                    >
                        <Typography
                            variant="h3"
                            textAlign={"center"}
                            color={"primary.contrastText"}
                        >
                            Welcome to <b>Stocker</b>
                        </Typography>

                        <Typography
                            variant="h6"
                            textAlign={"center"}
                            color={"primary.contrastText"}
                        >
                            <b>Unlock the full potential of your online shopping experience</b> with
                            Stocker memberships!
                            <br />
                            Choose from our range of subscription tiers tailored to suit your
                            tracking needs.
                        </Typography>
                    </Stack>

                    <img src={HomeImage} alt="Home" width={"auto"} height={"70%"}></img>
                </Stack>

                <img
                    src={BuildingsImage}
                    alt="Buildings"
                    width={"100%"}
                    height={"100%"}
                    style={{
                        position: "absolute",
                        objectFit: "cover",
                        zIndex: 1,
                        objectPosition: "center",
                        opacity: 0.5,
                        borderBottomRightRadius: 60,
                        borderBottomLeftRadius: 60,
                    }}
                />
            </Stack>

            <Memberships onClick={purchaseClicked} />

            <Footer />
        </>
    )
}

const NotSubscribed = () => {
    return (
        <>
            <Typography variant="h6" textAlign={"center"}>
                Please return to the <b>Home</b> tab to purchase a subscription.
            </Typography>
        </>
    )
}
