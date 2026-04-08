import { useState } from "react";
import Template from "./Dashboard.css";

interface Props {
    listaFiliais: any[],
    carregarDadosLogistico: (n: any) => void,
    filialUsuario: any
}

export function FiltroFIlialUsuario({ listaFiliais, carregarDadosLogistico, filialUsuario }: Props) {
    const [selected, setSelected] = useState<string>(filialUsuario ? String(filialUsuario) : "");

    const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const valor = e.target.value;
        setSelected(valor);
        carregarDadosLogistico(valor);
    };

    return (
        <Template.FilterArea>
            <Template.SelectGroup>
                <Template.Label>Portaria Filial</Template.Label>
                <Template.Select
                    value={selected}
                    onChange={handleChange}
                >
                    <option value="">Selecione uma Filial</option>
                    {listaFiliais.map((f, i) => (
                        <option key={i} value={String(f?.filial)}>
                            {f?.filial} - {f?.nome}
                        </option>
                    ))}
                </Template.Select>
            </Template.SelectGroup>
        </Template.FilterArea>
    );
}