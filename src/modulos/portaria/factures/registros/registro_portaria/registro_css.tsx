import styled from "styled-components";

export default {
  container: styled.div`
    background-color: #f8fafc;
    min-height: 100vh;
    display: flex;
    flex-direction: column;
    padding: 20px;
    
    /* --- AJUSTE DE ESPAÇO --- */
    /* No desktop, deixamos espaço para não sumir atrás do header roxo */
    padding-top: 140px; 

    @media screen and (max-width: 750px) {
      /* No mobile, o header roxo geralmente some ou diminui, então normalizamos */
      padding-top: 20px; 
      padding-left: 10px;
      padding-right: 10px;
    }
  `,

  container_int: styled.div`
    display: flex;
    gap: 10px;
    align-items: center;
    
    /* --- DESKTOP: FIXADO NO CANTO --- */
    position: fixed;
    top: 105px; /* Aumentei para ficar abaixo da sua barra de busca roxa */
    right: 30px;
    z-index: 999;
    
    background: #ffffff;
    padding: 10px 15px;
    border-radius: 8px;
    border: 1px solid #e2e8f0;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);

    /* --- MOBILE: NORMALIZAÇÃO TOTAL --- */
    @media screen and (max-width: 750px) {
      position: relative; /* Volta para o fluxo normal */
      top: 0;
      right: 0;
      width: 100%;
      justify-content: flex-end; /* Mantém os botões à direita */
      margin-bottom: 20px;
      
      /* Remove o estilo de "card flutuante" no mobile */
      background: transparent;
      border: none;
      box-shadow: none;
      padding: 0;
    }
  `
};