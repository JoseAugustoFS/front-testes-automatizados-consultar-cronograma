'use client';

import React from "react";
import { Cronograma } from "../../domain/entities/cronograma";
import { Atividade } from "../../domain/entities/atividade";

interface ConsultaCronogramaViewProps {
    cronograma: Cronograma | null;
    id: string;
    onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
    onBuscar: () => void;
}

export function ConsultaCronogramaView({cronograma, id, onChange, onBuscar}: ConsultaCronogramaViewProps) {
    return (
        <div>
            <h3>Consultar Cronograma</h3>
            <label>ID do Cronograma:
                <input type="text" name="id" value={id} onChange={onChange} />
            </label>
            <br />
            <button onClick={onBuscar}>Buscar</button>

            {cronograma ? (
                <div>
                    <h4>Cronograma: {cronograma.id}</h4>
                    <ul>
                        {cronograma.atividades.map((atividade, index) => (
                            <li key={index}>
                                <strong>Data:</strong> {atividade.data} <br />
                                <strong>Descrição:</strong> {atividade.descricao}
                            </li>
                        ))}
                    </ul>
                </div>
            ) : (
                <p>Nenhum cronograma encontrado.</p>
            )}
        </div>
    );
}