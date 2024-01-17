import { Stack, Typography, Box, Card, CardActions, CardContent, Button } from "@mui/material"
import ShowChart from "@mui/icons-material/ShowChart"

export const NotFound = () => {
    const homeClicked = () => {
        //Return to home page "/"
        window.location.href = "/"
    }

    return (
        <Stack direction={"column"} justifyContent={"center"} alignItems={"center"} height={"100%"}>
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
                        Sorry, the page you are looking for does not exist. <br /> Please check the
                        URL or return home using the button below.
                    </Typography>
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
    )
}
