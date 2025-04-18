import { IApi } from "../contracts/api";
import { IMensagemAPI } from "../contracts/mensagem-api";
import axios, { AxiosInstance } from "axios";


export class AxiosApi<T> implements IApi<T> {
    private ains: AxiosInstance;
    
    constructor(ains: AxiosInstance) {
        this.ains = ains;
    }

    async get(url: string, id: string): Promise<T | IMensagemAPI> {
        try {
            const retorno = await this.ains.get<T>(`${url}/${id}`);
            console.log('Resultado da API:', retorno.data);
            if ([200].includes(retorno.status))
                return retorno.data as T;
            return { status: retorno.status, mensagem: retorno.statusText } as IMensagemAPI;
        } catch (error) {
            throw error;
        }
    }
}