import { CoringaIntegrationData, ITicket } from "@/interfaces/ticket";
import AppBar from "@mui/material/AppBar";
import Dialog from "@mui/material/Dialog";
import IconButton from "@mui/material/IconButton";
import Slide from "@mui/material/Slide";
import { useTheme } from "@mui/material/styles";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import useMediaQuery from "@mui/material/useMediaQuery";
import React from "react";
import { TicketSetSection } from "../ticket/TicketSetSection";

const Transition = React.forwardRef(function Transition(
        props: React.ComponentProps<typeof Slide>,
        ref
) {
        return <Slide direction="up" ref={ref} {...props} />;
});

export default function FullScreenModal({
        ticketTypes,
        integrationData,
}: {
        ticketTypes: ITicket[];
        integrationData: CoringaIntegrationData;
}) {
        const [open, setOpen] = React.useState(false);
        const theme = useTheme();
        const fullScreen = useMediaQuery(theme.breakpoints.down("lg"));
        const handleClickOpen = () => {
                setOpen(true);
        };

        const handleClose = () => {
                setOpen(false);
        };

        return (
                <React.Fragment>
                        <div className="flex justify-center">
                                <button
                                        onClick={handleClickOpen}
                                        className="mt-20 p-4 px-8 bg-brand-theme-100 hover:text-brand-blue-100 transition-all duration-300 rounded-lg font-bold"
                                >
                                        Quero jogar
                                </button>
                        </div>

                        <Dialog
                                fullScreen={fullScreen}
                                open={open}
                                onClose={handleClose}
                                TransitionComponent={Transition}
                                PaperProps={{
                                        style: {
                                                width: "100%",
                                                height: "100%",
                                                margin: 0,
                                                maxHeight: "100%",
                                                maxWidth: "100%",
                                        },
                                }}
                        >
                                <AppBar sx={{ position: "relative", backgroundColor: "#01162f" }}>
                                        <Toolbar>
                                                <Typography sx={{ ml: 2, flex: 1 }} variant="h6" component="div">
                                                        Compra de bilhetes
                                                </Typography>
                                                <IconButton
                                                        edge="start"
                                                        color="inherit"
                                                        onClick={handleClose}
                                                        aria-label="close"
                                                >
                                                        X
                                                </IconButton>
                                        </Toolbar>
                                </AppBar>
                                <div className="flex-grow flex flex-col overflow-auto">
                                        <TicketSetSection
                                                ticketTypes={ticketTypes}
                                                integrationData={integrationData}
                                        />
                                </div>
                        </Dialog>
                </React.Fragment>
        );
}
