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
    width: 320px; 
    background: #ffffff;
    flex-direction: column;
    padding: 20px;
    box-shadow: -5px 10px 25px rgba(0,0,0,0.1);
    border: 1px solid #e2e8f0;
    border-bottom: 4px solid #26a69a;
    border-bottom-left-radius: 12px;
    z-index: 101;
    gap: 12px;

    .MuiFormControl-root {
      width: 100% !important;
      margin: 0 !important;
    }
  `,

  FilterGroup: styled.div`
    display: flex;
    flex-direction: column;
    gap: 4px;
  `,

  FilterLabel: styled.label`
    font-size: 0.7rem;
    font-weight: 800;
    color: #64748b;
    text-transform: uppercase;
    margin-left: 2px;
  `,

  InputData: styled.input`
    height: 40px;
    border-radius: 8px;
    border: 1px solid #e2e8f0;
    background: #f8fafc;
    width: 100%;
    padding: 0 12px;
    font-family: inherit;
    font-size: 0.85rem;
    color: #1e293b;
    outline: none;
    box-sizing: border-box;
    &:focus { border: 2px solid #26a69a; background: #fff; }
  `,

  TableContainer: styled.div`
    flex: 1;
    overflow: auto;
    background: white;
  `,

  Table: styled.table`
    border-collapse: collapse;
    width: 100%;
    thead { position: sticky; top: 0; background: #f8fafc; z-index: 10; }
    th { 
      position: relative; 
      padding: 12px 10px; 
      font-size: 0.65rem; 
      color: #64748b; 
      text-transform: uppercase; 
      border-bottom: 1px solid #e2e8f0; 
      border-right: 1px solid #f1f5f9; 
      text-align: left;
      font-weight: 800;

      .header-content {
        display: flex;
        align-items: center;
        gap: 6px;
        cursor: pointer;
        user-select: none;
      }
    }
    td { 
      padding: 8px 10px; 
      border-bottom: 1px solid #f1f5f9; 
      border-right: 1px solid #f1f5f9; 
      font-size: 0.78rem; 
      color: #1e293b; 
    }
  `,

  Resizer: styled.div<{ isResizing?: boolean }>`
    position: absolute;
    right: 0;
    top: 0;
    height: 100%;
    width: 5px;
    background: ${props => props.isResizing ? '#26a69a' : 'transparent'};
    cursor: col-resize;
    user-select: none;
    touch-action: none;
    z-index: 2;
    &:hover { background: #26a69a; }
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

  BtnClear: styled.button`
    background: #f1f5f9;
    color: #64748b;
    border: 1px solid #e2e8f0;
    height: 42px;
    border-radius: 8px;
    font-weight: 800;
    cursor: pointer;
    font-size: 0.75rem;
    flex: 1;
    &:hover { background: #e2e8f0; }
  `,

  BtnAction: styled.button`
    background: #26a69a;
    color: white;
    border: none;
    height: 42px;
    border-radius: 8px;
    font-weight: 800;
    cursor: pointer;
    font-size: 0.75rem;
    flex: 1;
    &:hover { background: #1f8a7f; }
  `,

  trBTN: styled.div` display: flex; justify-content: flex-end; `,
  loadingRow: styled.tr` td { text-align: center; padding: 50px; } `,
  imagemArea: styled.div` display: flex; gap: 12px; flex-wrap: wrap; justify-content: center; `,
  divArea: styled.div` width: 240px; border: 1px solid #e2e8f0; padding: 10px; border-radius: 10px; `,
  imgem: styled.img` width: 100%; height: 180px; object-fit: cover; border-radius: 6px; `
};