import styled from "styled-components";

export default {
  container: styled.div`
    background-color: #f8f9fc;
    height: 100vh;
    display: flex;
    flex-direction: column;
    padding: 20px 24px;
    overflow: hidden;
    font-family: 'Inter', sans-serif;
  `,

  Header: styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 16px;
  `,

  HeaderLeft: styled.div`
    display: flex;
    flex-direction: column;
    gap: 2px;
    h1 {
      font-size: 1.4rem;
      font-weight: 800;
      color: #1a1a2e;
      margin: 0;
    }
    span {
      font-size: 0.78rem;
      color: #8e8ea0;
      font-weight: 500;
    }
  `,

  BtnNovo: styled.button`
    display: flex;
    align-items: center;
    gap: 6px;
    background: #4f46e5;
    color: white;
    border: none;
    padding: 10px 20px;
    border-radius: 8px;
    font-weight: 700;
    font-size: 0.85rem;
    cursor: pointer;
    transition: background 0.2s;
    &:hover { background: #4338ca; }
  `,

  Toolbar: styled.div`
    background: #ffffff;
    border-bottom: 1px solid #e8e8ef;
    position: relative;
    z-index: 100;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 12px 16px;
    gap: 12px;
    border-top-left-radius: 12px;
    border-top-right-radius: 12px;
  `,

  SearchContainer: styled.div`
    position: relative;
    flex: 1;
    display: flex;
    align-items: center;
    background: #f8f9fc;
    border-radius: 8px;
    padding: 0 12px;
    border: 1px solid #e8e8ef;
    input {
      border: none;
      background: transparent;
      height: 40px;
      width: 100%;
      outline: none;
      font-weight: 500;
      font-size: 0.85rem;
      color: #1a1a2e;
      margin-left: 8px;
      &::placeholder { color: #a0a0b8; }
    }
    svg { color: #a0a0b8; font-size: 20px; }
  `,

  BtnFiltros: styled.button<{ isOpen?: boolean }>`
    display: flex;
    align-items: center;
    gap: 6px;
    background: ${({ isOpen }) => (isOpen ? '#4f46e5' : '#f8f9fc')};
    color: ${({ isOpen }) => (isOpen ? 'white' : '#6b6b80')};
    border: 1px solid ${({ isOpen }) => (isOpen ? '#4f46e5' : '#e8e8ef')};
    padding: 8px 16px;
    border-radius: 8px;
    font-weight: 600;
    font-size: 0.82rem;
    cursor: pointer;
    transition: all 0.2s;
    &:hover { border-color: #4f46e5; color: ${({ isOpen }) => (isOpen ? 'white' : '#4f46e5')}; }
  `,

  FloatingFilter: styled.div<{ isOpen: boolean }>`
    display: ${({ isOpen }) => (isOpen ? "flex" : "none")};
    position: absolute;
    top: 100%;
    right: 16px;
    width: 320px;
    background: #ffffff;
    flex-direction: column;
    padding: 20px;
    box-shadow: 0 10px 40px rgba(0,0,0,0.12);
    border: 1px solid #e8e8ef;
    border-radius: 12px;
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
    color: #6b6b80;
    text-transform: uppercase;
    margin-left: 2px;
  `,

  InputData: styled.input`
    height: 40px;
    border-radius: 8px;
    border: 1px solid #e8e8ef;
    background: #f8f9fc;
    width: 100%;
    padding: 0 12px;
    font-family: inherit;
    font-size: 0.85rem;
    color: #1a1a2e;
    outline: none;
    box-sizing: border-box;
    &:focus { border: 2px solid #4f46e5; background: #fff; }
  `,

  TableContainer: styled.div`
    flex: 1;
    overflow: auto;
    background: white;
  `,

  Table: styled.table`
    border-collapse: collapse;
    width: 100%;

    thead {
      position: sticky;
      top: 0;
      background: #ffffff;
      z-index: 10;
    }

    th {
      position: relative;
      padding: 14px 16px;
      font-size: 0.7rem;
      color: #8e8ea0;
      text-transform: uppercase;
      border-bottom: 1px solid #e8e8ef;
      text-align: left;
      font-weight: 700;
      letter-spacing: 0.3px;
      white-space: nowrap;

      .header-content {
        display: flex;
        align-items: center;
        gap: 4px;
        cursor: pointer;
        user-select: none;
      }
    }

    td {
      padding: 14px 16px;
      border-bottom: 1px solid #f2f2f8;
      font-size: 0.82rem;
      color: #1a1a2e;
    }

    tbody tr {
      transition: background 0.15s;
      &:hover { background: #f8f9fc; }
    }
  `,

  Resizer: styled.div<{ isResizing?: boolean }>`
    position: absolute;
    right: 0;
    top: 0;
    height: 100%;
    width: 4px;
    background: ${props => props.isResizing ? '#4f46e5' : 'transparent'};
    cursor: col-resize;
    user-select: none;
    touch-action: none;
    z-index: 2;
    &:hover { background: #4f46e5; }
  `,

  StatusBadge: styled.span<{ color: string }>`
    display: inline-flex;
    align-items: center;
    background: ${props => props.color};
    color: white;
    padding: 4px 12px;
    border-radius: 20px;
    font-size: 0.7rem;
    font-weight: 700;
  `,

  PriorityDot: styled.span<{ color: string }>`
    display: inline-flex;
    align-items: center;
    gap: 6px;
    font-size: 0.82rem;
    color: #1a1a2e;
    &::before {
      content: '';
      width: 8px;
      height: 8px;
      border-radius: 50%;
      background: ${props => props.color};
    }
  `,

  Chip: styled.span<{ color: string }>`
    background: ${props => props.color}15;
    color: ${props => props.color};
    padding: 4px 10px;
    border-radius: 4px;
    font-size: 0.65rem;
    font-weight: 800;
    text-transform: uppercase;
  `,

  BtnClear: styled.button`
    background: #f8f9fc;
    color: #6b6b80;
    border: 1px solid #e8e8ef;
    height: 42px;
    border-radius: 8px;
    font-weight: 700;
    cursor: pointer;
    font-size: 0.78rem;
    flex: 1;
    &:hover { background: #e8e8ef; }
  `,

  BtnAction: styled.button`
    background: #4f46e5;
    color: white;
    border: none;
    height: 42px;
    border-radius: 8px;
    font-weight: 700;
    cursor: pointer;
    font-size: 0.78rem;
    flex: 1;
    &:hover { background: #4338ca; }
  `,

  Footer: styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 12px 16px;
    border-top: 1px solid #e8e8ef;
    background: #fff;
    border-bottom-left-radius: 12px;
    border-bottom-right-radius: 12px;
  `,

  FooterInfo: styled.div`
    display: flex;
    align-items: center;
    gap: 8px;
    font-size: 0.78rem;
    color: #8e8ea0;
    font-weight: 500;

    select {
      border: 1px solid #e8e8ef;
      border-radius: 6px;
      padding: 4px 8px;
      font-size: 0.78rem;
      color: #1a1a2e;
      background: #fff;
      outline: none;
      cursor: pointer;
    }
  `,

  CreatorCell: styled.div`
    display: flex;
    align-items: center;
    gap: 8px;
  `,

  CreatorAvatar: styled.div<{ color?: string }>`
    width: 28px;
    height: 28px;
    border-radius: 50%;
    background: ${props => props.color || '#4f46e5'};
    color: white;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 0.65rem;
    font-weight: 800;
  `,

  MainBar: styled.div`
    display: flex;
    align-items: center;
    gap: 12px;
    width: 100%;
  `,

  trBTN: styled.div`
    display: flex;
    justify-content: flex-end;
  `,

  loadingRow: styled.tr`
    td { text-align: center; padding: 50px; }
  `,

  imagemArea: styled.div`
    display: flex;
    gap: 12px;
    flex-wrap: wrap;
    justify-content: center;
  `,

  divArea: styled.div`
    width: 240px;
    border: 1px solid #e8e8ef;
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
