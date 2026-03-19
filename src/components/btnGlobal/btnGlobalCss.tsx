import styled from "styled-components";

type LoginType = "code" | "admin" | "default";

type Props = {
  global: LoginType;
};

const loginStyles: Record<LoginType, { bg: string; color: string; border?: string }> = {
  code: {
    bg: "#f1f5f9", 
    color: "#64748b",
    border: "#e2e8f0"
  },
  admin: {
    bg: "#dc2626", // Vermelho mais fechado, menos "aceso"
    color: "#fff",
  },
  default: {
    bg: "#2563eb", // Azul royal mais elegante
    color: "#fff",
  },
};

export const BtnLogin = styled.button<Props>`
  margin: 4px 0;
  width: 100%;
  height: 34px; /* Voltamos para a altura slim que você prefere */
  border: ${({ global }) => loginStyles[global]?.border ? `1px solid ${loginStyles[global].border}` : '0'};
  border-radius: 6px; /* Arredondado sutil, mais profissional */
  padding: 0 12px;
  font-family: 'Inter', sans-serif;
  font-size: 12px;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.3px;
  transition: all 0.2s ease;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  
  background-color: ${({ global }) => loginStyles[global]?.bg ?? loginStyles.default.bg};
  color: ${({ global }) => loginStyles[global]?.color ?? loginStyles.default.color};

  &:hover {
    filter: brightness(0.92); /* Escurece levemente sem mudar a cor na mão */
  }

  &:active {
    transform: scale(0.97); /* Feedback de clique discreto */
    filter: brightness(0.85);
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;