import { Typography, Divider, Stack, TextField, Button, Alert } from "@mui/material"
import { useState } from "react"
import { GetRequest } from "../../components/Network"

import SettingsIcon from "@mui/icons-material/Settings"
import Log from "../../components/Logger"

export const Settings = () => {
    return (
        <Stack direction="column">
            <Typography variant="h4" textAlign={"center"} marginBottom={3}>
                <SettingsIcon fontSize="large" sx={{ paddingTop: "10px", marginRight: "5px" }} />
                Settings
            </Typography>

            <Divider>Account Settings</Divider>

            <AccountSettings />

            <Divider>Subscription Settings</Divider>

            <SubscriptionSettings />

            <Divider sx={{ margin: "20px" }}>Account Actions</Divider>

            <AccountActions />
        </Stack>
    )
}

const AccountSettings = () => {
    const [password, setPassword] = useState("")
    const [confirmPassword, setConfirmPassword] = useState("")

    const passwordChanged = (event) => {
        setPassword(event.target.value)
    }

    const confirmPasswordChanged = (event) => {
        setConfirmPassword(event.target.value)
    }

    const savePasswordChanges = () => {
        //TODO: IMPLEMENT
    }

    return (
        <>
            <SettingsInputWrapper>
                <Typography variant="body1">Change Password </Typography>

                <TextField
                    label="New password..."
                    size="small"
                    variant="outlined"
                    value={password}
                    onChange={passwordChanged}
                />
            </SettingsInputWrapper>

            <SettingsInputWrapper>
                <Typography variant="body1">Confirm Password </Typography>

                <TextField
                    label="Confirm password..."
                    size="small"
                    variant="outlined"
                    value={confirmPassword}
                    onChange={confirmPasswordChanged}
                />

                <Button variant="contained" onClick={savePasswordChanges}>
                    Save Changes
                </Button>
            </SettingsInputWrapper>
        </>
    )
}

const SubscriptionSettings = () => {
    const modifySubscriptionClick = () => {
        //Make GET request to billing portal and re-direct. (payment/createPortal)

        GetRequest("payment/createPortal").then((jsonResp) => {
            Log(`Received billing portal URL.`, "Settings", jsonResp)

            if (jsonResp.status) {
                window.location.href = jsonResp.payload
            }
        })
    }

    return (
        <>
            <SettingsInputWrapper>
                <Typography variant="body1">Change/Modify Subscription </Typography>

                <Button variant="contained" onClick={modifySubscriptionClick}>
                    Modify Subscription
                </Button>
            </SettingsInputWrapper>

            <Alert variant="outlined" severity="info">
                The button above will redirect you to the <b>Stripe</b> portal where you can modify
                your subscription.
            </Alert>
        </>
    )
}

const AccountActions = () => {
    return (
        <>
            <Button variant="contained" onClick={logoutClicked}>
                Logout
            </Button>
        </>
    )
}

const SettingsInputWrapper = ({ children }) => {
    return (
        <Stack direction="row" alignItems="center" spacing={2} margin={3}>
            {children}
        </Stack>
    )
}

export const logoutClicked = () => {
    //Make GET request to logout.
    GetRequest("auth/logout").then((jsonResp) => {
        Log(`Received logout response.`, "Settings", jsonResp)

        if (jsonResp.status) {
            window.location.href = "/"
        }
    })
}
