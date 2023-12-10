import { Stack, Button, Divider, List, ListItem } from "@mui/material"
import ListItemText from "@mui/material/ListItemText"
import ListItemAvatar from "@mui/material/ListItemAvatar"
import Avatar from "@mui/material/Avatar"
import Card from "@mui/material/Card"
import CardActions from "@mui/material/CardActions"
import CardContent from "@mui/material/CardContent"
import Typography from "@mui/material/Typography"
import { useTheme } from "@mui/material/styles"

import PlayCircle from "@mui/icons-material/PlayCircleFilledWhiteOutlined"
import Article from "@mui/icons-material/ArticleOutlined"
import ErrorIcon from "@mui/icons-material/Error"

import Filter3Icon from "@mui/icons-material/Filter3"
import Filter2Icon from "@mui/icons-material/Filter2"
import Filter1Icon from "@mui/icons-material/Filter1"
import DoneIcon from "@mui/icons-material/Done"

import { useState } from "react"

import "./Home.css"
import membersUnderlay from "../../images/front/bg.jpeg"

export const Home = () => {
    return (
        <Stack
            direction={"column"}
            justifyContent={"center"}
            alignItems={"center"}
            sx={{ width: "100%" }}
        >
            <span className="front-home-largetext">Modern stock checker.</span>
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

            <Stack direction={"row"} color={"gray"} marginTop={3}>
                <ErrorIcon sx={{ marginRight: 1, paddingBottom: "4px" }} />
                <span style={{ textAlign: "center" }}>
                    Get up and running in minutes with our easy to use library of components or see
                    the query builder for a more customizable experience.
                </span>
            </Stack>

            <Memberships />

            <Features />
        </Stack>
    )
}

const Features = () => {
    return (
        <>
            <h1 style={{ fontWeight: "300" }}>Features</h1>
        </>
    )
}

const MembershipItem = ({ name, price, features, icon }) => {
    return (
        <Card sx={{ width: "380px", display: "flex", flexDirection: "column" }}>
            <CardContent>
                <Typography variant="h5" textAlign={"center"}>
                    {icon} <b>{name}</b> {price}
                </Typography>

                <Typography variant="h6" textAlign={"center"}>
                    Monthly
                </Typography>

                <Divider sx={{ margin: 2 }} />

                <List>
                    {features.map(function (feature, key) {
                        return (
                            <ListItem key={key}>
                                <ListItemAvatar>
                                    <Avatar>
                                        <DoneIcon color="primary" />
                                    </Avatar>
                                </ListItemAvatar>
                                <ListItemText secondary={feature} />
                            </ListItem>
                        )
                    })}
                </List>
            </CardContent>

            <CardActions disableSpacing sx={{ mt: "auto" }}>
                <Button size="small" variant="contained" fullWidth sx={{ marginTop: "auto" }}>
                    Learn More
                </Button>
            </CardActions>
        </Card>
    )
}

const Memberships = () => {
    const theme = useTheme()

    const primaryColor = theme.palette.primary.main

    return (
        <>
            <Stack
                direction={"column"}
                sx={{
                    background: `url(${membersUnderlay})`,
                    backgroundPosition: "center",
                    backgroundSize: "cover",
                }}
                width={"100%"}
                marginTop={12}
                marginBottom={12}
                borderRadius={4}
                alignItems={"center"}
                padding={3}
            >
                <Typography variant="h3" textAlign={"center"} fontWeight={"bold"}>
                    Choose A{" "}
                    <span style={{ color: primaryColor, fontStyle: "italic" }}>Membership</span>
                </Typography>

                <Typography variant="h6" textAlign={"center"}>
                    Pick a membership below that suits your{" "}
                    <span style={{ color: primaryColor, fontStyle: "italic" }}>needs.</span>
                </Typography>

                <Stack
                    direction={{ xs: "column", md: "row" }}
                    spacing={2}
                    marginTop={3}
                    justifyContent={"center"}
                    alignItems={{ xs: "center", md: "baseline" }}
                    width={"100%"}
                    padding={5}
                >
                    <MembershipItem
                        name="Basic"
                        price="$5"
                        features={[
                            "Stock checks on up to 5 websites.",
                            "Check frequency: Every hour.",
                            "Email notifications for stock updates.",
                        ]}
                        icon={<Filter3Icon color="primary" />}
                    />

                    <MembershipItem
                        name="Deluxe"
                        price="$10"
                        features={[
                            "Stock checks on up to 15 websites.",
                            "Check frequency: Every 30 minutes.",
                            "Email and SMS notifications for stock updates.",
                            "Priority customer support.",
                        ]}
                        icon={<Filter2Icon color="secondary" />}
                    />

                    <MembershipItem
                        name="Premium"
                        price="$20"
                        features={[
                            "Stock checks on up to 30 websites.",
                            "Check frequency: Every 15 minutes or on-demand.",
                            "Email, SMS, and mobile app notifications for stock updates.",
                            "API access for integration with other tools and platforms.",
                            "Dedicated account manager and 24/7 customer support.",
                        ]}
                        icon={<Filter1Icon color="success" />}
                    />
                </Stack>
            </Stack>
        </>
    )
}
