'use client';

import { useRouter } from 'next/navigation';

export const BotaoConsulta = () => {
  const router = useRouter();

  const handleClick = () => {
    if (typeof window !== 'undefined') {
      const auth = localStorage.getItem('auth');
      if (auth) {
        router.push('/consulta');
      } else {
        alert('Você não está logado');
      }
    }
  };

  return (
    <button onClick={handleClick}>
      Página de consulta
    </button>
  );
};
