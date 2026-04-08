
import styled from "styled-components";

export default {
  areaHeader: styled.div`
    display: flex;
    flex-direction: column;
    position: sticky;
    z-index: 1000;
    top: 0;
    width: 100%;
    background: var(--header-background, #1a1a1a);
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.25);
    border-bottom: 1px solid rgba(255, 255, 255, 0.06);
  `,

  container: styled.header`
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    justify-content: space-between;
    padding: 14px 20px;
    gap: 16px;
    font-family: "Inter", -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;

    @media (min-width: 768px) {
      flex-wrap: nowrap;
      padding: 0 40px;
      height: 64px;
    }
  `,

  areaLogo: styled.div`
    display: flex;
    gap: 14px;
    align-items: center;
    order: 1;
  `,

  logo: styled.img`
    height: 32px;
    object-fit: contain;
    cursor: pointer;
    transition: opacity 0.2s ease;
    &:hover { opacity: 0.85; }
    @media (min-width: 768px) { height: 38px; }
  `,

  SelectFilial: styled.select`
    background: rgba(255, 255, 255, 0.07);
    border: 1px solid rgba(255, 255, 255, 0.12);
    color: rgba(255, 255, 255, 0.9);
    padding: 7px 12px;
    border-radius: 8px;
    font-size: 12px;
    font-weight: 500;
    font-family: "Inter", sans-serif;
    cursor: pointer;
    outline: none;
    max-width: 75px;
    transition: all 0.2s ease;
    letter-spacing: 0.2px;

    &:hover {
      background: rgba(255, 255, 255, 0.1);
      border-color: rgba(255, 255, 255, 0.18);
    }

    &:focus {
      border-color: rgba(161, 114, 114, 0.6);
      box-shadow: 0 0 0 2px rgba(161, 114, 114, 0.15);
    }

    option { background: #2d2d2d; color: #fff; }

    @media (min-width: 768px) { max-width: 160px; font-size: 13px; }
  `,

  BadgeFilial: styled.span`
    font-weight: 600;
    font-size: 11px;
    padding: 6px 12px;
    background: rgba(255, 255, 255, 0.07);
    border-radius: 6px;
    color: rgba(255, 255, 255, 0.85);
    border: 1px solid rgba(255, 255, 255, 0.1);
    letter-spacing: 0.4px;
    font-family: "Inter", sans-serif;
    text-transform: uppercase;
  `,

  wrapperBusca: styled.div`
    order: 3;
    width: 100%;
    @media (min-width: 768px) {
      order: 2;
      flex: 1;
      max-width: 460px;
    }
  `,

  busca: styled.input`
    width: 100%;
    height: 40px;
    border-radius: 8px;
    padding: 0 16px;
    border: 1px solid rgba(255, 255, 255, 0.1);
    background: rgba(255, 255, 255, 0.06);
    color: white;
    font-size: 14px;
    font-family: "Inter", sans-serif;
    outline: none;
    transition: all 0.2s ease;

    &::placeholder { color: rgba(255, 255, 255, 0.35); font-size: 13px; }

    &:focus {
      background: rgba(255, 255, 255, 0.09);
      border-color: rgba(161, 114, 114, 0.45);
      box-shadow: 0 0 0 2px rgba(161, 114, 114, 0.12);
    }

    @media (min-width: 768px) {
      height: 38px;
      font-size: 13px;
    }
  `,

  perfil: styled.div`
    display: flex;
    align-items: center;
    gap: 14px;
    order: 2;
    @media (min-width: 768px) {
      order: 3;
      padding-left: 18px;
      border-left: 1px solid rgba(255, 255, 255, 0.08);
    }
  `,

  nomeUsuario: styled.div`
    display: none;
    @media (min-width: 1024px) {
      display: flex;
      flex-direction: column;
      align-items: flex-end;
      gap: 2px;
      strong {
        color: rgba(255, 255, 255, 0.92);
        font-size: 13px;
        font-weight: 600;
        font-family: "Inter", sans-serif;
        letter-spacing: 0.1px;
      }
      span {
        color: rgba(255, 255, 255, 0.45);
        font-size: 10px;
        font-weight: 500;
        font-family: "Inter", sans-serif;
        text-transform: uppercase;
        letter-spacing: 0.8px;
      }
    }
  `
};
