import styled from "styled-components";

export default {
  container: styled.div`
    background-color: #f8fafc;
    height: 100vh;
    display: flex;
    flex-direction: column;
    padding: 15px;
    overflow: hidden;
    font-family: 'Inter', sans-serif;
  `,

  Toolbar: styled.div`
    background: #ffffff;
    border-bottom: 1px solid #e2e8f0;
    position: relative;
    z-index: 100;
  `,

  MainBar: styled.div`
    display: flex;
    align-items: center;
    gap: 12px;
    padding: 10px 15px;

    .search-container {
      position: relative;
      flex: 1;
      display: flex;
      align-items: center;
      background: #f1f5f9;
      border-radius: 8px;
      padding: 0 12px;
      border: 1px solid #e2e8f0;
      input {
        border: none;
        background: transparent;
        height: 40px;
        width: 100%;
        outline: none;
        font-weight: 600;
        font-size: 0.85rem;
        color: #1e293b;
      }
      svg { color: #94a3b8; font-size: 20px; }
    }
  `,

  FloatingFilter: styled.div<{ isOpen: boolean }>`
    display: ${({ isOpen }) => (isOpen ? "flex" : "none")};
    position: absolute;
    top: 100%;
    right: 0;
    width: 380px; 
    background: #ffffff;
    flex-direction: column;
    padding: 20px;
    box-shadow: -5px 10px 25px rgba(0,0,0,0.1);
    border: 1px solid #e2e8f0;
    border-top: none;
    border-bottom: 4px solid #26a69a;
    border-bottom-left-radius: 12px;
    z-index: 101;

    @media (max-width: 600px) {
      width: 100%;
      border-bottom-left-radius: 0;
    }

    .filter-grid {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 12px;
    }

    .full-width {
      grid-column: span 2;
    }

    .filter-item {
      display: flex;
      flex-direction: column;
      gap: 5px;
      label { 
        font-size: 10px; 
        font-weight: 800; 
        color: #94a3b8; 
        text-transform: uppercase; 
        letter-spacing: 0.5px;
      }
    }
  `,

  TableContainer: styled.div`
    flex: 1;
    overflow-y: auto;
    background: white;
    scrollbar-width: thin;
    /* &::-webkit-scrollbar { width: 5px; }
    &::-webkit-scrollbar-thumb { background: #e2e8f0; border-radius: 10px; } */
  `,

  Table: styled.table`
    width: 100%;
    border-collapse: collapse;
    
    thead {
      position: sticky;
      top: 0;
      background: #f8fafc;
      z-index: 10;
    }

    th { 
      padding: 12px; 
      font-size: 0.65rem; 
      color: #64748b; 
      text-transform: uppercase; 
      border-bottom: 1px solid #e2e8f0;
      text-align: left;
      font-weight: 700;
    }

    td { 
      padding: 12px; 
      border-bottom: 1px solid #f1f5f9; 
      font-size: 0.8rem;
      color: #1e293b;
    }

    tr:hover { background: #f9fafb; }
  `,

  InputData: styled.input`
    height: 40px;
    padding: 0 10px;
    border-radius: 8px;
    border: 1px solid #e2e8f0;
    background: #f8fafc;
    font-weight: 700;
    color: #334155;
    outline: none;
    font-family: inherit;
    width: 100%;
    cursor: pointer;
  `,

  BtnAction: styled.button`
    background: #26a69a;
    color: white;
    border: none;
    height: 42px;
    border-radius: 8px;
    font-weight: 800;
    text-transform: uppercase;
    cursor: pointer;
    margin-top: 20px;
    font-size: 0.75rem;
    transition: all 0.2s;
    &:hover { background: #1e857b; box-shadow: 0 4px 12px rgba(38, 166, 154, 0.2); }
    &:active { transform: scale(0.98); }
  `,

  Chip: styled.span<{ color: string }>`
    background: ${props => props.color}15;
    color: ${props => props.color};
    padding: 4px 8px;
    border-radius: 4px;
    font-size: 0.65rem;
    font-weight: 800;
    text-transform: uppercase;
  `,

  loadingRow: styled.tr`
    td { text-align: center; padding: 50px; }
  `,

  trBTN: styled.div`
    display: flex;
    justify-content: flex-end;
  `,

  imagemArea: styled.div`
    display: flex;
    gap: 12px;
    flex-wrap: wrap;
    justify-content: center;
  `,

  divArea: styled.div`
    width: 240px;
    border: 1px solid #e2e8f0;
    padding: 10px;
    border-radius: 10px;
  `,

  imgem: styled.img`
    width: 100%;
    height: 180px;
    object-fit: cover;
    border-radius: 6px;
  `,
};