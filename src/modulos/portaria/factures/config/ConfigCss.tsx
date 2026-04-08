import styled from "styled-components";

export default {
  container: styled.main`
    display: flex;
    flex-direction: column;
    min-height: 100vh;
    background: #f1f5f9;
    font-family: "Inter", -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
  `,

  container_int: styled.div`
    flex: 1;
    width: 100%;
    padding: 20px 16px;

    @media (min-width: 768px) {
      padding: 20px 24px;
    }
  `,

  placeholder: styled.div`
    display: flex;
    width: 100%;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 55vh;
    gap: 8px;

    h2 {
      font-size: 20px;
      font-weight: 600;
      color: #1e293b;
      font-family: "Inter", sans-serif;
    }

    p {
      font-size: 14px;
      color: #64748b;
      font-family: "Inter", sans-serif;
    }
  `,
}
