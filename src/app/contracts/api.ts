import { IMensagemAPI } from "./mensagem-api";

export interface IApi<T> {
    get(url: string, id: string): Promise<T | IMensagemAPI>;
}