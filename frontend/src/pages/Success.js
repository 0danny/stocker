import { Stack, Typography, Box, Card, CardActions, CardContent, Button } from "@mui/material"
import ShowChart from "@mui/icons-material/ShowChart"
import MartialArts from "@mui/icons-material/SportsMartialArts"
import { useEffect } from "react"
import { GetRequest } from "../components/Network"
import Log from "../components/Logger"

export const Success = () => {
    const homeClicked = () => {
        //Return to home page "/"
        window.location.href = "/"
    }

    useEffect(() => {
        //Make request to log the current user out, to get new token.
        GetRequest("auth/logout").then((jsonResp) => {
            Log(`Received response from logout request.`, "SuccessPage", jsonResp)
        })
    }, [])

    return (
        <>
            <Stack
                direction={"column"}
                justifyContent={"center"}
                alignItems={"center"}
                height={"100%"}
            >
                <Card sx={{ minWidth: 275 }} variant="outlined">
                    <CardContent>
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

                        <Typography variant="body1" marginTop={2} textAlign={"center"}>
                            Thank you for subscribing to Stocker, we really appreciate your support.
                            <br />
                            Please return home and login to continue with <b>Stocker Premium.</b>
                        </Typography>

                        <Stack
                            direction="row"
                            color={"darkgreen"}
                            justifyContent={"center"}
                            alignItems={"center"}
                            marginTop={2}
                        >
                            <MartialArts />
                            <Typography variant="h6" textAlign={"center"}>
                                Success
                            </Typography>
                        </Stack>
                    </CardContent>
                    <CardActions>
                        <Button
                            size="small"
                            variant="outlined"
                            sx={{ width: "100%" }}
                            onClick={homeClicked}
                        >
                            Go Home
                        </Button>
                    </CardActions>
                </Card>
            </Stack>
        </>
    )
}
