import styled from "styled-components";

export default {
  container: styled.div`
    background-color: #f8fafc;
    width: 100%;
    position: fixed;
    height: 100vh; /* Trava a altura na tela */
    display: flex;
    flex-direction: column;
    font-family: 'Inter', sans-serif;
    overflow: hidden; /* Impede o scroll no body principal */
  `,

  Toolbar: styled.div`
    flex-shrink: 0; /* Impede a barra de ser esmagada */
    background: #ffffff;
    border-bottom: 1px solid #e2e8f0;
    position: relative; /* Mantém o FloatingFilter ancorado aqui */
    z-index: 1000;
  `,

  MainBar: styled.div`
    display: flex;
    align-items: center;
    gap: 12px;
    padding: 10px 15px;
    max-width: 1300px;
    margin: 0 auto;
    width: 100%;

    .search-wrapper {
      position: relative;
      flex: 1;
      .icon-search {
        position: absolute;
        left: 12px;
        top: 50%;
        transform: translateY(-50%);
        color: #94a3b8;
        font-size: 18px;
      }
      input {
        width: 100%;
        height: 40px;
        padding-left: 38px;
        border-radius: 10px;
        border: 1px solid #e2e8f0;
        background: #f1f5f9;
        font-size: 14px;
        font-weight: 600;
        color: #1e293b;
        outline: none;
      }
    }
  `,

  FloatingFilter: styled.div<{ isOpen: boolean }>`
    display: ${({ isOpen }) => (isOpen ? "flex" : "none")};
    position: absolute;
    top: 100%; /* Fixado logo abaixo da barra */
    left: 0;
    right: 0;
    background: #ffffff;
    flex-direction: column;
    gap: 18px;
    padding: 24px 20px;
    border-bottom: 3px solid #2563eb;
    box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1);
    z-index: 1001;

    @media (min-width: 769px) { display: none; }

    .filter-item {
      display: flex;
      flex-direction: column;
      gap: 6px;
      label {
        font-size: 11px;
        font-weight: 800;
        color: #64748b;
        text-transform: uppercase;
      }
    }
  `,

  /* Área onde o Scroll vai acontecer de fato */
  ContentBody: styled.div`
    flex: 1; /* Ocupa todo o espaço restante abaixo da Toolbar */
    overflow-y: auto; /* Habilita o scroll apenas aqui */
    padding: 20px;
    max-width: 1300px;
    width: 100%;
    margin: 0 auto;

    /* Estilização básica do scroll para ficar mais clean */
    &::-webkit-scrollbar { width: 6px; }
    &::-webkit-scrollbar-thumb { background: #7cabe9; border-radius: 10px; }

    .results-count {
      margin-bottom: 15px;
      font-size: 11px;
      color: #94a3b8;
      font-weight: 800;
      text-transform: uppercase;
    }
  `,

  DesktopFilters: styled.div`
    display: none;
    gap: 10px;
    align-items: center;
    @media (min-width: 769px) { display: flex; }
  `,

  SelectStyled: styled.div`
    width: 100%;
    position: relative;
    select {
      width: 100%;
      height: 40px;
      padding: 0 35px 0 12px;
      border-radius: 10px;
      border: 1px solid #e2e8f0;
      background-color: #f1f5f9;
      color: #334155;
      font-size: 13px;
      font-weight: 700;
      outline: none;
      appearance: none;
      background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke='%2364748b' stroke-width='2.5'%3E%3Cpath stroke-linecap='round' stroke-linejoin='round' d='M19.5 8.25l-7.5 7.5-7.5-7.5' /%3E%3C/svg%3E");
      background-repeat: no-repeat;
      background-position: right 12px center;
      background-size: 14px;
      option { background-color: #ffffff; color: #334155; }
    }
  `,

  InputData: styled.input`
    height: 40px;
    padding: 0 12px;
    border-radius: 10px;
    border: 1px solid #e2e8f0;
    background: #f1f5f9;
    font-size: 13px;
    font-weight: 700;
    color: #334155;
    outline: none;
    @media (max-width: 768px) { width: 100%; }
  `,

  BtnFilterMobile: styled.button`
    display: flex;
    align-items: center;
    justify-content: center;
    width: 42px;
    height: 40px;
    background: #f1f5f9;
    color: #2563eb;
    border: 1px solid #e2e8f0;
    border-radius: 10px;
    @media (min-width: 769px) { display: none; }
  `,

  BtnAction: styled.button`
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 8px;
    height: 40px;
    padding: 0 20px;
    background-color: #2563eb;
    color: white;
    border: none;
    border-radius: 10px;
    font-size: 13px;
    font-weight: 800;
    text-transform: uppercase;
  `,
};