'use client';

import { IConsultaCronogramaService } from "./contracts/iconsultar-cronograma-service";
import { ConsultaCronogramaContainer } from "./presentation/ConsultarCronograma/consultar-cronograma-container";

export default function Home() {
  return (
    <>
      <ConsultaCronogramaContainer servicoConsultaCronograma={undefined as unknown as IConsultaCronogramaService}/>
    </>
  );
}
