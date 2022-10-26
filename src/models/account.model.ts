import { prop, getModelForClass, modelOptions } from '@typegoose/typegoose';

@modelOptions({
    schemaOptions: {
        timestamps: true
    }
})
export class Account {
    @prop({ type: String, required: true, unique: true, trim: true })
    userEmail: string

    @prop({ type: Number, required: true })
    balance: number
}

const AccountModel = getModelForClass(Account);

export default AccountModel;