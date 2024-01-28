import { Stack, Typography, Card, CardActions, CardContent, Button } from "@mui/material"
import ShowChart from "@mui/icons-material/ShowChart"
import ErrorIcon from "@mui/icons-material/Error"

export const Cancel = () => {
    const homeClicked = () => {
        //Return to home page "/"
        window.location.href = "/"
    }

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
                            Sorry, your payment was cancelled and could not be completed.
                            <br />
                            Please return home to <b>try again.</b>
                        </Typography>

                        <Stack
                            direction="row"
                            color={"red"}
                            justifyContent={"center"}
                            alignItems={"center"}
                            marginTop={2}
                        >
                            <ErrorIcon />
                            <Typography variant="h6" textAlign={"center"}>
                                Error
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
