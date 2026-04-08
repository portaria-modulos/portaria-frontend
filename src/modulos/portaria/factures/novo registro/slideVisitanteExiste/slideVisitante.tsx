import { useCallback, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import styled from "styled-components";
import { subjet } from "../../../../../jwt/jwtservice";
import serviceTipoPessoa from "../../../service/tipoPessoaApi/serviceTipoPessoa";
import Template from "../RegistroPortariaCss"
import Api from "../../../service/apiRegistro/apiRegistro"
import BlocosApi from "../../../service/api_secundaria"
import { notify } from "../../../service/snackbarService";
import { BtnGlobal } from "../../../../../components/btnGlobal/btnGlobal";
import apiUsuario from "../../../../PaginaInicial/service/apiUsuario";
import DropPrincipal from "../../../../../components/DropPrincipal/ImageDropZone";
import { useNavigate } from "react-router-dom";
import { FiltroFIlialUsuario } from "../filtroFIlial/filtroFIlial";

// import DropPrincipal from "../../components/DropPrincipal/ImageDropZone";

type FormData = {
    typeMethod: "VISITANTE" | "NAO_VISITANTE",
    visitanteId: number,
    tipoAcesso?: string,
    bloco: string,
    descricao?: string,
    ocupacaoLiberada: string,
    criadorId: number,
    globalAtivo?: any,
    dataAcesso?: any,
    filialSolicitado: any,
    placaVeiculo?: any
};
type VisitanteData = {
    id: any,
    nomeCompleto?: string;
    imagem?: string; // Assumindo que a URL da imagem virá aqui
    // Adicione outras propriedades relevantes do visitante aqui:
    tipoPessoa?: string;
    categoriaAcesso?: string;
    placaVeiculo?: string;
    numeroTelefone: any
    // ... outras propriedades que a API retorna
};

// 2. Defina a interface (ou tipo) para as props do SlidePortariaComponent
type SlideProps = {
    visitante: VisitanteData;
    tipo: () => void
};
const Resize = styled.span`
  color: red;
  `;

export const ocupacoesLiberada = [
    { id: 1, nome: "Somente Motorista", codigo: "PRES" },
    { id: 2, nome: "Motorista e Passageiros", codigo: "DIR" },

];
export const SlidePortariaComponent = ({ visitante, tipo }: SlideProps) => {

    const { register, handleSubmit, formState: { errors }, reset, watch,setValue} = useForm<FormData>({
        defaultValues: {
            globalAtivo: "false",   // ou "true"
        }
    })
    const [selectedFile, setSelectedFile] = useState<File | null>(null);
    const [resetCounter, setResetCounter] = useState(0);
    const handleFileSelect = (file: File | null) => {
        setSelectedFile(file);
    };
    const nav = useNavigate()
    const [recorrencia, setRecorrencia] = useState<any[]>([])
    const usuario = subjet()
    const permissions: string[] = usuario?.permissoes || [];
    const [blocos, setBlocos] = useState<any[]>([])
    const permissionEdit = permissions.includes("GERENCIAR_USUARIOS")
    const tipoAcesso = watch("tipoAcesso");
    const [bloqueioBTN, setbloqueioBTN] = useState(false);
    const onSubmit = async (data: FormData) => {
        try {
            setbloqueioBTN(true)
            const usuario = subjet();
            if (!data.descricao) {
                delete data.descricao;
            }
            data.criadorId = usuario?.id as any;
            const acess = tipoAcesso?.toUpperCase() === "RECORRENTE TEMPORARIO";
            if (!acess) {
                delete data.dataAcesso
            }
            data.typeMethod = "VISITANTE";
            data.visitanteId = visitante?.id
            if (tipoAcesso == null) {
                data.tipoAcesso = visitante.categoriaAcesso;
            }
            if (!data.filialSolicitado) {
                notify("Selecione a filial da Solicitação", "error")
                return;
            }
            const resposta = await Api.RegistroFactory(data, selectedFile as any);
            if (resposta) {
                setbloqueioBTN(false)
                notify(resposta.msg, "success")
                reset()
                setResetCounter(prev => prev + 1)
                nav("/portaria/controle/meus-registros")


            }
        } finally {
            setbloqueioBTN(false)
        }

    };
    const handleCancelar = () => {
        tipo()
        reset()
    }
    const focus = (
        event: React.KeyboardEvent<HTMLInputElement>,
        nextRef?: React.RefObject<HTMLInputElement | null>
    ) => {
        if (event.key === "Enter") {
            nextRef?.current?.focus();
        }
    };

    const buscar_recorencia = async () => {

        const resposta = await serviceTipoPessoa.recorrecia();
        if (resposta.recorrencia) {
            setRecorrencia(resposta.recorrencia)
        }

    }


    const hendleBusca = async () => {
        const resposta = await BlocosApi.blocos();
        if (resposta.blocos) {
            setBlocos(resposta?.blocos);

        }
    }
    useEffect(() => {
        buscar_recorencia();
        hendleBusca();
    }, []);
    const [listaFiliais, setListaFiliais] = useState<any[]>([])

    const carregarFiliais = useCallback(async () => {
        try {
            const resposta = await apiUsuario.FiliaisUsuario(usuario?.id);
            if (resposta?.acess) {
                setListaFiliais(resposta.acess);
            }
        } catch (error) {
            notify("Erro ao carregar filiais", "error");
        }
    }, []);
    useEffect(() => {
        carregarFiliais();
    }, [])
    return (
        <>
            <Template.container>
                <Template.area_pedidos>
                    <Template.CardCentro >
                        <Template.Image src={visitante?.imagem} />
                        <Template.ItemDetails>
                            <Template.AreaItemJust>
                                <Template.Label>Nome Completo:</Template.Label>
                                <Template.LabelSubtitulo>{visitante?.nomeCompleto}</Template.LabelSubtitulo>
                            </Template.AreaItemJust>
                            <Template.AreaItemJust>
                                <Template.Label>Tipo de Pessoa:</Template.Label>
                                <Template.LabelSubtitulo>
                                    {visitante?.tipoPessoa}
                                </Template.LabelSubtitulo>
                            </Template.AreaItemJust>
                            {/* <p><strong>Data entrada:</strong> <Template.Bold>1100011</Template.Bold></p> */}
                        </Template.ItemDetails>
                        <Template.ItemDetails>
                            <Template.AreaItemJust>
                                <Template.Label>Categoria de Acesso:</Template.Label>
                                <Template.LabelSubtitulo>{visitante?.categoriaAcesso}</Template.LabelSubtitulo>
                            </Template.AreaItemJust>
                            <Template.AreaItemJust>
                                <Template.Label>NumeroTelefone:</Template.Label>
                                <Template.LabelSubtitulo>{visitante?.numeroTelefone}</Template.LabelSubtitulo>
                            </Template.AreaItemJust>
                            <Template.AreaItemJust>
                                <Template.Label>Placa:</Template.Label>
                                <Template.LabelSubtitulo>{visitante?.placaVeiculo}</Template.LabelSubtitulo>
                            </Template.AreaItemJust>
                            {/* <p><strong>Data entrada:</strong> <Template.Bold>1100011</Template.Bold></p> */}
                        </Template.ItemDetails>
                    </Template.CardCentro>
                    <Template.pedidos>
                        <Template.FormSub >
                            <Template.Select>
                                <Template.leftArea>
                                    <FiltroFIlialUsuario
                                        filialUsuario={usuario?.filial}
                                        listaFiliais={listaFiliais}
                                        carregarDadosLogistico={(valor) => {
                                            setValue("filialSolicitado", valor);
                                        }}
                                    />
                                    {/* <Template.CamposInput>
                                        <Template.label >Filial Destino<Resize>*</Resize></Template.label>
                                        <Template.SelectItens {
                                            ...register("filialSolicitado", { required: "Selecione a filial de Destino" })}>
                                            <Template.Options value="">Selecione</Template.Options>
                                            {listaFiliais.flatMap((item) => (
                                                <Template.Options value={item?.filial}>{item?.filial + "-" + item?.nome.toUpperCase()}</Template.Options>

                                            ))}
                                        </Template.SelectItens>
                                        {errors.bloco && <Template.Erros><p>{errors?.bloco?.message}</p></Template.Erros>}
                                    </Template.CamposInput> */}
                                </Template.leftArea>
                                {/* Select 1  corrigido*/}
                                <Template.label>Placa Veiculo (Opcional) <Resize></Resize></Template.label>
                                <Template.Campos
                                    hasError={!!errors.placaVeiculo} type="text"
                                    autoComplete="current-password"
                                    placeholder="Placa do Veiculo"

                                    {...register("placaVeiculo", {
                                        pattern: {
                                            value: /^([^0-9][^0-9][^0-9][0-9][A-Za-z0-9][0-9][0-9])/,
                                            message: "Formato de placa inválido. Ex: ABC1234 ou ABC1D23",
                                        }
                                    })}
                                />
                                <Template.Erros>
                                    {errors?.placaVeiculo && <p>{errors?.placaVeiculo?.message as any}</p>}
                                </Template.Erros>
                                <Template.leftArea>
                                    <Template.CamposInput>
                                        <Template.label >Bloco<Resize>*</Resize></Template.label>
                                        <Template.SelectItens {
                                            ...register("bloco", { required: "Selecione o bloco" })}>
                                            <Template.Options value="">Selecione</Template.Options>
                                            {blocos.flatMap((item) => (
                                                <Template.Options value={item?.nome.toUpperCase()}>{item?.nome.toUpperCase()}</Template.Options>

                                            ))}
                                        </Template.SelectItens>
                                        {errors.bloco && <Template.Erros><p>{errors?.bloco?.message}</p></Template.Erros>}
                                    </Template.CamposInput>
                                </Template.leftArea>
                                {/* Select 1  erro*/}

                                <Template.leftArea>
                                    {permissionEdit &&
                                        <Template.CamposInput >
                                            <Template.label>Recorrência do Acesso <Resize>*</Resize></Template.label>
                                            <Template.SelectItens  {...register("tipoAcesso", { required: "Selecione o Tipo de acesso" })}>
                                                <Template.Options value="">Selecione</Template.Options>
                                                {recorrencia.map(rec => (
                                                    <Template.Options value={rec?.nome.toLowerCase()}>{rec?.nome}</Template.Options>

                                                ))}
                                            </Template.SelectItens>
                                            {errors.tipoAcesso && <Template.Erros><p>{errors.tipoAcesso.message}</p></Template.Erros>}

                                        </Template.CamposInput>

                                    }                                    {permissionEdit && tipoAcesso?.toUpperCase() === "RECORRENTE" &&
                                        <Template.CamposInput>
                                            <Template.label >Global?
                                            </Template.label>
                                            <Template.labelCheck style={{ display: "flex" }}>
                                                <Template.checkbox type="radio" value="true" {
                                                    ...register("globalAtivo")} />
                                                <small>Sim</small>
                                            </Template.labelCheck>
                                            <Template.labelCheck>
                                                <Template.checkbox type="radio" value="false"{
                                                    ...register("globalAtivo")} />
                                                <small>Não</small>
                                            </Template.labelCheck>
                                        </Template.CamposInput>
                                    }
                                    <Template.CamposInput>
                                        <Template.label>Ocupação Liberada <Resize>*</Resize></Template.label>
                                        <Template.SelectItens {...register("ocupacaoLiberada", { required: "Selecione uma ocupaçao" })}>
                                            <Template.Options value="">Selecione</Template.Options>
                                            {ocupacoesLiberada.flatMap((item: any) => (
                                                <Template.Options key={item.id} value={item.nome}>{item.nome}</Template.Options>
                                            ))}
                                        </Template.SelectItens>
                                        {errors.ocupacaoLiberada && <Template.Erros><p>{errors.ocupacaoLiberada.message}</p></Template.Erros>}
                                    </Template.CamposInput>
                                </Template.leftArea>

                                {tipoAcesso?.toUpperCase() === "RECORRENTE TEMPORARIO" &&
                                    <Template.CamposInput>
                                        <Template.label>Data <Resize>*</Resize></Template.label>
                                        <Template.Campos
                                            hasError={!!errors.dataAcesso} placeholder="data" type="date"
                                            autoComplete="current-password"
                                            {...register("dataAcesso", {
                                                required: "A data é obrigatória para acesso recorrente temporário"
                                            })}
                                            onKeyDown={(e) => focus(e)}

                                        />
                                        {errors.dataAcesso && <Template.Erros><p>{errors.dataAcesso.message as any}</p></Template.Erros>}
                                    </Template.CamposInput>
                                }
                                <Template.CamposInput>
                                    <Template.label>OBS</Template.label>
                                    <Template.TextArea {...register("descricao")}></Template.TextArea>
                                </Template.CamposInput>
                                <Template.label>IMG visitante<Resize>*</Resize></Template.label>
                                <DropPrincipal onFileSelect={handleFileSelect} titulo={"Clique ou arraste outra imagem para substituir"} resetSignal={resetCounter} permission={tipoAcesso?.toUpperCase()} />
                                {selectedFile && <p>Arquivo selecionado: {selectedFile.name}</p>}
                            </Template.Select>

                        </Template.FormSub>
                        <Template.btnDivider>
                            <Template.BtnLogin disabled={bloqueioBTN} onClick={handleSubmit(onSubmit)}>Enviar Pedido</Template.BtnLogin>
                            <BtnGlobal click={handleCancelar} nome_btn={"red"} isvalid={true}>Limpar</BtnGlobal>
                        </Template.btnDivider>
                    </Template.pedidos>
                </Template.area_pedidos>
            </Template.container>
        </>
    )
}