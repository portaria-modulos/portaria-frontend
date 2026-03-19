import type { ReactNode } from "react"
import { BtnLogin } from "./btnGlobalCss"

type props = {
    titulo?: string,
    nome_btn?: string,
    click: () => void,
    isvalid: boolean,
    children?: ReactNode,
    typeBtn?: "admin" | "default" | "code" // Nova prop para fixar o estilo
}

export const BtnGlobal = (prop: props) => {
    return (
        <BtnLogin 
            onClick={prop.click} // Sempre deixa clicar para o usuário ver o erro
            // Se você quer que a cor seja fixa, use prop.typeBtn. 
            // Se quer que mude conforme o formulário, mantenha a lógica abaixo:
            global={prop.isvalid ? (prop.typeBtn || "admin") : "code"} 
        >
            {prop?.titulo} 
            {prop.children}
        </BtnLogin>
    )
}