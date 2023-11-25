import { Tab, Stack, Box } from "@mui/material"
import TabContext from "@mui/lab/TabContext"
import TabList from "@mui/lab/TabList"
import TabPanel from "@mui/lab/TabPanel"
import ShowChartIcon from "@mui/icons-material/ShowChart"

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
                sx={{ width: "100%" }}
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
        </>
    )
}
