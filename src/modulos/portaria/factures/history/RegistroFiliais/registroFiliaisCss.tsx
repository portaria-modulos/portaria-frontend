import { MdInbox } from "react-icons/md";
import styled from "styled-components";

type colorProps = { color: string; }

const Styles = {
    container: styled.div`
        min-height: 100vh;
        display: flex;
        flex-direction: column;
        gap: 20px;
        padding: 24px 10px;
        background-color: #f4f7f6; 
        width: 100%;
        box-sizing: border-box;
        font-family: 'Inter', sans-serif;
    `,
    FormSub: styled.div`
        width: 100%;
        background: #ffffff;
        border-radius: 12px;
        border: 1px solid #e6eeec;
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.03);
    `,
    CamposInput: styled.div`
        display: flex;
        align-items: center;
        gap: 12px;
        padding: 16px 20px;
        border-bottom: 1px solid #f0f4f3;
        .search-container {
            position: relative;
            display: flex;
            align-items: center;
            input {
                width: 280px;
                height: 38px;
                padding: 0 12px 0 40px;
                border-radius: 8px;
                border: 1.5px solid #d1dbd9;
                font-size: 0.85rem;
                outline: none;
                &:focus { border-color: #26a69a; }
            }
            svg {
                position: absolute;
                left: 12px;
                color: #26a69a;
                font-size: 18px;
            }
        }
    `,
    TableContainer: styled.div`
        width: 100%;
        overflow-x: auto;
        transform: rotateX(180deg); 
        /* &::-webkit-scrollbar { height: 6px; }
        &::-webkit-scrollbar-thumb { background: #cbd5e1; border-radius: 10px; } */
    `,
    Table: styled.table`
        width: 100%;
        border-collapse: collapse;
        min-width: 1300px; 
        transform: rotateX(180deg); 
        thead { background-color: #fbfdfc; }
        th {
            padding: 12px 16px;
            font-size: 0.65rem;
            font-weight: 800;
            color: #b0c2be;
            text-align: left;
            text-transform: uppercase;
            letter-spacing: 0.05em;
            border-bottom: 2px solid #f0f4f3;
        }
        td {
            padding: 12px 16px;
            font-size: 0.8rem;
            font-weight: 600;
            color: #2f3d39;
            border-bottom: 1px solid #f0f4f3;
        }
        tbody tr:hover { background-color: #f1f8f7; }
    `,
    Chip: styled.div<colorProps>`
        display: inline-flex;
        align-items: center;
        gap: 6px;
        padding: 4px 10px;
        border-radius: 6px;
        font-size: 0.65rem;
        font-weight: 800;
        background-color: ${({ color }) => color + '15'}; 
        color: ${({ color }) => color};
        border: 1px solid ${({ color }) => color + '20'};
        &::before {
            content: '';
            width: 5px;
            height: 5px;
            border-radius: 50%;
            background-color: ${({ color }) => color};
        }
    `,
    trBTN: styled.div` display: flex; justify-content: flex-end; `,
    loadingRow: styled.tr` td { padding: 40px; text-align: center; } `,
    loadingContainer: styled.div` display: flex; flex-direction: column; align-items: center; gap: 10px; color: #26a69a; `,
    semItens: styled.div` display: flex; flex-direction: column; align-items: center; padding: 40px; color: #b0c2be; `,
    iconSemItens: styled(MdInbox)` font-size: 40px; `,
    imagemArea: styled.div` 
        display: flex; 
        gap: 20px; 
        padding: 10px; 
        width: 100%; 
        max-width: 800px;
    `,
    divArea: styled.div` 
        flex: 1; 
        padding: 12px; 
        border: 1px solid #e6eeec; 
        border-radius: 12px; 
        background: #fbfdfc;
    `,
    imgem: styled.img` 
        width: 100%; 
        height: 250px; 
        object-fit: cover; 
        border-radius: 8px; 
        border: 1px solid #f0f4f3;
    `
};

export default Styles;