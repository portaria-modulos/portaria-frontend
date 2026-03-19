import styled from "styled-components";

export default {
  area_pedidos: styled.section`
    width: 100%;
    max-width: 1400px;
    margin: 0 auto;
    padding: 24px;
    background-color: #f8fafc;
    /* Fonte moderna para sistema SaaS */
    font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
    
    @media (max-width: 768px) {
      padding: 12px;
    }
  `,

  pedidos: styled.div`
    display: grid;
    grid-template-columns: 1fr;
    gap: 20px;

    /* Grid de 2 colunas para PC */
    @media (min-width: 1024px) {
      grid-template-columns: 1fr 1fr;
    }
  `,

  cardItem: styled.div`
    background: #ffffff;
    border-radius: 14px;
    border: 1px solid #e2e8f0;
    transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
    cursor: pointer;
    overflow: hidden;
    display: flex;
    flex-direction: column;
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.05);

    &:hover {
      border-color: #3b82f6;
      box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.08);
      transform: translateY(-3px);
    }

    &:active {
      transform: scale(0.99);
    }
  `,

  headerInfo: styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 10px 16px;
    background: #f8fafc;
    border-bottom: 1px solid #f1f5f9;
  `,

  DataCriacao: styled.span`
    font-size: 11px;
    color: #94a3b8;
    font-weight: 600;
    letter-spacing: 0.02em;
  `,

  MainBody: styled.div`
    padding: 16px;
    display: flex;
    gap: 16px;
    align-items: center; /* Centraliza verticalmente a foto com o texto */
  `,

  Image: styled.img`
    width: 75px;
    height: 75px;
    border-radius: 12px;
    object-fit: cover;
    background: #f1f5f9;
    box-shadow: 0 2px 4px rgba(0,0,0,0.05);
    border: 1px solid #eee;
  `,

  InfoContent: styled.div`
    flex: 1;
    display: flex;
    flex-direction: column;
    gap: 6px;
    min-width: 0;
  `,

  NomeVisitante: styled.h3`
    margin: 0;
    font-size: 15px;
    color: #0f172a;
    font-weight: 800;
    text-transform: uppercase;
    letter-spacing: -0.01em;
    /* Evita quebra de layout se o nome for gigante */
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  `,

  LabelGroup: styled.div`
    display: flex;
    gap: 8px;
    flex-wrap: wrap;
  `,

  BadgeDado: styled.div`
    background: #f8fafc;
    border: 1px solid #e2e8f0;
    padding: 3px 10px;
    border-radius: 6px;
    font-size: 10px;
    font-weight: 700;
    color: #475569;
    display: flex;
    align-items: center;
    gap: 5px;
  `,
AcessoConfirmadoBox: styled.div`
    margin-top: 8px;
    padding: 8px 12px; /* Reduzi um pouco o padding para acompanhar a fonte menor */
    background: #f0fdf4;
    border: 1px solid #dcfce7;
    border-radius: 10px;
    display: flex;
    flex-direction: column;
    gap: 3px;

    .confirmacao-header {
      display: flex;
      align-items: center;
      gap: 6px;
      font-size: 10.5px; /* Fonte menor e mais elegante */
      color: #166534;
      font-weight: 500;
      
      span {
        letter-spacing: 0.2px;
      }

      strong {
        font-weight: 800;
        color: #14532d;
        text-transform: uppercase;
      }
    }

    .horario-detalhado {
      display: flex;
      align-items: center;
      gap: 12px;
      margin-left: 20px; /* Alinhado com o início do texto do header */
      
      .item-data, .item-hora {
        display: flex;
        align-items: center;
        gap: 4px;
        font-size: 9.5px; /* Fonte da data e hora bem pequena */
        color: #15803d;
        font-weight: 600;
        opacity: 0.9; /* Deixa um pouco mais suave para não brigar com o nome */
      }
    }
  `,

  sentinela: styled.div`
    width: 100%;
    padding: 40px;
    display: flex;
    justify-content: center;
    align-items: center;
  `,

  loadingFooter: styled.div`
    color: #94a3b8;
    font-weight: 600;
    font-size: 14px;
  `
};