import { prop, getModelForClass, modelOptions } from '@typegoose/typegoose';

export enum Type {
    RECEIVE = 'receive',
    SEND = 'send'
}

@modelOptions({
    schemaOptions: {
        timestamps: true
    }
})
class Transaction {
    @prop({ required: true, type: String })
    userEmail: string

    @prop({ required: true, type: Number })
    amount: number

    @prop({ required: true, enum: Type, type: String })
    type: Type
}

const TransactionModel = getModelForClass(Transaction);

export default TransactionModel;