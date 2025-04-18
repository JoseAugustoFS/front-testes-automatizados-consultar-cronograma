import { Cronograma } from "../domain/entities/cronograma";

export interface IConsultaCronogramaService {
    obterPorId(id: string): Promise<Cronograma | null>;
}