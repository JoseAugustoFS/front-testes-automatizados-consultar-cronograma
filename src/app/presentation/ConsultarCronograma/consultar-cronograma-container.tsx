import React, { useState } from "react";
import { Cronograma } from "../../domain/entities/cronograma";
import { IConsultaCronogramaService } from "../../contracts/iconsultar-cronograma-service";
import { ConsultaCronogramaView as DefaultConsultaCronogramaView } from "./consultar-cronograma-view";

export interface ConsultaCronogramaContainerProps {
    servicoConsultaCronograma: IConsultaCronogramaService;
    ConsultaCronogramaView?: React.ComponentType<any>;
}

export function ConsultaCronogramaContainer({servicoConsultaCronograma, ConsultaCronogramaView = DefaultConsultaCronogramaView}: ConsultaCronogramaContainerProps) {
    const [id, setId] = useState<string>('');
    const [cronograma, setCronograma] = useState<Cronograma | null>(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [mensagem, setMensagem] = useState<string | null>(null);

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setId(event.target.value);
    };

    const handleBuscar = async () => {
        try {
            setLoading(true);
            setError(null);
            setMensagem(null);
            const resultado = await servicoConsultaCronograma.obterPorId(id);
            if (resultado) {
                setCronograma(resultado);
            } else {
                setCronograma(null);
                setMensagem("Cronograma não encontrado.");
            }
        } catch (error) {
            const mensagemErro = error instanceof Error ? error.message : "Erro ao buscar cronograma.";
            setError(mensagemErro);
        } finally {
            setLoading(false);
        }
    };

    return (
        <ConsultaCronogramaView
            id={id}
            cronograma={cronograma}
            onChange={handleChange}
            onBuscar={handleBuscar}
            loading={loading}
            error={error}
            mensagem={mensagem}
        />
    );
}
