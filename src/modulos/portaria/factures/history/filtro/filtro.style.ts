import { styled } from "styled-components";

export default  {
  FloatingFilter: styled.div<{ isOpen: boolean }>`
      display: ${({ isOpen }) => (isOpen ? "flex" : "none")};
      position: absolute;
      top: 100%;
      right: 50%;
      width: 320px; 
      background: #ffffff;
      flex-direction: column;
      padding: 20px;
      box-shadow: -5px 10px 25px rgba(0,0,0,0.1);
      border: 1px solid #e2e8f0;
      border-bottom: 4px solid #26a69a;
      border-bottom-left-radius: 12px;
      z-index: 1000;
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
  `

}