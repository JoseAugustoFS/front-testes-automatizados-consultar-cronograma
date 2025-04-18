import { IConsultaCronogramaService } from "../../contracts/iconsultar-cronograma-service";
import { IApi } from "../../contracts/api";
import { IMensagemAPI, isIMensagemAPI } from "../../contracts/mensagem-api";
import { Cronograma } from "../../domain/entities/cronograma";
import { Atividade } from "@/app/domain/entities/atividade";

export interface RetornoAPI {
    mensagem: string;
    cronograma: {
      disciplinaId: number;
      atividades: Atividade[];
    };
}

function transformarParaCronograma(resposta: RetornoAPI): Cronograma {
    return {
      id: resposta.cronograma.disciplinaId.toString(),
      atividades: resposta.cronograma.atividades,
    };
}

export class ConsultaCronogramaService implements IConsultaCronogramaService {
    private api: IApi<RetornoAPI>;

    constructor(api: IApi<RetornoAPI>) {
        this.api = api;
    }

    async obterPorId(id: string): Promise<Cronograma | null> {
        try {
            const result: RetornoAPI | IMensagemAPI = await this.api.get('/cronograma', id);
            console.log('Resultado da API:', result);
            if (isIMensagemAPI(result)) {
                return null;
            }
            const cronogramaTransformado = transformarParaCronograma(result);
            return cronogramaTransformado;
        } catch (error) {
            return null;
        }
    }
}
