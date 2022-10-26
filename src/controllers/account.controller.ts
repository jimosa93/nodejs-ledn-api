import { Request, Response } from "express";
import Account from '../models/account.model';

export const getAccount = async (req: Request, res: Response) => {
    try {
        const { email } = req.params;
        const account = await Account.findOne({ userEmail: email });

        if (!account) return res.status(404).json({ message: "Account not found" });

        return res.json(account);
    } catch (error) {
        if (error instanceof Error) {
            return res.status(500).json({ message: error.message });
        }
    }
};