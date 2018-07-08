import { IMessage } from "./IMessage";

export interface IUser {
    _id: string,
    name: string,
    email: string,
    password: string,
    admin: boolean,
    messages: {
        in:Array<IMessage>,
        out:Array<IMessage>
    }
}