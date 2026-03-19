import styled from "styled-components";

interface CamposProps {
  hasError?: boolean;
}

export const Container = styled.section`
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  background-color: #f8fafc; // Fundo levemente acinzentado (Clean)
  font-family: 'Inter', -apple-system, sans-serif;
`;

export const Form = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  max-width: 420px;
  background: #ffffff;
  padding: 48px 40px;
  border-radius: 16px;
  box-shadow: 0 10px 25px -5px rgba(0, 0, 0, 0.05), 0 8px 10px -6px rgba(0, 0, 0, 0.05);

  @media (max-width: 480px) {
    padding: 32px 24px;
    box-shadow: none;
    background: transparent;
  }
`;

// Substitui a logo de imagem por Texto Estilizado
export const LogoText = styled.h1`
  font-size: 1.75rem;
  font-weight: 800;
  color: #1e293b;
  letter-spacing: -0.025em;
  margin-bottom: 8px;
  text-align: center;

  span {
    color: #5B7FFF; // Destaque na cor principal
  }
`;

export const Subtitle = styled.p`
  font-size: 0.875rem;
  color: #64748b;
  text-align: center;
  margin-bottom: 32px;
`;

export const FormSub = styled.form`
  display: flex;
  flex-direction: column;
  gap: 24px; // Espaçamento maior entre campos (UX)
`;

export const Select = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  position: relative;
`;

export const Label = styled.label`
  font-size: 0.875rem;
  font-weight: 600;
  color: #334155;
`;

export const InputWrapper = styled.div<{ hasError?: boolean }>`
  display: flex;
  align-items: center;
  border: 1px solid ${({ hasError }) => (hasError ? '#ef4444' : '#e2e8f0')};
  border-radius: 8px;
  background-color: #fcfdfe;
  transition: all 0.2s ease;
  padding-right: 8px;

  &:focus-within {
    border-color: #5B7FFF;
    box-shadow: 0 0 0 4px rgba(91, 127, 255, 0.1);
    background-color: #fff;
  }
`;

export const Campos = styled.input`
  width: 100%;
  height: 46px;
  padding: 0 16px;
  border: none;
  background: transparent;
  font-size: 0.95rem;
  color: #1e293b;
  outline: none;

  &::placeholder {
    color: #94a3b8;
  }
`;

export const Password = styled(Campos)``; // Reaproveita estilos

export const Erros = styled.span`
  color: #ef4444;
  font-size: 0.75rem;
  font-weight: 500;
  margin-top: 4px;
`;

export const Foooter = styled.footer`
  position: absolute;
  bottom: 24px;
  font-size: 0.75rem;
  color: #94a3b8;
  letter-spacing: 0.05em;
  text-transform: uppercase;
`;