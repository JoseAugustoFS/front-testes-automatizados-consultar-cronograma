import { render, screen, fireEvent, waitFor, act } from "@testing-library/react";
import "@testing-library/jest-dom";
import React from "react";
import { ConsultaCronogramaContainer } from "@/app/presentation/ConsultarCronograma/consultar-cronograma-container";
import { Cronograma } from "@/app/domain/entities/cronograma";


const MockConsultaCronogramaView = ({ cronograma, id, onChange, onBuscar, loading, error, mensagem }: any) => (
  <div>
    <h3>Consultar Cronograma</h3>
    <label>
      ID do Cronograma:
      <input type="text" name="id" value={id} onChange={onChange} />
    </label>
    <br />
    <button onClick={onBuscar} disabled={loading}>
      Buscar
    </button>

    {cronograma && (
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
            {cronograma.atividades.map((atividade: any, index: number) => (
              <tr key={index}>
                <td>{atividade.data}</td>
                <td>{atividade.descricao}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    )}

    {loading && <div>Carregando...</div>}
    {error && <div>Erro: {error}</div>}
    {mensagem && <div>{mensagem}</div>}
  </div>
);

describe("ConsultaCronogramaContainer", () => {
  test("deve renderizar os campos corretamente", () => {
    const mockServicoConsultaCronograma = {
      obterPorId: async (_id: string) => null
    };

    render(
      <ConsultaCronogramaContainer
        servicoConsultaCronograma={mockServicoConsultaCronograma}
        ConsultaCronogramaView={MockConsultaCronogramaView}
      />
    );

    expect(screen.getByText("Consultar Cronograma")).toBeInTheDocument();
    expect(screen.getByLabelText("ID do Cronograma:")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Buscar" })).toBeInTheDocument();
  });

  test("deve exibir cronograma quando encontrado", async () => {
    const mockServicoConsultaCronograma = {
      obterPorId: async (_id: string): Promise<Cronograma> => ({
        id: "123",
        atividades: [
          { data: "2025-04-01", descricao: "Aula inaugural" },
          { data: "2025-04-15", descricao: "Entrega do trabalho" }
        ]
      })
    };

    render(
      <ConsultaCronogramaContainer
        servicoConsultaCronograma={mockServicoConsultaCronograma}
        ConsultaCronogramaView={MockConsultaCronogramaView}
      />
    );

    fireEvent.change(screen.getByLabelText("ID do Cronograma:"), { target: { value: "123" } });
    fireEvent.click(screen.getByRole("button", { name: "Buscar" }));

    await waitFor(() => {
      expect(screen.getByText("Cronograma: 123")).toBeInTheDocument();
      expect(screen.getByText("Aula inaugural")).toBeInTheDocument();
      expect(screen.getByText("Entrega do trabalho")).toBeInTheDocument();
    });
  });

  test("deve exibir mensagem quando cronograma não for encontrado", async () => {
    const mockServicoConsultaCronograma = {
      obterPorId: async (_id: string): Promise<Cronograma | null> => null
    };

    render(
      <ConsultaCronogramaContainer
        servicoConsultaCronograma={mockServicoConsultaCronograma}
        ConsultaCronogramaView={MockConsultaCronogramaView}
      />
    );

    fireEvent.change(screen.getByLabelText("ID do Cronograma:"), { target: { value: "999" } });
    fireEvent.click(screen.getByRole("button", { name: "Buscar" }));

    await waitFor(() => {
      expect(screen.getByText("Cronograma não encontrado.")).toBeInTheDocument();
    });
  });

  test("deve exibir erro ao ocorrer uma exceção", async () => {
    const mockServicoConsultaCronograma = {
      obterPorId: async (_id: string): Promise<Cronograma | null> => {
        throw new Error("Erro ao buscar cronograma.");
      }
    };

    render(
      <ConsultaCronogramaContainer
        servicoConsultaCronograma={mockServicoConsultaCronograma}
        ConsultaCronogramaView={MockConsultaCronogramaView}
      />
    );

    fireEvent.change(screen.getByLabelText("ID do Cronograma:"), { target: { value: "erro" } });
    fireEvent.click(screen.getByRole("button", { name: "Buscar" }));

    await waitFor(() => {
      expect(screen.getByText("Erro: Erro ao buscar cronograma.")).toBeInTheDocument();
    });
  });

  test("deve exibir loading enquanto busca estiver em andamento", async () => {
    let resolver: (value: Cronograma) => void;
    const loadingPromise = new Promise<Cronograma>((resolve) => {
      resolver = resolve;
    });

    const mockServicoConsultaCronograma = {
      obterPorId: () => loadingPromise
    };

    render(
      <ConsultaCronogramaContainer
        servicoConsultaCronograma={mockServicoConsultaCronograma}
        ConsultaCronogramaView={MockConsultaCronogramaView}
      />
    );

    fireEvent.change(screen.getByLabelText("ID do Cronograma:"), { target: { value: "123" } });
    fireEvent.click(screen.getByRole("button", { name: "Buscar" }));

    expect(screen.getByText("Carregando...")).toBeInTheDocument();

    act(() => {
      resolver!({
        id: "123",
        atividades: [{ data: "2025-04-01", descricao: "Aula inaugural" }]
      });
    });

    await waitFor(() => {
      expect(screen.queryByText("Carregando...")).not.toBeInTheDocument();
      expect(screen.getByText("Cronograma: 123")).toBeInTheDocument();
    });
  });
});
