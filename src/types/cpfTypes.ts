import { Document } from "mongoose";

export interface ICpf extends Document{
    cpf: string
}