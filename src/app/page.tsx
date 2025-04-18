'use client';

import Image from "next/image";
import styles from "./page.module.css";
import { ConsultaCronogramaView } from "./presentation/consultar-cronograma-view";

export default function Home() {
  return (
    <>
      <ConsultaCronogramaView
        cronograma={null}
        id="default-id"
        onChange={() => {}}
        onBuscar={() => {}}
      />
    </>
  );
}
