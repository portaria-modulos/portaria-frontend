import { useEffect, useRef } from "react";
import Chip from "@mui/material/Chip";
import Template from "./ItensRegistroCss";
import { ChevronRight, Clock, Truck, User, CheckCircle2, Calendar } from "lucide-react";
import { Alert, CircularProgress } from "@mui/material";
import WarningAmberIcon from "@mui/icons-material/WarningAmber";
import CardSkeleton from "../skeleton/registroSkeleon/registroSkelen";

type listaProps = {
    lista: any[],
    hendleDetalhesPedidos: (n: any) => void,
    hendleBusca: () => void,
    visibleCount: number,
    loading: boolean
}

export const ItensRegistro = ({ lista, hendleDetalhesPedidos, hendleBusca, visibleCount, loading }: listaProps) => {
    const observerTarget = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const options = { root: null, rootMargin: "0px 0px 100px 0px", threshold: 0.1 };
        const observer = new IntersectionObserver((entries) => {
            const [entry] = entries;
            if (entry.isIntersecting && !loading && lista.length < visibleCount) {
                hendleBusca();
            }
        }, options);

        if (observerTarget.current) observer.observe(observerTarget.current);
        return () => { if (observerTarget.current) observer.unobserve(observerTarget.current); };
    }, [loading, lista.length, visibleCount, hendleBusca]);

    const statusConfig: any = {
        "AGUARDANDO_ENTRADA": { color: "#0284c7", bg: "#e0f2fe", label: "Aguardando Entrada" },
        "AGUARDANDO_SAIDA": { color: "#d97706", bg: "#fef3c7", label: "Aguardando Saída" },
        "SAIDA_LIBERADA": { color: "#059669", bg: "#dcfce7", label: "Saída Liberada" }
    };

    const formatarData = (d: any) => new Date(d).toLocaleDateString("pt-BR", { day: "2-digit", month: "2-digit", year: "2-digit" });
    const formatarHora = (d: any) => new Date(d).toLocaleTimeString("pt-BR", { hour: "2-digit", minute: "2-digit" });

    return (
        <Template.area_pedidos>
            <Template.pedidos>
                {lista.length === 0 && loading ? (
                    Array.from({ length: 6 }).map((_, i) => <CardSkeleton key={i} />)
                ) : (
                    lista.map((item) => {
                        const status = statusConfig[item?.status] || { color: "#64748b", bg: "#f1f5f9", label: item?.status };
                        const temEntradaEfetivada = !!item?.entrada?.filial;

                        return (
                            <Template.cardItem key={item.id} onClick={() => hendleDetalhesPedidos(item?.id)}>
                                <Template.headerInfo>
                                    <Template.DataCriacao>
                                        Registro: {formatarData(item?.dataCriacao)}
                                    </Template.DataCriacao>
                                    <Chip
                                        label={status.label}
                                        sx={{
                                            height: 18, fontSize: '9px', fontWeight: 800,
                                            color: status.color, backgroundColor: status.bg,
                                            border: `1px solid ${status.color}30`,
                                            textTransform: 'uppercase'
                                        }}
                                    />
                                </Template.headerInfo>

                                {item?.prioridadeAtrasoAtivo &&
                                    <Alert severity="warning" icon={<WarningAmberIcon fontSize="small" />}
                                        sx={{ py: 0.1, fontSize: '10px', borderRadius: 0 }}>
                                        {item.prioridadeAviso || item.prioridadeAtraso}
                                    </Alert>
                                }

                                <Template.MainBody>
                                    <Template.Image src={item?.visitante?.imagem} />

                                    <Template.InfoContent>
                                        <Template.NomeVisitante>
                                            {item?.nomeCompleto?.toUpperCase()}
                                        </Template.NomeVisitante>

                                        <Template.LabelGroup>
                                            <Template.BadgeDado><Truck size={12} /> {item?.placaVeiculo || "S/ PLACA"}</Template.BadgeDado>
                                            <Template.BadgeDado><User size={12} /> {item.tipPessoa?.toUpperCase()}</Template.BadgeDado>
                                        </Template.LabelGroup>

                                        {/* EXIBIÇÃO LOGO APÓS O OPERADOR LIBERAR */}
                                        {temEntradaEfetivada && (
                                            <Template.AcessoConfirmadoBox>
                                                <div className="confirmacao-header">
                                                    <CheckCircle2 size={14} color="#15803d" />
                                                    <span>
                                                        Entrada CD <strong>{item.entrada.filial}</strong>
                                                    </span>
                                                </div>
                                                <div className="horario-detalhado">
                                                    <div className="item-data">
                                                        <Calendar size={12} />
                                                        {new Date(item.entrada.dataEntrada).toLocaleDateString("pt-BR")}
                                                    </div>
                                                    <div className="item-hora">
                                                        <Clock size={12} />
                                                        {formatarHora(item.entrada.dataEntrada)}
                                                    </div>
                                                </div>
                                            </Template.AcessoConfirmadoBox>
                                        )}
                                    </Template.InfoContent>

                                    <ChevronRight size={22} color="#cbd5e1" />
                                </Template.MainBody>
                            </Template.cardItem>
                        );
                    })
                )}
            </Template.pedidos>

            <Template.sentinela ref={observerTarget}>
                {loading && <CircularProgress size={28} sx={{ color: '#94a3b8' }} />}
            </Template.sentinela>
        </Template.area_pedidos>
    );
};