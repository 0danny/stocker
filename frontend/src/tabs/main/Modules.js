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
    Grid,
    Box,
} from "@mui/material"
import { useState, forwardRef, useRef } from "react"
import Log from "../../components/Logger"

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
                    return <ModuleItem module={module} />
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

    const createModule = () => {
        const newModule = {
            moduleName: moduleName,
            description: description,
            trackingUrl: trackingUrl,
            checkingToken: checkingToken,
        }

        props.onAddModule(newModule)

        props.onClose()
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
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            fullWidth
                        />

                        <TextField
                            label="Tracking URL"
                            placeholder="Tracking URL..."
                            variant="outlined"
                            size="small"
                            value={trackingUrl}
                            onChange={(e) => setTrackingUrl(e.target.value)}
                            fullWidth
                        />

                        <TextField
                            label="Checking Token"
                            placeholder="Checking Token..."
                            variant="outlined"
                            size="small"
                            value={checkingToken}
                            onChange={(e) => setCheckingToken(e.target.value)}
                            fullWidth
                        />
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
    const { moduleName, description, trackingUrl, checkingToken } = module

    return (
        <Stack
            direction={"column"}
            padding={2}
            borderColor={"primary.main"}
            borderRadius={3}
            boxShadow={5}
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
