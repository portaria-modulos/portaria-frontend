import styled from "styled-components";

const Template = {
  FilterArea: styled.div`
    display: flex;
    align-items: center;
    width: 100%;
    margin-bottom: 20px;
    padding: 10px 0;

    @media (min-width: 768px) {
      width: auto;
      margin-bottom: 0;
    }
  `,

  SelectGroup: styled.div`
    display: flex;
    flex-direction: column;
    gap: 5px;
    width: 100%;
  `,

  Label: styled.label`
    font-size: 0.82rem;
    font-weight: 500;
    color: #64748b;
    font-family: "Inter", sans-serif;
    letter-spacing: 0.2px;
  `,

  Select: styled.select`
    width: 100%;
    height: 44px;
    padding: 0 12px;
    border-radius: 8px;
    border: 1px solid #d1d5db;
    background: #fff;
    font-size: 16px;
    font-family: "Inter", sans-serif;
    color: #334155;
    outline: none;
    transition: all 0.2s ease;
    cursor: pointer;

    &::placeholder {
      color: #94a3b8;
    }

    &:focus {
      border-color: #6366f1;
      background: #fff;
      box-shadow: 0 0 0 3px rgba(99, 102, 241, 0.1);
    }

    @media (min-width: 768px) {
      height: 42px;
      font-size: 14px;
      min-width: 280px;
    }
  `,

  Container: styled.div`
    width: 100%;
    max-width: 1100px;
    margin: 0 auto;
    padding: 0 15px;
  `,
};

export default Template;
