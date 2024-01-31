import BuildingsImage from "../../images/main/buildings3.jpg"
import HomeImage from "../../images/main/home-icon.png"

import { Memberships } from "../front/Home"
import { PostRequest } from "../../components/Network"

import { Footer } from "../../pages/FrontPage"

import Log from "../../components/Logger"

import { Stack, Typography } from "@mui/material"

export const Home = ({ subscribed }) => {
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
            <HomeBanner>
                <b>Unlock the full potential of your online shopping experience</b> with Stocker
                memberships!
                <br />
                Choose from our range of subscription tiers tailored to suit your tracking needs.
            </HomeBanner>

            {subscribed ? <p>Is Subbed!</p> : <Memberships onClick={purchaseClicked} />}

            <Footer />
        </>
    )
}

const HomeBanner = ({ children }) => {
    return (
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
                    <Typography variant="h3" textAlign={"center"} color={"primary.contrastText"}>
                        Welcome to <b>Stocker</b>
                    </Typography>

                    <Typography variant="h6" textAlign={"center"} color={"primary.contrastText"}>
                        {children}
                    </Typography>
                </Stack>

                <img src={HomeImage} alt="Home" width={"auto"} height={"70%"} loading="lazy"></img>
            </Stack>

            <img
                src={BuildingsImage}
                alt="Buildings"
                width={"100%"}
                height={"100%"}
                loading="lazy"
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
    )
}
