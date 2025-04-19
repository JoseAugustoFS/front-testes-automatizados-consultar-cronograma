import { render, screen, fireEvent } from "@testing-library/react";
import '@testing-library/jest-dom';
import { ConsultaCronogramaView, ConsultaCronogramaViewProps } from "@/app/presentation/ConsultarCronograma/consultar-cronograma-view";
import { Cronograma } from "@/app/domain/entities/cronograma";

describe("ConsultaCronogramaView", () => {
    it("deve renderizar os campos corretamente", () => {
        const mockProps: ConsultaCronogramaViewProps = {
            cronograma: null,
            id: "123",
            onChange: () => {},
            onBuscar: () => {},
            loading: false,
            error: null,
            mensagem: null,
        };

        render(<ConsultaCronogramaView {...mockProps} />);

        expect(screen.getByLabelText("ID do Cronograma:")).toBeInTheDocument();
        expect(screen.getByText("Buscar")).toBeInTheDocument();
    });

    it("deve exibir o cronograma quando disponível", () => {
        const mockCronograma: Cronograma = {
            id: "1",
            atividades: [
                { data: "2025-04-20", descricao: "Atividade 1" },
                { data: "2025-04-21", descricao: "Atividade 2" },
            ],
        };

        const mockProps: ConsultaCronogramaViewProps = {
            cronograma: mockCronograma,
            id: "1",
            onChange: () => {},
            onBuscar: () => {},
            loading: false,
            error: null,
            mensagem: null,
        };

        render(<ConsultaCronogramaView {...mockProps} />);

        expect(screen.getByText("Cronograma: 1")).toBeInTheDocument();
        expect(screen.getByText("Atividade 1")).toBeInTheDocument();
        expect(screen.getByText("Atividade 2")).toBeInTheDocument();
    });

    it("deve exibir o texto de erro quando houver erro", () => {
        const mockProps: ConsultaCronogramaViewProps = {
            cronograma: null,
            id: "123",
            onChange: () => {},
            onBuscar: () => {},
            loading: false,
            error: "Erro ao carregar o cronograma.",
            mensagem: null,
        };

        render(<ConsultaCronogramaView {...mockProps} />);

        expect(screen.getByText("Erro: Erro ao carregar o cronograma.")).toBeInTheDocument();
    });

    it("deve exibir o texto de mensagem quando houver mensagem", () => {
        const mockProps: ConsultaCronogramaViewProps = {
            cronograma: null,
            id: "123",
            onChange: () => {},
            onBuscar: () => {},
            loading: false,
            error: null,
            mensagem: "Mensagem importante.",
        };

        render(<ConsultaCronogramaView {...mockProps} />);

        expect(screen.getByText("Mensagem importante.")).toBeInTheDocument();
    });

    it("deve chamar onBuscar ao clicar no botão de buscar", () => {
        let clicked = false;
        const mockOnBuscar = () => {
            clicked = true;
        };

        const mockProps: ConsultaCronogramaViewProps = {
            cronograma: null,
            id: "123",
            onChange: () => {},
            onBuscar: mockOnBuscar,
            loading: false,
            error: null,
            mensagem: null,
        };

        render(<ConsultaCronogramaView {...mockProps} />);

        const button = screen.getByText("Buscar");
        fireEvent.click(button);

        expect(clicked).toBe(true);
    });
});
