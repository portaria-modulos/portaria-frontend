import styled from "styled-components";

export default {
    container: styled.div`
        min-height: 100vh;
        display: flex;
        flex-direction: column;
        gap: 20px;
        padding: 24px 40px;
        background-color: #f1f5f9; // Tom levemente mais frio para contraste
        width: 100%;

        @media (max-width: 768px) {
            padding: 15px;
        }
    `,

    FormSub: styled.div`
        width: 100%;
        display: flex;
        flex-direction: column;
        background: #ffffff;
        border-radius: 12px;
        box-shadow: 0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1);
        overflow: hidden; // Garante que a tabela não escape do border-radius
    `,
    // ... (mantenha os outros estilos que já fizemos)

    // Botão de Busca (Padrão Clean/Prime)
    ButtonBusca: styled.button`
        display: flex;
        align-items: center;
        justify-content: center;
        background-color: #f1f5f9;
        color: #475569;
        height: 42px;
        padding: 0 16px;
        border-radius: 8px;
        font-weight: 600;
        font-size: 0.875rem;
        border: 1px solid #e2e8f0;
        cursor: pointer;
        transition: all 0.2s;

        &:hover {
            background-color: #e2e8f0;
            color: #1e293b;
        }

        &:active {
            transform: scale(0.95);
        }
    `,

    // Ajuste no Wrapper para alinhar Input + Botão de Busca
    SearchGroup: styled.div`
        display: flex;
        gap: 8px;
        flex: 1;
        max-width: 550px;
        width: 100%;
    `,

    // Novo Header que agrupa Busca e Ações
    HeaderTable: styled.div`
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 20px;
        border-bottom: 1px solid #e2e8f0;
        flex-wrap: wrap;
        gap: 16px;
    `,

    InputWrapper: styled.div`
        position: relative;
        display: flex;
        align-items: center;
        max-width: 450px;
        width: 100%;

        &::before {
            content: "🔍";
            position: absolute;
            left: 12px;
            font-size: 14px;
            color: #94a3b8;
        }
    `,

    Campos: styled.input`
        width: 100%;
        height: 42px;
        background-color: #f8fafc;
        border-radius: 8px;
        border: 1px solid #e2e8f0;
        padding: 0 16px 0 40px; // Espaço para o ícone
        font-size: 0.875rem;
        transition: all 0.2s ease-in-out;

        &:focus {
            outline: none;
            background-color: #fff;
            border-color: #3b82f6;
            box-shadow: 0 0 0 4px rgba(59, 130, 246, 0.1);
        }
    `,

    ButtonNovo: styled.button`
        display: flex;
        align-items: center;
        gap: 8px;
        background-color: #2563eb;
        color: white;
        padding: 10px 20px;
        border-radius: 8px;
        font-weight: 600;
        font-size: 0.875rem;
        border: none;
        cursor: pointer;
        transition: background 0.2s;

        &:hover {
            background-color: #1d4ed8;
        }

        &:active {
            transform: scale(0.98);
        }
    `,

    // Área inferior para paginação
    FooterTable: styled.div`
        display: flex;
        justify-content: flex-end;
        padding: 16px 20px;
        border-top: 1px solid #e2e8f0;
        background-color: #fcfcfc;
    `,

    titulo: styled.h1`
        font-size: 1.25rem;
        font-weight: 700;
        color: #0f172a;
        margin: 0;
    `
};