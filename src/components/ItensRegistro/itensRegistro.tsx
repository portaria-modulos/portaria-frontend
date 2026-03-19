import { useEffect, useRef } from "react";
import Chip from "@mui/material/Chip";
import Template from "./ItensRegistroCss";
import { ChevronRight } from "lucide-react";
import { Alert, Button, CircularProgress } from "@mui/material";
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
        const options = {
            root: null,
            rootMargin: "0px 0px 100px 0px",
            threshold: 0.1
        };

        const observer = new IntersectionObserver((entries) => {
            const [entry] = entries;
            if (entry.isIntersecting && !loading && lista.length < visibleCount) {
                hendleBusca();
            }
        }, options);

        if (observerTarget.current) observer.observe(observerTarget.current);
        return () => { if (observerTarget.current) observer.unobserve(observerTarget.current); };
    }, [loading, lista.length, visibleCount, hendleBusca]);
    

    const retornaCorStatus = (s: string) => {
        const cores: any = { "AGUARDANDO_ENTRADA": "info", "AGUARDANDO_SAIDA": "warning", "SAIDA_LIBERADA": "success" };
        return cores[s] || "error";
    };

    const handleConvetData = (data: any) => new Date(data).toLocaleDateString("pt-BR", {
        day: "2-digit", month: "short", year: "numeric", hour: "2-digit", minute: "2-digit"
    });

    return (
        <Template.area_pedidos>
            <Template.pedidos>
                {lista.length === 0 && loading ? (
                    Array.from({ length: 4 }).map((_, i) => <CardSkeleton key={i} />)
                ) : (
                    lista.map((item) => (
                        <div key={item.id}>
                            <Template.dataPedido>
                                {handleConvetData(item?.dataCriacao)}
                            </Template.dataPedido>
                            <Template.cardItem>
                                {item?.prioridadeAtrasoAtivo &&
                                    <Alert
                                        icon={<WarningAmberIcon sx={{ fontSize: '1rem' }} />}
                                        severity="warning"
                                        sx={{ borderRadius: '8px', mb: 1, py: 0, fontSize: '0.7rem', border: '1px solid #ffe58f' }}
                                    >
                                        {item.prioridadeAviso || item.prioridadeAtraso}
                                    </Alert>
                                }
                                <Template.card_item_header>
                                    <Template.numeroDoPedido>
                                        <strong>N: </strong>{item?.protocolo}
                                    </Template.numeroDoPedido>
                                    <Template.AreaStatus>
                                        <Chip
                                            sx={{
                                                height: 22,
                                                fontSize: '10px',
                                                fontWeight: 700,
                                                textTransform: 'uppercase',
                                                borderRadius: '6px'
                                            }}
                                            color={retornaCorStatus(item?.status)}
                                            label={item?.status.replace("_", " ")}
                                            variant="outlined"
                                        />
                                        {item?.entrada?.dataEntrada &&
                                            <Template.data><strong>Entrada: </strong>{handleConvetData(item?.entrada?.dataEntrada)}</Template.data>

                                        }
                                    </Template.AreaStatus>
                                </Template.card_item_header>

                                <Template.card_item_center>
                                    <Template.Image src={item?.visitante?.imagem} />
                                    <Template.Areaitem>
                                        <Template.inforLabel>
                                            <Template.Span>Placa: </Template.Span>
                                            <Template.Infor>{item?.placaVeiculo}</Template.Infor>
                                        </Template.inforLabel>
                                        <Template.inforLabel>
                                            <Template.Span>Nome: </Template.Span>
                                            <Template.Infor>{item?.nomeCompleto?.trim().toUpperCase().split(" ")[0]}</Template.Infor>
                                        </Template.inforLabel>
                                        <Template.inforLabel>
                                            <Template.Span>Tipo de Pessoa: </Template.Span>
                                            <Template.Infor>{item.tipPessoa.toUpperCase()}</Template.Infor>
                                        </Template.inforLabel>
                                        <Template.inforLabel>
                                            <Template.Span>Acesso: </Template.Span>
                                            <Template.Infor>{item?.visitante?.recorrencia?.nome}</Template.Infor>
                                        </Template.inforLabel>

                                    </Template.Areaitem>

                                    <Button
                                        onClick={() => hendleDetalhesPedidos(item?.id)}
                                        variant="outlined"
                                        sx={{
                                            minWidth: '40px',
                                            width: '40px',
                                            height: '40px',
                                            borderRadius: '10px',
                                            borderColor: '#e2e8f0',
                                            color: '#64748b',
                                            backgroundColor: '#fff',
                                            '&:hover': {
                                                borderColor: '#94a3b8',
                                                backgroundColor: '#f8fafc',
                                                color: '#0f172a',
                                            },
                                            '& .lucide': { width: 18 }
                                        }}
                                    >
                                        <ChevronRight />
                                    </Button>
                                </Template.card_item_center>
                            </Template.cardItem>
                        </div>
                    ))
                )}
            </Template.pedidos>

            <Template.sentinela ref={observerTarget}>
                {loading && lista.length > 0 && (
                    <Template.loadingFooter>
                        <CircularProgress size={20} thickness={5} sx={{ color: '#9ca3af' }} />
                        <span>Carregando mais registros...</span>
                    </Template.loadingFooter>
                )}
            </Template.sentinela>
        </Template.area_pedidos>
    );
};