import { IApi } from "@/app/contracts/api";
import { ConsultaCronogramaService, RetornoAPI } from "@/app/data/services/consultar-cronograma-service";
import { IMensagemAPI } from "@/app/contracts/mensagem-api";

class MockApi implements IApi<RetornoAPI> {
    async get(url: string, id: string): Promise<RetornoAPI | IMensagemAPI> {
        if (id === "1") {
            return {
                mensagem: "Sucesso",
                cronograma: {
                    disciplinaId: 1,
                    atividades: [
                        { data: "2025-04-20", descricao: "Atividade 1" },
                        { data: "2025-04-21", descricao: "Atividade 2" },
                    ],
                },
            };
        } else {
            return { mensagem: "Cronograma não encontrado", status: 404 };
        }
    }
}

class MockApiComErro implements IApi<RetornoAPI> {
    async get(url: string, id: string): Promise<RetornoAPI | IMensagemAPI> {
        throw new Error("Erro simulado na requisição");
    }
}

describe('ConsultaCronogramaService - Testes do método obterPorId', () => {
    test('deve retornar um cronograma quando a requisição for bem-sucedida', async () => {
        const mockApi = new MockApi();
        const service = new ConsultaCronogramaService(mockApi);

        const result = await service.obterPorId("1");

        expect(result).not.toBeNull();
        if (result) {
            expect(result.id).toBe("1");
            expect(result.atividades).toBeInstanceOf(Array);
            expect(result.atividades.length).toBe(2);
            expect(result.atividades[0].descricao).toBe("Atividade 1");
            expect(result.atividades[1].descricao).toBe("Atividade 2");
        }
    });

    test('deve retornar null quando o cronograma não for encontrado', async () => {
        const mockApi = new MockApi();
        const service = new ConsultaCronogramaService(mockApi);

        const result = await service.obterPorId("999");

        expect(result).toBeNull();
    });

    test('deve retornar null quando ocorrer um erro na requisição', async () => {
        const mockApiComErro = new MockApiComErro();
        const service = new ConsultaCronogramaService(mockApiComErro);

        const result = await service.obterPorId("1");

        expect(result).toBeNull();
    });

    test('deve retornar null quando a API retornar uma mensagem de erro', async () => {
        const mockApi = new MockApi();
        const service = new ConsultaCronogramaService(mockApi);

        const result = await service.obterPorId("2");

        expect(result).toBeNull();
    });
});
