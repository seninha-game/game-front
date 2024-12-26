import { Dispatch, SetStateAction } from "react";

export interface ITicket {
        id: string;
        CreatedAt: Date | string;
        UpdatedAt: Date | string;
        DeletedAt: null | string;
        price: number;
        name: string;
        numbers_amount: number;
}


export interface TicketModel {
        id: string;
        selected_numbers: string;
        buy_source: string;
        owner_id: any;
        resale_place_id: string;
        owner_name: string;
        owner_contact: string;
        payment_type: string;
        ticket_type: ITicket;
        createdAt: string;
        updatedAt: string;
        deletedAt: null;
};

export type CoringaIntegrationData = {
        balance: number,
        setBalance: Dispatch<SetStateAction<number>>,
        authToken: string,
        userId: string
}
