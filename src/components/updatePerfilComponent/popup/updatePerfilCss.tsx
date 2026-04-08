import styled from "styled-components";

export default {
  container: styled.div`
    position: fixed;
    width: 100vw;
    height: 100vh;
    z-index: 10;
    top: 0;
    left: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: rgba(0, 0, 0, 0.55);
  `,

  container_int: styled.section`
    width: 410px;
    min-height: 240px;
    background-color: #fff;
    box-shadow: 0 8px 32px rgba(161, 114, 114, 0.13);
    border-radius: 16px;
    display: flex;
    flex-direction: column;
    padding: 28px 24px 20px 24px;
    position: relative;
    gap: 10px;
  `,

  header: styled.div`
    display: flex;
    width: 100%;
    justify-content: flex-end;
  `,

  content: styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    flex: 1;
    text-align: center;
    gap: 18px;
  `,

  buttons: styled.div`
    display: flex;
    gap: 24px;
    margin-top: 36px;
    justify-content: center;
  `,
  SelectItens: styled.select`
    width: 100%;
    height: 42px;
    border: 1.5px solid #d6d6d6;
    background-color: #f8f8f8;
    border-radius: 8px;
    font-size: 1rem;
    padding: 0 10px;
    margin-top: 8px;
    color: #333;
    transition: border 0.2s;
    &:focus {
      border-color: #a17272;
      outline: none;
    }
  `,
  Options: styled.option``,

};
