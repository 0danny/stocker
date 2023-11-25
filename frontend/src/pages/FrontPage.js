import { Tab, Stack, Box, Paper, Divider, Button } from "@mui/material"
import TabContext from "@mui/lab/TabContext"
import TabList from "@mui/lab/TabList"
import TabPanel from "@mui/lab/TabPanel"

import ShowChartIcon from "@mui/icons-material/ShowChart"
import InstagramIcon from "@mui/icons-material/Instagram"
import FacebookIcon from "@mui/icons-material/FacebookOutlined"

import { useState } from "react"
import "./FrontPage.css"

import { Home } from "../tabs/front/Home"
import { PlaceHolder } from "../tabs/PlaceHolder"

export const FrontPage = () => {
    const [value, setValue] = useState("home")

    const handleChange = (event, newValue) => {
        setValue(newValue)
    }

    return (
        <>
            <Stack
                direction="row"
                width={"100"}
                spacing={2}
                justifyContent="center"
                alignItems="center"
                padding={2}
                className="frontpage-header"
            >
                <ShowChartIcon fontSize="large" color="primary" />
                <span>Stocker</span>
            </Stack>

            <Box sx={{ width: "100%", typography: "body1" }}>
                <TabContext value={value}>
                    <Box
                        sx={{
                            borderBottom: 1,
                            borderColor: "divider",
                            marginLeft: 3,
                            marginRight: 3,
                        }}
                    >
                        <TabList onChange={handleChange} aria-label="Main tab control" centered>
                            <Tab value="home" label="Home" />
                            <Tab value="t&c" label="Terms & Conditions" />
                            <Tab value="about" label="About Us" />
                        </TabList>
                    </Box>

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
            </Box>

            <Footer />
        </>
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
            >
                <Stack direction={"row"} marginBottom={4} spacing={15}>
                    <Stack direction={"column"} spacing={1} alignItems={"center"}>
                        <ShowChartIcon fontSize="large" color="primary" />
                        <span>Stocker Pty Ltd</span>
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
