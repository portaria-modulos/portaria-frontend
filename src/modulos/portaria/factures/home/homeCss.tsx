
import styled from "styled-components";

export default {
  container: styled.main`
    position: relative;
    `,
  Container_int: styled.main`
      @media screen and (max-width: 560px) {
        padding: 0;
      }
     `,
  PlaceholderContainer: styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: flex-start;
    min-height: 80vh;
    margin-top: 6em;
    text-align: center;
    color: #333;
    border-radius: 16px;
    width: 100%;
    .emoji {
      font-size: 64px;
      margin-bottom: 20px;
    }
    .title {
      font-size: 30px;
      margin-bottom: 8px;
      color: #1a237e;
      font-weight: 800;
      letter-spacing: 0.5px;
    }
    .description {
      font-size: 17px;
      max-width: 500px;
      color: #555;
      margin-bottom: 32px;
    }
  `,

  ModulesGrid: styled.div`
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
    gap: 32px;
    width: 100%;
    max-width: 900px;
    margin: 0 auto;
    margin-top: 24px;
    padding-bottom: 40px;
  `,

  ModuleCard: styled.div`
    background: #fff;
    border-radius: 16px;
    box-shadow: 0 4px 24px rgba(161, 114, 114, 0.10);
    padding: 32px 18px 22px 18px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 12px;
    transition: box-shadow 0.2s, transform 0.2s;
    cursor: pointer;
    border: 1.5px solid #f3eaea;
    &:hover {
      box-shadow: 0 8px 32px rgba(161, 114, 114, 0.18);
      transform: translateY(-4px) scale(1.03);
      border-color: #e2d6d6;
    }
    .module-title {
      font-size: 1.18rem;
      font-weight: 700;
      color: #a17272;
      margin-bottom: 6px;
    }
    .module-list {
      display: flex;
      flex-direction: column;
      gap: 8px;
      width: 100%;
    }
    .module-link {
      color: #333;
      background: #f8f8f8;
      border-radius: 8px;
      padding: 8px 0;
      text-decoration: none;
      font-size: 1rem;
      font-weight: 500;
      transition: background 0.18s, color 0.18s;
      &:hover {
        background: #f3eaea;
        color: #a17272;
      }
    }
  `
}