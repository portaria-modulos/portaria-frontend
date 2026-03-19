import styled from "styled-components";

export default {
  TableContainer: styled.div`
        width: 100%;
        overflow-x: auto;
        background: #fff;
    `,

  Table: styled.table`
        width: 100%;
        border-collapse: collapse;
        font-family: 'Inter', -apple-system, sans-serif;

        th {
            background-color: #f8fafc;
            padding: 14px 20px;
            text-align: left;
            font-size: 0.7rem;
            text-transform: uppercase;
            letter-spacing: 0.05em;
            color: #64748b;
            font-weight: 700;
            border-bottom: 2px solid #f1f5f9;
        }

        td {
            padding: 12px 20px;
            font-size: 0.875rem;
            color: #334155;
            border-bottom: 1px solid #f1f5f9;
            vertical-align: middle;
        }

        tr:hover {
            background-color: #f8fafc;
            transition: background-color 0.15s ease;
        }
    `,

  TextPrimary: styled.span`
        display: block;
        font-weight: 600;
        color: #1e293b;
        font-size: 0.9rem;
    `,

  TextSecondary: styled.span`
        display: block;
        font-size: 0.72rem; // Telefone bem pequeno e discreto
        color: #94a3b8;
        margin-top: 2px;
    `,

  Badge: styled.span<{ ativo: boolean }>`
        padding: 4px 5px;
        border-radius: 20px;
        font-size: 0.7rem;
        font-weight: 700;
        text-transform: uppercase;
        background-color: ${({ ativo }) => (ativo ? "#dcfce7" : "#fee2e2")};
        color: ${({ ativo }) => (ativo ? "#15803d" : "#b91c1c")};
        display: inline-block;
    `,
  tr: styled.tr<{ ativo: boolean }>`
               background-color: ${({ ativo }) => (ativo ? "" : "#ffeeee")};

    `,

  trBTN: styled.div`
        display: flex;
        justify-content: flex-end;
        gap: 6px;
    `,

  LoadingArea: styled.div`
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        padding: 80px 20px;
        gap: 15px;
        color: #64748b;

        .loader {
            width: 35px;
            height: 35px;
            border: 3px solid #e2e8f0;
            border-top: 3px solid #2563eb;
            border-radius: 50%;
            animation: rotate 0.8s linear infinite;
        }

        @keyframes rotate {
            from { transform: rotate(0deg); }
            to { transform: rotate(360deg); }
        }
    `
};