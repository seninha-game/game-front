import { coringaApi, getUserBalance } from "@/api/coringaApi";
import { seninhaApi } from "@/api/seninhaApi";
import { TicketContext, iTicketContextProps } from "@/context/ticket-context";
import { CoringaIntegrationData, ITicket } from "@/interfaces/ticket";
import { formatCurrency } from "@/utils/formatCurrency";
import { CircularProgress } from "@mui/material";
import Box from "@mui/material/Box";
import { green } from "@mui/material/colors";
import Modal from "@mui/material/Modal";
import React, { useContext } from "react";
import { IoClose } from "react-icons/io5";
import { PixInfoModal } from "./PixInformationModal";

const style = {
        position: "absolute",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        width: 85 / 100,
        maxWidth: 550,
        bgcolor: "background.paper",
        borderRadius: "6px",
        boxShadow: 24,
        pt: 2,
        px: 2,
        pb: 3,
};

function PaymentMethodModal({
        infoTicket,
}: {
        infoTicket: { amount: number; selectedType: ITicket };
}) {
        const [open, setOpen] = React.useState(false);
        const handleOpen = () => {
                setOpen(true);
        };
        const handleClose = () => {
                setOpen(false);
        };

        return (
                <React.Fragment>
                        {/* <button className="mx-auto flex" onClick={handleOpen}>
                                {" "}
                                <Image
                                        alt="pix-icon"
                                        className="w-40 mx-auto cursor-pointer"
                                        src={pixIcon}
                                ></Image>
                        </button> */}

                        <Modal
                                open={open}
                                onClose={handleClose}
                                aria-labelledby="child-modal-title"
                                aria-describedby="child-modal-description"
                        >
                                <Box
                                        sx={{
                                                ...style,
                                                width: 85 / 100,
                                                maxWidth: 550,
                                                placeContent: "center",
                                                justifyContent: "center",
                                        }}
                                >
                                        <IoClose
                                                onClick={handleClose}
                                                className="w-6 h-6 cursor-pointer absolute top-4 right-4"
                                        ></IoClose>
                                        <PixInfoModal
                                                ticketType={infoTicket.selectedType}
                                                ticketAmount={infoTicket.amount}
                                        ></PixInfoModal>
                                </Box>
                        </Modal>
                </React.Fragment>
        );
}

type singleTicketBuyData = {
        buy_source: string,
        selected_numbers: string,
        coringa_user_id: string,
        payment_type: string,
        ticket_type_id: number,
        customer_name: string,
}

export default function NestedBuyModal({
        open,
        setOpen,
        infoTicket,
        setIsBuySuccess,
        integrationData
}: {
        open: boolean;
        setIsBuySuccess: React.Dispatch<React.SetStateAction<boolean>>;
        infoTicket: { amount: number; selectedType: ITicket };
        setOpen: React.Dispatch<React.SetStateAction<boolean>>;
        integrationData: CoringaIntegrationData
}) {
        console.log("integrationData", integrationData)
        const { ticketBuyRequestToRaffleApi, user, isLoading }: iTicketContextProps =
                React.useContext(TicketContext);
        const { multipleTicketSelections }: iTicketContextProps = useContext(TicketContext);

        const handleOpen = () => {
                setOpen(true);
        };
        const handleClose = () => {
                setOpen(false);
        };
        const handleBuy = async (amount: number, ticketType: ITicket) => {
                //custo
                let cost = ticketType.price * amount
                //pode comprar
                let canBuy = integrationData.balance >= cost / 100

                let customerName: string
                //gastar o saldo do mano
                if (canBuy) {
                        const responseCoringa = await coringaApi.post("updateBalanceApi", {
                                userid: integrationData.userId,
                                amount: cost / 100
                        }, {
                                headers: { Authorization: `Bearer ${integrationData.authToken}` },
                        })

                        customerName = responseCoringa.data.user
                } else {
                        //todo erro na ui
                        console.error("Saldo insuficiente: ", integrationData.balance, cost / 100)
                        return
                }

                let ticketsToBuy: singleTicketBuyData[] = []
                multipleTicketSelections.forEach((item) => {
                        let selectedNumbers = item.join(",")

                        let ticketToBuy: singleTicketBuyData = {
                                ticket_type_id: parseInt(ticketType.id),
                                buy_source: "web",
                                coringa_user_id: integrationData.userId,
                                payment_type: "coringa_balance",
                                selected_numbers: selectedNumbers,
                                customer_name: customerName,
                        }

                        ticketsToBuy.push(ticketToBuy)
                })

                let body = {
                        "data": ticketsToBuy
                }

                const response = await seninhaApi.post("buy-ticket", body)

                if (response.status === 201) {
                        setIsBuySuccess(true)

                        let newBalance = await getUserBalance(integrationData.userId, integrationData.authToken)
                        integrationData.setBalance(newBalance)

                        console.log("new balance: ", newBalance)
                        console.log("Tickets comprados com sucesso")
                } else if (response.status === 400) {
                        let errorList = response.data["Errors"]
                        console.error(`Não foi possível finalizar a compra de ${errorList.length()} tickets`)
                        //devolver o dinheiro do mano
                } else {
                        console.error("Erro interno no servidor")
                }

                handleClose()

        };


        return (
                <div>
                        <Modal
                                open={open}
                                onClose={handleClose}
                                aria-labelledby="parent-modal-title"
                                aria-describedby="parent-modal-description"
                        >
                                <Box
                                        sx={{
                                                ...style,
                                                width: 85 / 100,
                                                maxWidth: 550,
                                                height: 350,
                                                placeContent: "",
                                                display: "flex",
                                                flexDirection: "column",
                                                justifyContent: "space-around",
                                        }}
                                >
                                        {" "}
                                        <div className="flex items-center w-full justify-between">
                                                {" "}
                                                <p className="font-bold">Forma de pagamento</p>
                                                <IoClose
                                                        onClick={handleClose}
                                                        className="w-6 h-6 cursor-pointer "
                                                ></IoClose>
                                        </div>
                                        <div className="flex flex-col text-lg">
                                                {" "}
                                                <p className="mb-4">
                                                        Saldo disponível na carteira: {formatCurrency(integrationData?.balance)}
                                                </p>
                                                <div className=" flex gap-1">
                                                        <p className="font-bold">Bilhetes</p>
                                                        <p className="font-bold">
                                                                {" "}
                                                                {infoTicket.selectedType.name.charAt(0).toLocaleUpperCase() +
                                                                        infoTicket.selectedType.name.slice(1)}
                                                                :{" "}
                                                        </p>
                                                        <p className="font-semibold">{infoTicket.amount} </p>
                                                </div>
                                                <p className="font-bold" id="parent-modal-description">
                                                        Total:{" "}
                                                        {formatCurrency(
                                                                infoTicket.amount * (infoTicket.selectedType.price / 100)
                                                        )}
                                                </p>
                                        </div>{" "}
                                        <div className="flex  items-center gap-8 ">
                                                <div className="flex w-full justify-between">
                                                        <button
                                                                onClick={() => {
                                                                        handleBuy(infoTicket.amount, infoTicket.selectedType);
                                                                }}
                                                                disabled={
                                                                        false
                                                                }
                                                                className={
                                                                        "mx-auto relative disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer bg-orange-500 rounded-md px-6 h-[65px] self-center  text-white"
                                                                }
                                                        >
                                                                <span className="flex flex-col relative">
                                                                        Usar carteira
                                                                        {isLoading && (
                                                                                <CircularProgress
                                                                                        size={44}
                                                                                        sx={{
                                                                                                color: green[800],
                                                                                                position: "absolute",
                                                                                                top: "20%",
                                                                                                right: "25%",
                                                                                                marginTop: "-12px",
                                                                                                marginLeft: "-12px",
                                                                                        }}
                                                                                />
                                                                        )}
                                                                </span>
                                                        </button>
                                                        <PaymentMethodModal infoTicket={infoTicket} />
                                                </div>
                                        </div>
                                </Box>
                        </Modal>
                </div>
        );
}
