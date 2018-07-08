export interface IMessage {
    sender: string,
    _idSender: string,
    target: string,
    _idTarget: string,
    title: string,
    body: string,
    date: string,
    readed: boolean
}