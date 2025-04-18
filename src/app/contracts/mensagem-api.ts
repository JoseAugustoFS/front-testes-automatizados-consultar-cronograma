export type IMensagemAPI = {
    status: number;
    mensagem: string;
}

export function isIMensagemAPI(obj: any): obj is IMensagemAPI {
    return ( obj && 
        typeof obj.status === 'number' && 
        typeof obj.mensagem === 'string'
    );
}