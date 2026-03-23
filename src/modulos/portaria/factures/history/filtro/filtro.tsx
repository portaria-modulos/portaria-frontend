import { Stack } from "@mui/material";
import SelectVariants from "../../../../../components/select/selectFiltro";
import Template from "./filtro.style"
import { useEffect, useState } from "react";
import apiUsuario from "../../../../PaginaInicial/service/apiUsuario";
import { subjet } from "../../../../../jwt/jwtservice";
type props = {
    selectedFilial:any,
    setSelectedFilial:(n:any)=>void,
    showFilters:any,
    setStatusAberto:(n:any)=>void,
    onSubmit:()=>void,
    setBusca:(n:any)=>void
}
export const Filtro = ({
    selectedFilial,
    setSelectedFilial,
    showFilters,
     setStatusAberto,
    onSubmit,
    setBusca
}:props) => {
    const [filiais,setFiliais]=useState([])
    const user = subjet();

    useEffect(() => {
        apiUsuario.FiliaisUsuario(user?.id).then(res => { if (res?.acess) setFiliais(res.acess); });
    }, [user?.id]);
    return (
        <Template.FloatingFilter isOpen={showFilters}>
            <Template.FilterGroup>
                <Template.FilterLabel>Filial de Origem</Template.FilterLabel>
                <SelectVariants value={selectedFilial} onChange={setSelectedFilial} list={filiais} titulo={undefined} />
            </Template.FilterGroup>
            <Stack direction="row" spacing={1} sx={{ mt: 1 }}>
                <Template.BtnClear onClick={() => { setBusca(""); setStatusAberto(null); }}>Limpar</Template.BtnClear>
                <Template.BtnAction onClick={() => onSubmit()}>Filtrar</Template.BtnAction>
            </Stack>
        </Template.FloatingFilter>
    )
}