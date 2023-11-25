import { Stack, Button, Divider, List, ListItem } from "@mui/material"
import ListItemText from "@mui/material/ListItemText"
import ListItemAvatar from "@mui/material/ListItemAvatar"
import Avatar from "@mui/material/Avatar"
import Card from "@mui/material/Card"
import CardActions from "@mui/material/CardActions"
import CardContent from "@mui/material/CardContent"
import Typography from "@mui/material/Typography"

import PlayCircle from "@mui/icons-material/PlayCircleFilledWhiteOutlined"
import Article from "@mui/icons-material/ArticleOutlined"
import ErrorIcon from "@mui/icons-material/Error"

import Filter3Icon from "@mui/icons-material/Filter3"
import Filter2Icon from "@mui/icons-material/Filter2"
import Filter1Icon from "@mui/icons-material/Filter1"
import ListIcon from "@mui/icons-material/List"

import "./Home.css"
import membersUnderlay from "../../images/front/members-underlay.jpg"

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

            <Stack direction={"row"} color={"gray"} marginTop={3} spacing={1}>
                <ErrorIcon />
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

const MembershipItem = ({ planName, price, description, features, icon }) => {
    return (
        <Card sx={{ width: "100%", display: "flex", flexDirection: "column" }}>
            <CardContent>
                <Typography variant="h5" textAlign={"center"}>
                    {icon} <b>{planName}</b> {price}
                </Typography>

                <Divider sx={{ margin: 2 }} />

                <Typography variant="body2" textAlign={"center"}>
                    {description}
                </Typography>

                <List>
                    {features.map(function (feature) {
                        return (
                            <ListItem>
                                <ListItemAvatar>
                                    <Avatar>
                                        <ListIcon />
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
                <h1 style={{ fontWeight: "300" }}>Memberships</h1>

                <Stack
                    direction={{ xs: "column", md: "row" }}
                    spacing={2}
                    marginTop={3}
                    justifyContent={"start"}
                    alignItems={"baseline"}
                    width={"100%"}
                    padding={5}
                    sx={{
                        "@media (max-width: 850px)": {
                            flexDirection: "column",
                        },
                    }}
                >
                    <MembershipItem
                        planName="Basic"
                        price="$10"
                        description="Tailored for casual shoppers, this plan offers stock checks on up to 5 websites every hour, perfect for keeping an eye on a variety of items. Users receive timely email notifications, making it a cost-effective choice for essential item monitoring."
                        features={[
                            "Stock checks on up to 5 websites.",
                            "Check frequency: Every hour.",
                            "Email notifications for stock updates.",
                        ]}
                        icon={<Filter3Icon color="primary" />}
                    />

                    <MembershipItem
                        planName="Deluxe"
                        price="$20"
                        description="Designed for avid shoppers and small businesses, this tier includes stock monitoring on up to 15 websites with updates every 30 minutes. It adds the convenience of both email and SMS alerts and prioritized customer support for a seamless tracking experience."
                        features={[
                            "Stock checks on up to 15 websites.",
                            "Check frequency: Every 30 minutes.",
                            "Email and SMS notifications for stock updates.",
                            "Priority customer support.",
                        ]}
                        icon={<Filter2Icon color="secondary" />}
                    />

                    <MembershipItem
                        planName="Premium"
                        price="$30"
                        description="The ultimate solution for serious shoppers and businesses, offering extensive stock checks on up to 30 websites with options for 15-minute intervals or on-demand updates. This plan encompasses all notification types and enriches user experience with API access, dedicated support, ensuring you're always first to know about restocks of high-demand items like the PS5/Shoe Drops etc."
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
