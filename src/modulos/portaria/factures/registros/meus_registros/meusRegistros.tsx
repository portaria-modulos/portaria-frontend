import { useEffect, useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import Template from "./meuRegistrosCs";
import Api from "../../../service/api_secundaria";
import { ItensRegistro } from "../../../../../components/ItensRegistro/itensRegistro";
import { subjetUsuarioId } from "../../../../../jwt/jwtservice";
import SearchIcon from "@mui/icons-material/Search";
import FilterListIcon from "@mui/icons-material/FilterList";
import CloseIcon from "@mui/icons-material/Close";
import { LoadingSecundary } from "../../../../../components/LoadingSecundary/LoadingSecundary";
import { SearchCodeIcon } from "lucide-react";

export const MeusRegistroComponets = () => {
    const usuario = subjetUsuarioId();
    const navigate = useNavigate();

    const [lista, setLista] = useState<any[]>([]);
    const [loading, setLoading] = useState(false);
    const [showFilters, setShowFilters] = useState(false); 

    const [busca, setBusca] = useState("");
    const [status, setStatus] = useState("TODOS");
    const [dataFiltro, setDataFiltro] = useState("");

    const carregarListaOriginal = async () => {
        if (!usuario) return;
        setLoading(true);
        try {
            const resposta = await Api.solitacaoAutorizador(usuario as any, "");
            if (resposta?.content) setLista(resposta.content);
        } finally {
            setLoading(false);
            setShowFilters(false); 
        }
    };

    useEffect(() => { carregarListaOriginal(); }, [usuario]);

    const listaFiltrada = useMemo(() => {
        return lista.filter(item => {
            const searchLower = busca.toLowerCase();
            const bateBusca = item?.placaVeiculo?.toLowerCase().includes(searchLower) ||
                item?.nomeCompleto?.toLowerCase().includes(searchLower);
            const bateStatus = status === "TODOS" || item?.status === status;
            const dataItem = new Date(item?.dataCriacao).toISOString().split('T')[0];
            const bateData = !dataFiltro || dataItem === dataFiltro;
            return bateBusca && bateStatus && bateData;
        });
    }, [lista, busca, status, dataFiltro]);

    return (
        <Template.container>
            <Template.Toolbar>
                <Template.MainBar>
                    <div className="search-wrapper">
                        <SearchIcon className="icon-search" />
                        <input
                            placeholder="Buscar placa ou nome..."
                            value={busca}
                            onChange={(e) => setBusca(e.target.value)}
                        />
                    </div>

                    {/* Desktop: Filtros em linha */}
                    <Template.DesktopFilters>
                        <Template.SelectStyled>
                            <select value={status} onChange={(e) => setStatus(e.target.value)}>
                                <option value="TODOS">Todos Status</option>
                                <option value="AGUARDANDO_ENTRADA">Entrada</option>
                                <option value="AGUARDANDO_SAIDA">Saída</option>
                            </select>
                        </Template.SelectStyled>
                        <Template.InputData type="date" value={dataFiltro} onChange={(e) => setDataFiltro(e.target.value)} />
                        <Template.BtnAction onClick={carregarListaOriginal}>
                            <SearchCodeIcon size={18} />
                            <span>Buscar</span>
                        </Template.BtnAction>
                    </Template.DesktopFilters>

                    {/* Mobile: Botão que abre o menu flutuante */}
                    <Template.BtnFilterMobile onClick={() => setShowFilters(!showFilters)}>
                        {showFilters ? <CloseIcon /> : <FilterListIcon />}
                    </Template.BtnFilterMobile>
                </Template.MainBar>

                {/* PAINEL FLUTUANTE (Não empurra os itens) */}
                <Template.FloatingFilter isOpen={showFilters}>
                    <div className="filter-item">
                        <label>Status</label>
                        <Template.SelectStyled>
                            <select value={status} onChange={(e) => setStatus(e.target.value)}>
                                <option value="TODOS">Todos os Status</option>
                                <option value="AGUARDANDO_ENTRADA">Aguardando Entrada</option>
                                <option value="AGUARDANDO_SAIDA">Aguardando Saída</option>
                            </select>
                        </Template.SelectStyled>
                    </div>
                    <div className="filter-item">
                        <label>Data</label>
                        <Template.InputData type="date" value={dataFiltro} onChange={(e) => setDataFiltro(e.target.value)} />
                    </div>
                    <Template.BtnAction onClick={carregarListaOriginal}>
                        Aplicar Filtros
                    </Template.BtnAction>
                </Template.FloatingFilter>
            </Template.Toolbar>

            <Template.ContentBody>
                <div className="results-count">
                    {listaFiltrada.length} REGISTROS ENCONTRADOS
                </div>
                <ItensRegistro
                    lista={listaFiltrada}
                    hendleDetalhesPedidos={(id) => navigate(`/portaria/controle/detalhes-registro?order=${id}`)}
                    hendleBusca={() => { }}
                    visibleCount={listaFiltrada.length}
                    loading={loading}
                />
            </Template.ContentBody>

            {loading && <LoadingSecundary />}
        </Template.container>
    );
};