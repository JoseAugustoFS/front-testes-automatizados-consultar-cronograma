'use client';

import React from "react";
import { Cronograma } from "../../domain/entities/cronograma";

export interface ConsultaCronogramaViewProps {
    cronograma: Cronograma | null;
    id: string;
    onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
    onBuscar: () => void;
    loading: boolean;
    error: string | null;
    mensagem: string | null;
}

export function ConsultaCronogramaView({cronograma, id, onChange, onBuscar, loading, error, mensagem}: ConsultaCronogramaViewProps) {
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
                    <table>
                        <thead>
                            <tr>
                            <th>Data</th>
                            <th>Descrição</th>
                            </tr>
                        </thead>
                        <tbody>
                            {cronograma.atividades.map((atividade, index) => (
                                <tr key={index}>
                                    <td>{atividade.data}</td>
                                    <td>{atividade.descricao}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            ) : (
                <></>
            )}
            {loading && <div>Carregando...</div>}
            {error && (
                <div style={{ color: 'red', marginBottom: '10px' }}>
                    Erro: {error}
                </div>
            )}

            {mensagem && (
                <div style={{ color: 'orange', marginBottom: '10px' }}>
                    {mensagem}
                </div>
            )}
        </div>
    );
}