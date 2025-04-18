import { IConsultaCronogramaService } from "../../contracts/iconsultar-cronograma-service";
import { IApi } from "../../contracts/api";
import { IMensagemAPI, isIMensagemAPI } from "../../contracts/mensagem-api";
import { Cronograma } from "../../domain/entities/cronograma";

export class ConsultaCronogramaService implements IConsultaCronogramaService {
    private api: IApi<Cronograma>;

    constructor(api: IApi<Cronograma>) {
        this.api = api;
    }

    async obterPorId(id: string): Promise<Cronograma | null> {
        try {
            const result: Cronograma | IMensagemAPI = await this.api.get('/cronograma', id);
            console.log('Resultado da API:', result);
            if (isIMensagemAPI(result)) {
                return null;
            }

            return result;
        } catch (error) {
            return null;
        }
    }
}
