import {
    Button,
    Paper,
    Stack,
    Modal,
    Backdrop,
    Fade,
    Card,
    CardContent,
    CardActions,
    Typography,
    TextField,
    Box,
    Divider,
    Radio,
    RadioGroup,
    FormControlLabel,
    FormControl,
    FormLabel,
} from "@mui/material"
import { useState, forwardRef, useRef } from "react"
import Log from "../../components/Logger"
import { getFrequencies } from "../../components/Subscriptions"
import { useTheme } from "@emotion/react"

const modalStyle = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    bgcolor: "background.paper",
    border: "2px solid",
    width: "400px",
    borderColor: "primary.main",
    boxShadow: 24,
    p: 2,
}

export const Modules = ({ handleAddModule, modules }) => {
    const [creationModalState, setCreationModalState] = useState(false)
    const handleCreationClose = () => setCreationModalState(false)
    const handleCreationOpen = () => setCreationModalState(true)

    const [selectedModule, setSelectedModule] = useState("")

    return (
        <>
            <Paper sx={{ width: "100%", padding: 2 }} elevation={3}>
                <Button variant="contained" onClick={handleCreationOpen}>
                    Add Module
                </Button>
            </Paper>

            <Box
                width={"100%"}
                sx={{
                    display: "grid",
                    gridTemplateColumns: "repeat(auto-fit, minmax(400px, 1fr))",
                    gridGap: "15px",
                }}
                padding={1}
            >
                {modules.map((module, key) => {
                    return <ModuleItem key={key} module={module} />
                })}
            </Box>

            <Modal
                open={creationModalState}
                onClose={handleCreationClose}
                aria-labelledby="main-modulecreation-modal"
                aria-describedby="main-modulecreation-description"
                slots={{ backdrop: Backdrop }}
                slotProps={{
                    backdrop: {
                        timeout: 200,
                    },
                }}
                closeAfterTransition
            >
                <CreationModal
                    creationModalState={creationModalState}
                    onClose={handleCreationClose}
                    onAddModule={handleAddModule}
                />
            </Modal>
        </>
    )
}

const CreationModal = forwardRef((props, ref) => {
    const [moduleName, setModuleName] = useState("")
    const [description, setDescription] = useState("")
    const [trackingUrl, setTrackingUrl] = useState("")
    const [checkingToken, setCheckingToken] = useState("")
    const [frequency, setFrequency] = useState("daily")

    const createModule = () => {
        const newModule = {
            moduleName: moduleName,
            description: description,
            trackingUrl: trackingUrl,
            checkingToken: checkingToken,
            frequency: frequency,
            iconUrl: "",
        }

        newModule.iconUrl = parseURL(trackingUrl)

        props.onAddModule(newModule)

        props.onClose()
    }

    const parseURL = (trackingUrl) => {
        //Parse the URL and get the domain name
        const url = new URL(trackingUrl)

        const domain = url.protocol + "//" + url.hostname

        return `${domain}/favicon.ico`
    }

    return (
        <Fade in={props.creationModalState} ref={ref}>
            <Card sx={modalStyle}>
                <CardContent>
                    <Typography variant="h5" component="div">
                        Create Module
                    </Typography>

                    <Typography variant="body1" marginTop={1}>
                        Create a new module to track.
                    </Typography>

                    <Stack direction="column" spacing={2} marginTop={2}>
                        <TextField
                            label="Module Name"
                            placeholder="Module Name..."
                            variant="outlined"
                            size="small"
                            autoComplete="off"
                            value={moduleName}
                            onChange={(e) => setModuleName(e.target.value)}
                            fullWidth
                        />

                        <TextField
                            label="Description"
                            placeholder="Description..."
                            variant="outlined"
                            size="small"
                            multiline
                            rows={4}
                            autoComplete="off"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            fullWidth
                        />

                        <TextField
                            label="Tracking URL"
                            placeholder="Tracking URL..."
                            variant="outlined"
                            size="small"
                            autoComplete="off"
                            value={trackingUrl}
                            onChange={(e) => setTrackingUrl(e.target.value)}
                            fullWidth
                        />

                        <TextField
                            label="Checking Token"
                            placeholder="Checking Token..."
                            variant="outlined"
                            size="small"
                            autoComplete="off"
                            value={checkingToken}
                            onChange={(e) => setCheckingToken(e.target.value)}
                            fullWidth
                        />

                        <Divider />

                        <FormControl>
                            <FormLabel id="modules-frequency-label">Frequency</FormLabel>
                            <RadioGroup
                                row
                                aria-labelledby="modules-frequency-label"
                                name="modules-frequency-group"
                                defaultValue={"daily"}
                                value={frequency}
                                onChange={(e) => setFrequency(e.target.value)}
                            >
                                {getFrequencies()}
                            </RadioGroup>
                        </FormControl>
                    </Stack>
                </CardContent>
                <CardActions>
                    <Button size="medium" fullWidth variant="contained" onClick={createModule}>
                        Create Module
                    </Button>
                </CardActions>
            </Card>
        </Fade>
    )
})

const ModuleItem = ({ module }) => {
    const { moduleName, description, trackingUrl, checkingToken, frequency, iconUrl } = module

    return (
        <Stack
            direction={"column"}
            padding={2}
            borderColor={"primary.main"}
            borderRadius={3}
            boxShadow={5}
            sx={{
                border: "1px solid transparent",
                transition: "border-color 0.3s ease",
                "&:hover": {
                    borderColor: "primary.main",
                    cursor: "pointer",
                },
            }}
        >
            <Typography variant="h5" component="div">
                {moduleName}
            </Typography>
            <Typography variant="body1" color="text.secondary" gutterBottom>
                {description}
            </Typography>
            <Typography variant="body2" color="text.secondary" gutterBottom>
                Tracking URL: {trackingUrl}
            </Typography>
            <Typography variant="body2" color="text.secondary" gutterBottom>
                Checking Token: {checkingToken}
            </Typography>
            <Typography variant="body2" color="text.secondary" gutterBottom>
                Frequency: {frequency}
            </Typography>

            <Stack direction={"row"} justifyContent={"center"}>
                <Button size="small" color="primary">
                    Edit
                </Button>
                <Button size="small" color="secondary">
                    Delete
                </Button>
            </Stack>
        </Stack>
    )
}

export default ModuleItem
