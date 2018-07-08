import { IUser } from "./IUser";

export interface IResponseAuthentification {
    success: boolean,
    token: string,
    user: IUser
}