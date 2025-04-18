import { Atividade } from "./atividade";

export interface Cronograma {
    id: string;
    atividades: Atividade[];
}