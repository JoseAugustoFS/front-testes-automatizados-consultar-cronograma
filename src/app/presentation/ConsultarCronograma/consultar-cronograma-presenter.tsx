import { Cronograma } from "../../domain/entities/cronograma";
import { AxiosApi } from "../../infra/axios-api";
import { ConsultaCronogramaService } from "../../data/services/consultar-cronograma-service";
import { ConsultaCronogramaContainer } from "../ConsultarCronograma/consultar-cronograma-container";
import { ConsultaCronogramaView } from "../ConsultarCronograma/consultar-cronograma-view";
import ainst from "../../infra/axios-instance";

export function ConsultaCronogramaPresenter() {
    const api = new AxiosApi<Cronograma>(ainst);
    const consultaCronogramaService = new ConsultaCronogramaService(api);

    return (
        <ConsultaCronogramaContainer
            servicoConsultaCronograma={consultaCronogramaService}
        />
    );
}
