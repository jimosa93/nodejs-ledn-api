import { Request, Response } from "express";
import TransactioModel, { Type } from '../models/transaction.model';
import AccountModel from '../models/account.model';

export const createTransaction = async (req: Request, res: Response) => {
    const { userEmail, amount, type } = req.body;
    if(!(userEmail && amount && type)) res.status(400).json({ message: "userEmail, amount and type are required" });
    try {
        const account = await AccountModel.findOne({ userEmail });
        if (!account) return res.status(404).json({ message: "Not account found" });

        if (type === 'send' && (account.balance - amount <= 0)) {
            return res.status(400).json({ message: "Not enough tokens to send" });
        }               

        const newTransaction = new TransactioModel({
            userEmail,
            amount,
            type
        });
        const transactionSaved = await newTransaction.save();

        const sumTypes = await TransactioModel.aggregate([
            { $match: { "userEmail": userEmail } },
            { $group: { "_id": "$type", "sum_val": { "$sum": "$amount" } } }
        ]);

        let sumReceive = sumTypes.find(elem => elem._id === Type.RECEIVE)
        let sumSend = sumTypes.find(elem => elem._id === Type.SEND);

        if (!sumReceive) sumReceive = { sum_val: 0 };                
        if (!sumSend) sumSend = { sum_val: 0 };                
        
        const newBalance = sumReceive.sum_val - sumSend.sum_val;
        
        await AccountModel.updateOne({ id: parseInt(account._id) }, { balance: newBalance });
        return res.status(201).json(transactionSaved);
    } catch (error) {
        if (error instanceof Error) {
            return res.status(500).json({ message: error.message });
        }
    }
}
