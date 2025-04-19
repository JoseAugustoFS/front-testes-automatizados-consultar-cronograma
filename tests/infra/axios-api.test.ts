import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import { AxiosApi } from '@/app/infra/axios-api';

describe('AxiosApi', () => {
    const mockAxios = axios.create();
    const mock = new MockAdapter(mockAxios);
    const api = new AxiosApi(mockAxios);

    it('deve retornar os dados corretamente quando o status for 200', async () => {
        mock.onGet('/api/endpoint/1').reply(200, { id: '1', nome: 'Exemplo' });

        const result = await api.get('/api/endpoint', '1');

        expect(result).toEqual({ id: '1', nome: 'Exemplo' });
    });

    it('deve retornar mensagem quando status não for 200 e não houver erro lançado', async () => {
        const mockGet = jest.fn().mockResolvedValue({
            status: 500,
            statusText: 'Erro interno',
            data: 'qualquer coisa'
        });
    
        const mockInstance = { get: mockGet } as any;
        const api = new AxiosApi(mockInstance);
    
        const result = await api.get('/api/endpoint', '1');
    
        expect(result).toEqual({ status: 500, mensagem: 'Erro interno' });
    });
    

    it('deve lançar erro quando status não for 200', async () => {
        mock.onGet('/api/endpoint/1').reply(404);

        await expect(api.get('/api/endpoint', '1')).rejects.toThrow();
    });
});
