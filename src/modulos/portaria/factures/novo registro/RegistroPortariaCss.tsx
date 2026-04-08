import { MdInbox } from "react-icons/md";
import styled from "styled-components";

interface CamposProps {
  hasError?: boolean;
}

export default {
  container_principal: styled.div`
    padding: 15px 10px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: flex-start;
    gap: 10px;
    min-height: 100vh;
    background: #eef2ff;
    font-family: "Inter", -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;

    @media (min-width: 768px) {
      padding: 20px;
      flex-direction: row;
      align-items: flex-start;
      justify-content: center;
    }
  `,

  container: styled.div`
    padding: 10px 5px;
    width: 100%;
    max-width: 900px;

    @media (min-width: 768px) {
      padding: 20px;
    }
  `,

  area_pedidos: styled.section`
    display: flex;
    flex-direction: column;
    gap: 10px;
    margin: 0 auto;
    padding: 10px 15px;
    width: 100%;

    @media (min-width: 768px) {
      padding: 10px 30px;
      max-width: 900px;
    }
  `,

  titulo: styled.h1`
    font-size: 18px;
    font-weight: 600;
    margin-bottom: 15px;
    color: #1e293b;
    text-align: center;
    font-family: "Inter", sans-serif;

    @media (min-width: 768px) {
      font-size: 20px;
      text-align: left;
    }
  `,

  pedidos: styled.section`
    display: flex;
    flex-direction: column;
    gap: 20px;
    width: 100%;
    box-sizing: border-box;
    background: #fff;
    border-radius: 12px;
    padding: 20px 15px;
    box-shadow: 0 1px 4px rgba(0, 0, 0, 0.06);
    border: 1px solid #e8eaf0;

    @media (min-width: 768px) {
      padding: 28px 32px;
    }
  `,

  FormSub: styled.form`
    width: 100%;
    display: flex;
    flex-direction: column;
    gap: 14px;
  `,

  label: styled.label`
    font-size: 0.78rem;
    font-weight: 500;
    color: #64748b;
    font-family: "Inter", sans-serif;
    letter-spacing: 0.2px;
    margin-bottom: 5px;
    display: inline-block;

    @media (min-width: 768px) {
       font-size: 0.82rem;
    }
  `,

  CamposInput: styled.div`
    width: 100%;
    position: relative;
    margin: 4px 0;
  `,

  Select: styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    gap: 10px;
    margin: 4px 0;
  `,

  Campos: styled.input.withConfig({
    shouldForwardProp: (prop) => prop !== "hasError",
  }) <CamposProps>`
    width: 100%;
    height: 42px;
    border-radius: 8px;
    padding: 0 12px;
    background-color: #fff;
    font-size: 14px;
    font-family: "Inter", sans-serif;
    color: #334155;
    border: 1px solid ${({ hasError }) => (hasError ? '#ef4444' : '#d1d5db')};
    transition: all 0.2s ease;

    &::placeholder {
      color: #94a3b8;
      font-size: 13px;
    }

    &:focus {
        outline: none;
        border-color: ${({ hasError }) => (hasError ? '#ef4444' : '#6366f1')};
        box-shadow: 0 0 0 3px ${({ hasError }) => (hasError ? 'rgba(239,68,68,0.1)' : 'rgba(99,102,241,0.1)')};
    }

    @media (max-width: 767px) {
      height: 44px;
      font-size: 16px;
    }
  `,

  labelCheck: styled.label`
    display: flex;
    align-items: center;
    gap: 10px;
    margin: 8px 0;
    cursor: pointer;
    font-size: 13px;
    color: #475569;
    font-family: "Inter", sans-serif;
  `,

  checkbox: styled.input`
    height: 18px;
    width: 18px;
    cursor: pointer;
    accent-color: #6366f1;
  `,

  SelectItens: styled.select<CamposProps>`
    width: 100%;
    height: 42px;
    background-color: #fff;
    border-radius: 8px;
    padding: 0 10px;
    font-size: 14px;
    font-family: "Inter", sans-serif;
    color: #334155;
    border: 1px solid ${({ hasError }) => (hasError ? '#ef4444' : '#d1d5db')};
    transition: all 0.2s ease;
    cursor: pointer;

    &:focus {
      outline: none;
      border-color: #6366f1;
      box-shadow: 0 0 0 3px rgba(99, 102, 241, 0.1);
    }

    @media (max-width: 767px) {
      height: 44px;
      font-size: 16px;
    }
  `,

  TextArea: styled.textarea<CamposProps>`
    min-height: 90px;
    resize: vertical;
    width: 100%;
    padding: 10px 12px;
    background-color: #fff;
    border-radius: 8px;
    font-size: 14px;
    font-family: "Inter", sans-serif;
    color: #334155;
    border: 1px solid ${({ hasError }) => (hasError ? '#ef4444' : '#d1d5db')};
    transition: all 0.2s ease;

    &::placeholder {
      color: #94a3b8;
      font-size: 13px;
    }

    &:focus {
      outline: none;
      border-color: #6366f1;
      box-shadow: 0 0 0 3px rgba(99, 102, 241, 0.1);
    }

    @media (max-width: 767px) {
      font-size: 16px;
    }
  `,

  Options: styled.option`
    padding: 10px;
  `,

  Erros: styled.div`
    color: #ef4444;
    font-size: 11px;
    margin-top: 4px;
    font-weight: 500;
    font-family: "Inter", sans-serif;
  `,

  BtnLogin: styled.button`
    margin: 10px 0;
    width: 100%;
    height: 44px;
    background-color: #6366f1;
    border-radius: 8px;
    color: #fff;
    font-size: 14px;
    font-weight: 600;
    font-family: "Inter", sans-serif;
    border: none;
    transition: all 0.2s ease;
    cursor: pointer;

    &:active {
        transform: scale(0.98);
    }

    &:hover {
        background-color: #4f46e5;
    }

    &:disabled {
      opacity: 0.6;
      cursor: not-allowed;
    }

    @media (min-width: 768px) {
      height: 40px;
    }
  `,

  leftArea: styled.div`
    width: 100%;
    padding: 4px 0;
    display: flex;
    flex-direction: column;
    gap: 12px;

    @media (min-width: 768px) {
      flex-direction: row;
      gap: 14px;
    }
  `,

  btnDivider: styled.div`
    display: flex;
    flex-direction: column;
    width: 100%;
    gap: 10px;

    @media (min-width: 768px) {
      flex-direction: row;
      align-items: center;
    }
  `,

  // --- COMPONENTES DO SLIDE / DASHBOARD ---

  CardCentro: styled.div`
    border-radius: 12px;
    padding: 16px;
    margin-bottom: 10px;
    background: #fff;
    box-shadow: 0 1px 4px rgba(0, 0, 0, 0.06);
    border: 1px solid #e8eaf0;
    display: flex;
    flex-direction: column;

    @media (min-width: 768px) {
      flex-direction: row;
      justify-content: space-between;
      gap: 20px;
      padding: 22px;
      margin-bottom: 20px;
    }
  `,

  StatusContainer: styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 15px;
    width: 100%;
  `,

  AreaItemJust: styled.div`
    display: flex;
    flex-direction: column;
    align-content: center;
    gap: 3px;
  `,

  AreaItemJustCenter: styled.div`
    display: flex;
    flex-direction: column;
    width: 100%;
    margin-top: 5px;
    gap: 5px;

    @media (min-width: 660px) {
      flex-direction: row;
      align-items: center;
      width: auto;
    }
  `,

  AreaItemJustRigth: styled.div`
    display: flex;
    flex-direction: column;
    margin-top: 5px;
    width: 100%;
    gap: 5px;

    @media (min-width: 660px) {
      flex-direction: row;
      align-items: center;
      width: 32%;
      margin-left: 50px;
    }
  `,

  semItens: styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    color: #64748b;
    height: 50vh;
    font-size: 15px;
    gap: 10px;
    opacity: 0.8;
    font-family: "Inter", sans-serif;
  `,

  iconSemItens: styled(MdInbox)`
    font-size: 60px;
    color: #94a3b8;
  `,

  StatusItem: styled.div<{ active?: boolean }>`
    flex: 1;
    text-align: center;
    color: ${(props) => (props.active ? "#fff" : "#94a3b8")};
    background: ${(props) => (props.active ? "#6366f1" : "#e2e8f0")};
    border-radius: 20px;
    padding: 10px;
    margin: 5px;
    font-size: 12px;
    font-weight: 600;
    font-family: "Inter", sans-serif;
  `,

  Button: styled.button`
    background-color: #6366f1;
    color: #fff;
    border: none;
    padding: 12px 20px;
    font-size: 14px;
    border-radius: 8px;
    cursor: pointer;
    width: 100%;
    margin-top: 15px;
    font-weight: 600;
    font-family: "Inter", sans-serif;

    &:active {
      transform: scale(0.97);
    }

    &:hover {
      background-color: #4f46e5;
    }
  `,

  ItemImage: styled.img`
    width: 100%;
    max-width: 120px;
    aspect-ratio: 1/1;
    object-fit: cover;
    border-radius: 12px;
    margin: 0 auto 15px auto;

    @media (min-width: 560px) {
      width: 100px;
      height: 100px;
      margin-right: 15px;
      margin-bottom: 0;
    }
  `,

  ItemDetails: styled.div`
    display: flex;
    flex-direction: column;
    gap: 8px;
    margin: 10px 0;
    flex: 1;
  `,

  SummaryRow: styled.div`
    display: flex;
    justify-content: space-between;
    width: 100%;
  `,

  heanderPedido: styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 10px 15px;
    gap: 10px;
    border-bottom: 1px solid #e8eaf0;
  `,

  tituloPedido: styled.h4`
    font-size: 14px;
    color: #6366f1;
    margin: 0;
    font-family: "Inter", sans-serif;
  `,

  p: styled.p`
    font-weight: 600;
    font-size: 14px;
    margin: 4px 0;
    color: #334155;
    font-family: "Inter", sans-serif;
  `,

  status: styled.div`
    display: flex;
    align-items: center;
    gap: 5px;
    color: #475569;
    font-size: 13px;
    font-family: "Inter", sans-serif;
  `,

  Image: styled.img`
    width: 100%;
    height: 180px;
    border-radius: 12px;
    object-fit: cover;
    object-position: center top;

    @media (min-width: 560px) {
      width: 150px;
      height: 150px;
    }
  `,

  description: styled.div`
    width: 100%;
    word-wrap: break-word;
    font-size: 13px;
    line-height: 1.5;
    color: #64748b;
    font-family: "Inter", sans-serif;
  `,

  Label: styled.span`
    font-size: 0.75rem;
    font-weight: 600;
    color: #475569;
    font-family: "Inter", sans-serif;
    letter-spacing: 0.2px;

    @media (min-width: 560px) {
      font-size: 0.8rem;
    }
  `,

  AreaBuscaPlaca: styled.div`
    display: flex;
    flex-direction: column;
    margin: 2em auto;
    padding: 24px;
    width: 95%;
    max-width: 500px;
    font-size: 14px;
    border-radius: 14px;
    color: #1e293b;
    background: #fff;
    box-shadow: 0 1px 4px rgba(0, 0, 0, 0.06);
    border: 1px solid #e8eaf0;
    gap: 15px;
    font-family: "Inter", sans-serif;

    @media (min-width: 600px){
      margin: 5em auto;
      padding: 30px 24px;
      width: auto;
    }
  `,

  busca: styled.div`
    display: flex;
    width: 100%;
    border-radius: 8px;
    padding: 5px;
    transition: 0.2s ease;
    align-items: center;
    background: #f8fafc;
    border: 1px solid #e2e8f0;
  `,

  LabelSubtitulo: styled.span`
    font-family: "Inter", sans-serif;
    font-weight: 400;
    color: #64748b;
    word-wrap: break-word;
    font-size: 0.72rem;

    @media (min-width: 560px) {
      font-size: 0.78rem;
    }
  `,

  edit: styled.div`
    margin: 0;
  `,
};
