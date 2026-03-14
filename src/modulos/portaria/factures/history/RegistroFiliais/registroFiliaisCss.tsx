import { MdInbox } from "react-icons/md";
import styled from "styled-components";

interface CamposProps {
    hasError?: boolean;
}

type colorProps = {
    color: string;
}

// Interface para controlar o tamanho/densidade da tabela
interface TableProps {
    density?: 'compact' | 'standard';
}

const Styles = {
    container: styled.div`
        min-height: 100vh;
        display: flex;
        flex-direction: column;
        gap: 20px;
        padding: 24px 40px;
        background-color: #f8fafc;
        width: 100%;
        box-sizing: border-box;

        @media (max-width: 768px) {
            padding: 16px;
            gap: 15px;
        }
    `,

    titulo: styled.h1`
        font-size: 1.5rem;
        font-weight: 700;
        color: #1e293b;
        letter-spacing: -0.025em;
        margin: 0;
    `,

    FormSub: styled.div`
        width: 100%;
        display: flex;
        flex-direction: column;
        gap: 15px;
        background: #ffffff;
        padding: 20px 0;
        border-radius: 12px;
    `,

    // --- NOVA LÓGICA DE TABELA E SCROLL ---
    TableContainer: styled.div`
        width: 100%;
        overflow-x: auto; /* Scroll horizontal se a tabela for larga */
        overflow-y: auto; /* Scroll vertical interno */
        max-height: 70vh; /* Define altura para o scroll vertical funcionar */
        border: 1px solid #e2e8f0;
        border-radius: 12px;
        background: #fff;
        position: relative;

        /* Personalização da barra de scroll */
        &::-webkit-scrollbar {
            width: 8px;
            height: 8px;
        }
        &::-webkit-scrollbar-thumb {
            background: #cbd5e1;
            border-radius: 10px;
        }
        &::-webkit-scrollbar-track {
            background: #f1f5f9;
        }
    `,

    Table: styled.table<TableProps>`
        width: 100%;
        border-collapse: separate; /* Necessário para o sticky header não "vazar" border */
        border-spacing: 0;
        font-family: "Inter", sans-serif;
        min-width: 1100px; /* Garante que os dados não fiquem espremidos */

        thead {
            position: sticky;
            top: 0;
            z-index: 10;
            background-color: #f8fafc;
        }

        th {
            /* Padding e fonte mudam conforme a densidade escolhida no header */
            padding: ${({ density }) => (density === 'compact' ? '8px 12px' : '14px 16px')};
            font-size: ${({ density }) => (density === 'compact' ? '0.65rem' : '0.7rem')};
            font-weight: 700;
            color: #64748b;
            text-transform: uppercase;
            border-bottom: 2px solid #e2e8f0;
            text-align: left;
            white-space: nowrap;
        }

        td {
            padding: ${({ density }) => (density === 'compact' ? '6px 12px' : '12px 16px')};
            font-size: ${({ density }) => (density === 'compact' ? '0.75rem' : '0.85rem')};
            color: #334155;
            border-bottom: 1px solid #f1f5f9;
            vertical-align: middle;
            white-space: nowrap; 
        }

        tbody tr:hover {
            background-color: #f8fafc;
        }
    `,

    ActionCell: styled.div`
        display: flex;
        gap: 4px;
        align-items: center;
        justify-content: flex-start;
    `,

    Chip: styled.div<colorProps>`
        display: inline-flex;
        align-items: center;
        padding: 4px 10px;
        border-radius: 6px;
        font-size: 0.7rem;
        font-weight: 700;
        text-transform: uppercase;
        background-color: ${({ color }) => color + '15'}; 
        color: ${({ color }) => color};
        border: 1px solid ${({ color }) => color + '30'};
        white-space: nowrap;
    `,

    loadingRow: styled.tr`
        td {
            padding: 40px 0;
            text-align: center;
            border-bottom: none;
        }
    `,

    loadingContainer: styled.div`
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 12px;
        color: #64748b;
    `,

    visitante: styled.div`
        display: flex;
        align-items: center;
        gap: 15px;
        padding: 15px;
        border-bottom: 1px solid #e2e8f0;
        h5 { margin: 0; color: #1e293b; font-size: 1.1rem; }
    `,

    imgemVisitante: styled.img`
        width: 60px;
        height: 60px;
        border-radius: 50%;
        object-fit: cover;
        border: 2px solid #6366f1;
    `,

    imagemArea: styled.div`
        display: flex;
        gap: 20px;
        padding: 20px;
        overflow-y: auto;
        max-height: 500px;
        @media (max-width: 768px) {
            flex-direction: column;
            max-height: 70vh;
        }
    `,

    divArea: styled.div`
        flex: 1;
        display: flex;
        flex-direction: column;
        gap: 10px;
        background: #f8fafc;
        padding: 15px;
        border-radius: 12px;
        border: 1px solid #e2e8f0;
        position: relative;
    `,

    imgem: styled.img`
        width: 100%;
        height: 220px;
        object-fit: cover;
        border-radius: 8px;
    `,

    erro: styled.div`
        width: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
        padding: 50px 0;
    `,

    semItens: styled.div`
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 12px;
        color: #94a3b8;
        padding: 40px 0;
    `,

    iconSemItens: styled(MdInbox)`
        font-size: 64px;
        color: #cbd5e1;
    `,

    Campos: styled.input<CamposProps>`
        width: 100%;
        height: 38px;
        border-radius: 8px;
        border: 1px solid ${({ hasError }) => (hasError ? '#ef4444' : '#e2e8f0')};
        padding: 8px 12px;
        box-sizing: border-box;
        &:focus {
            outline: none;
            border-color: #6366f1;
        }
    `
};

export default Styles;