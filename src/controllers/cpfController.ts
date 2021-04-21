import { Request, Response } from "express";
import { ICpf } from "../types/cpfTypes";
import Cpf from "../entities/cpfEntity";
import CpfValidator from "cpf"

const addCpf = async (req: Request, res: Response): Promise<void> => {
    try{
        const { cpf } = req.body as Pick<ICpf, "cpf">;

        //Verifica se o CPF é válido
        if(!CpfValidator.isValid(cpf)){
            res
                .status(400)
                .json({ type: "InvalidCpfException", message: "CPF is invalid." });
            return;
        }

        // Vefifica se o CPF já existe
        const existingCpf = await Cpf.findOne({'cpf': cpf});
        if(existingCpf) {
            res
                .status(400)
                .json({ type: "ExistsCpfException", message: "CPF already exists." });
            return;
        }

        const newCpf: ICpf = new Cpf({
            cpf: cpf.replace(/\D/g, "")
        });

        const savedProfile = await newCpf.save();

        res
            .status(200)
            .json({ message: "CPF added", cpf: savedProfile });
    } catch(error) {
        throw error;
    }
}

const checkCpf = async (req: Request, res: Response): Promise<void> => {
    try{
        const cpf = req.params.cpf;

        //Verifica se o CPF é válido
        if(!CpfValidator.isValid(cpf)){
            res
                .status(400)
                .json({ type: "InvalidCpfException", message: "CPF is invalid." });
            return;
        }

        // Vefifica se o CPF já existe
        const existingCpf = await Cpf.findOne({'cpf': cpf.replace(/\D/g, "")}, 'cpf createdAt');
        if(!existingCpf) {
            res
                .status(400)
                .json({ type: "NotFoundCpfException", message: "CPF do not exists." });
            return;
        }

        res
            .status(200)
            .json({ Content: existingCpf });
    } catch(error) {
        throw error;
    }
}

const removeCpf = async (req: Request, res: Response): Promise<void> => {
    try{
        const cpf = req.params.cpf;

        //Verifica se o CPF é válido
        if(!CpfValidator.isValid(cpf)){
            res
                .status(400)
                .json({ type: "InvalidCpfException", message: "CPF is invalid." });
            return;
        }

        // Vefifica se o CPF já existe
        const existingCpf = await Cpf.findOne({'cpf': cpf.replace(/\D/g, "")}, 'cpf createdAt');
        if(!existingCpf) {
            res
                .status(400)
                .json({ type: "NotFoundCpfException", message: "CPF do not exists." });
            return;
        }

        await Cpf.deleteOne({ cpf: cpf.replace(/\D/g, "") });

        res
            .status(200)
            .json({ message: "CPF removed", cpf: existingCpf });
    } catch(error) {
        throw error;
    }
}

const allCpf = async (req: Request, res: Response): Promise<void> => {
    try{
        const allCpf = await Cpf.find({}, 'cpf createdAt');

        res
            .status(200)
            .json({ Content: allCpf });
    } catch(error) {
        throw error;
    }
}

export { addCpf, checkCpf, removeCpf, allCpf }