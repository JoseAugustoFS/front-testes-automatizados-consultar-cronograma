import { AxiosApi } from "../../infra/axios-api";
import { ConsultaCronogramaService, RetornoAPI } from "../../data/services/consultar-cronograma-service";
import { ConsultaCronogramaContainer } from "../ConsultarCronograma/consultar-cronograma-container";
import ainst from "../../infra/axios-instance";

export function ConsultaCronogramaPresenter() {
    const api = new AxiosApi<RetornoAPI>(ainst);
    const consultaCronogramaService = new ConsultaCronogramaService(api);

    return (
        <ConsultaCronogramaContainer
            servicoConsultaCronograma={consultaCronogramaService}
        />
    );
}
