import { Fragment, useCallback, useEffect, useRef, useState } from "react";
import Template from "./RegistroPortariaCss"
import { useForm } from "react-hook-form";
import Api from "../../service/apiRegistro/apiRegistro"
import visitanteApi from "../../service/visitanteApi/visitanteApi"
import BlocosApi from "../../service/api_secundaria"
import filiaçApi from "../../service/filiaisApi/filiasAPi"
import { notify } from "../../service/snackbarService";
import { subjet } from "../../../../jwt/jwtservice";
// import DropPrincipal from "../../components/DropPrincipal/ImageDropZone";
import serviceTipoPessoa from "../../service/tipoPessoaApi/serviceTipoPessoa";
import { BtnGlobal } from "../../../../components/btnGlobal/btnGlobal";
import styled from "styled-components";
import DropPrincipal from "../../../../components/DropPrincipal/ImageDropZone";
import { SlidePortariaComponent } from "./slideVisitanteExiste/slideVisitante";
import { AlertComponent } from "../../../../components/alert/alertaComponent";
import { LoadingSecundary } from "../../../../components/LoadingSecundary/LoadingSecundary";
import { AutoCompleteComponet } from "./BuscaAutoComplete/autoComplete";
import apiUsuario from "../../../PaginaInicial/service/apiUsuario";
import { FiltroFIlialUsuario } from "./filtroFIlial/filtroFIlial";

type FormData = {
    typeMethod: string,
    placaVeiculo: string;
    nomeCompleto: string,
    numeroTelefone: string,
    tipoAcesso: string,
    filial: number,
    filialSolicitado: any,
    bloco: string,
    tipPessoa: string,
    descricao?: string,
    ocupacaoLiberada: string,
    criadorId: number,
    globalAtivo?: any,
    dataAcesso?: any
};
const Resize = styled.span`
  color: red;
  `

export const ocupacoesLiberada = [
    { id: 1, nome: "Somente Motorista", codigo: "PRES" },
    { id: 2, nome: "Motorista e Passageiros", codigo: "DIR" },
];

type ModoTela = "BUSCA" | "CADASTRO" | "SLIDER";

export const RegistrosPortaria = () => {
    const { register, handleSubmit, formState: { errors }, reset, watch, setValue } = useForm<FormData>({
        defaultValues: {
            globalAtivo: "false",
            filialSolicitado: ""  // ou "true"
        }
    });
    const [visitanteId, setVisitanteID] = useState<any>(null);
    const [visitante, setVisitante] = useState<any>();
    const [selectedFile, setSelectedFile] = useState<File | null>(null);
    const [resetCounter, setResetCounter] = useState(0);
    const [ocupacoes, setOcupacao] = useState<any[]>([])
    const [recorrencia, setRecorrencia] = useState<any[]>([])
    const [filiais, setFiliais] = useState<any[]>([]);
    const [modo, setModo] = useState<ModoTela>("BUSCA");
    const [value, setValueS] = useState<any | null>(null);
    const usuario = subjet()
    const [loading, setLoading] = useState(false)
    const permissions: string[] = usuario?.permissoes || [];
    const [blocos, setBlocos] = useState<any[]>([])
    const [listaFiliais, setListaFiliais] = useState<any[]>([])
    const permissionEdit = permissions.includes("GERENCIAR_USUARIOS")
    const handleSearchFiliais = async () => {
        const resposta = await filiaçApi.lista();
        if (resposta?.filial) {
            setFiliais(resposta?.filial);
        }

    };
    const tipoAcesso = watch("tipoAcesso");
    const handleFileSelect = (file: File | null) => {
        setSelectedFile(file);
    };
    const [bloqueioBTN, setbloqueioBTN] = useState(false);
    const onSubmit = async (data: FormData) => {
        try {
            setbloqueioBTN(true);
            const usaurio = subjet();
            if (!data.descricao) {
                delete data.descricao;
            }

            if (selectedFile != null) {
                data.criadorId = usaurio?.id as any;
                const acess = tipoAcesso?.toUpperCase() === "RECORRENTE TEMPORARIO";
                if (!acess) {
                    delete data.dataAcesso
                }
                data.typeMethod = "NAO_VISITANTE";
                if (!data.filialSolicitado) {
                    notify("Selecione a filial da Solicitação", "error")
                    return;
                }
                const resposta = await Api.RegistroFactory(data, selectedFile as any)
                if (resposta) {
                    setbloqueioBTN(false)
                    notify(resposta.msg, "success")
                    reset()
                    setResetCounter(prev => prev + 1)

                }
            } else {
                setbloqueioBTN(false)
                notify("Selecione uma imagem", "error")
            }
        } finally {
            setbloqueioBTN(false)
        }

    };
    const handleCancelar = () => {
        setResetCounter(prev => prev + 1);
        setModo("BUSCA");
        setLoading(false)
        reset()
    }
    const senhaRef = useRef<HTMLInputElement>(null);
    const focus = (
        event: React.KeyboardEvent<HTMLInputElement>,
        nextRef?: React.RefObject<HTMLInputElement | null>
    ) => {
        if (event.key === "Enter") {
            nextRef?.current?.focus();
        };
    };
    const buscaApi = async () => {
        const resposta = await serviceTipoPessoa.lista();
        if (resposta?.tipoPessoa) {
            setOcupacao(resposta?.tipoPessoa)
        }

    };
    const buscaVisitante = async () => {
        try {
            setLoading(true)
            if (!value && !visitanteId) {
                setModo("BUSCA");
                setLoading(false)
                return;
            }
            ;
            const resposta = await visitanteApi.visitante(visitanteId?.id, value);
            if (resposta) {
                setVisitante(resposta)
                setTimeout(() => {
                    setModo("SLIDER");
                    setLoading(false)
                }, 2000)
            } else {

                setTimeout(() => {
                    setLoading(false)
                    setValue("nomeCompleto", value)
                    setModo("CADASTRO");

                }, 2000)

            }
        } finally {
            setTimeout(() => {
                setLoading(false)
            }, 2000)
        }


    }
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
        buscaApi();
        buscar_recorencia();
        handleSearchFiliais()
        hendleBusca();
    }, []);
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
    useEffect(() => {
        if (usuario?.filial && listaFiliais.length > 0) {
            setValue("filialSolicitado", String(usuario.filial));
        }
    }, [usuario, listaFiliais]);
    return (
        <Fragment>
            <Template.container_principal>
                {modo === "BUSCA" &&
                    <Template.AreaBuscaPlaca style={{ display: "flex" }}>
                        {/* linkRouter={"/portaria/controle/registro"} */}
                        <AlertComponent link={true} titulo={"info"} msg={"Cadastro de visitante!"}></AlertComponent>
                        <Template.busca>

                            {/* <input
                                autoFocus={false}
                                type="busca"
                                autoComplete="current-password"
                                placeholder="Informe a placa do veiculo"

                                {...register("placaVeiculo")}
                            />
                            <IconButton onClick={buscaVisitante}>
                                🔍
                            </IconButton> */}
                            <AutoCompleteComponet handleBusca={buscaVisitante} value={value} setValue={setValueS} onSelectData={setVisitanteID} />

                        </Template.busca>

                        {value == "" &&
                            <AlertComponent titulo={"success"} msg={"Informe a placa do carro do visitante para continuar!"}></AlertComponent>

                        }

                    </Template.AreaBuscaPlaca>
                }
                {modo === "SLIDER" && (
                    <SlidePortariaComponent
                        visitante={{
                            id: visitante.id,
                            nomeCompleto: visitante?.nomeCompleto,
                            imagem: visitante?.imagem,
                            tipoPessoa: visitante?.tipoPessoa,
                            categoriaAcesso: visitante?.recorrencia?.nome,
                            placaVeiculo: visitante?.placaVeiculo,
                            numeroTelefone: visitante?.numeroTelefone
                        }}
                        tipo={() => setModo("BUSCA")}
                    />
                )}
                {modo === "CADASTRO" &&
                    <Template.container>
                        <Template.titulo>Novo Pedido de Acesso</Template.titulo>
                        <Template.pedidos>
                            <Template.FormSub >
                                <Template.CamposInput>
                                    <FiltroFIlialUsuario
                                        filialUsuario={usuario?.filial}
                                        listaFiliais={listaFiliais}
                                        carregarDadosLogistico={(valor) => {
                                            setValue("filialSolicitado", valor);
                                        }}
                                    />
                                    {/* <FiltroFIlialUsuario listaFiliais={listaFiliais} carregarDadosLogistico={setFiliaisSolicitado} /> */}
                                    <Template.label>Placa <Resize>*</Resize></Template.label>
                                    <Template.Campos
                                        hasError={!!errors.placaVeiculo} type="text"
                                        autoComplete="current-password"
                                        placeholder="Placa do Veiculo"

                                        {...register("placaVeiculo", {
                                            required: "Placa E obrigatorio",
                                            pattern: {
                                                value: /^([^0-9][^0-9][^0-9][0-9][A-Za-z0-9][0-9][0-9])/,
                                                message: "Formato de placa inválido. Ex: ABC1234 ou ABC1D23",
                                            }
                                        })}
                                        onKeyDown={(e) => {
                                            focus(e, senhaRef);
                                        }}
                                    />
                                    <Template.Erros>
                                        {errors.placaVeiculo && <p>{errors.placaVeiculo.message}</p>}
                                    </Template.Erros>
                                </Template.CamposInput>
                                <Template.CamposInput>
                                    <Template.label>Nome <Resize>*</Resize></Template.label>
                                    <Template.Campos hasError={!!errors.nomeCompleto} placeholder="Nome Completo" type="text"
                                        autoComplete="current-password"
                                        {...register("nomeCompleto", {
                                            required: "Nome e obrigatória",
                                            minLength: {
                                                value: 10,
                                                message: "Mínimo 10 caracteres",
                                            },
                                        })}

                                        onKeyDown={(e) => focus(e)}

                                    />
                                    <Template.Erros>
                                        {errors.nomeCompleto && <p>{errors.nomeCompleto.message}</p>}
                                    </Template.Erros>

                                </Template.CamposInput>
                                <Template.CamposInput>
                                    <Template.label>Numero de Telefone <Resize>*</Resize></Template.label>
                                    <Template.Campos hasError={!!errors.nomeCompleto} placeholder="(99) 99999-9999" type="tel"
                                        autoComplete="current-password"
                                        {...register("numeroTelefone", {
                                            required: "O telefone é obrigatório.",
                                            pattern: {
                                                value: /^(\+?55\s?)?(\(?\d{2}\)?\s?)?(9?\d{4}-?\d{4})$/,
                                                message: "Formato de telefone inválido. Ex: (98) 9809-9999 ou 98980999977",
                                            },
                                        })}
                                        onKeyDown={(e) => focus(e)}

                                    />
                                    <Template.Erros>
                                        {errors.numeroTelefone && <p>{errors.numeroTelefone.message}</p>}
                                    </Template.Erros>

                                </Template.CamposInput>
                                <Template.leftArea>
                                    <Template.CamposInput>
                                        <Template.label >Filial Visita<Resize>*</Resize>
                                        </Template.label>
                                        <Template.SelectItens {
                                            ...register("filial", { required: "Selecione uma filial" })}>
                                            <Template.Options value="">Selecione</Template.Options>
                                            {filiais.flatMap((item) => (
                                                <Template.Options key={item?.id} value={item?.numeroFilial}>{item?.numeroFilial} - {item?.nome}</Template.Options>

                                            ))}
                                        </Template.SelectItens>
                                        {errors.filial && <Template.Erros><p>{errors.filial.message}</p></Template.Erros>}
                                    </Template.CamposInput>
                                    {permissionEdit &&
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
                                </Template.leftArea>

                                <Template.Select>
                                    {/* Select 1  corrigido*/}
                                    <Template.leftArea>
                                        <Template.CamposInput>
                                            <Template.label>Tipo de Pessoa <Resize>*</Resize></Template.label>
                                            <Template.SelectItens {...register("tipPessoa", { required: "Selecione o tipo de Pessoa" })}>
                                                <Template.Options value="">Selecione</Template.Options>
                                                {ocupacoes.flatMap(item => (
                                                    <Template.Options value={item?.nome}>{item?.nome}</Template.Options>

                                                ))}
                                            </Template.SelectItens>
                                            {errors.tipPessoa && <Template.Erros><p>{errors.tipPessoa.message}</p></Template.Erros>}
                                        </Template.CamposInput>
                                        <Template.CamposInput>
                                            <Template.label >Bloco<Resize>*</Resize></Template.label>
                                            <Template.SelectItens {
                                                ...register("bloco", { required: "Selecione o bloco" })}>
                                                <Template.Options value="">Selecione</Template.Options>
                                                {blocos.flatMap((item) => (
                                                    <Template.Options value={item?.nome.toUpperCase()}>{item?.nome.toUpperCase()}</Template.Options>

                                                ))}
                                            </Template.SelectItens>
                                            {errors.bloco && <Template.Erros><p>{errors.bloco.message}</p></Template.Erros>}
                                        </Template.CamposInput>
                                    </Template.leftArea>
                                    {/* Select 1  erro*/}

                                    <Template.leftArea>
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
                                        <Template.label>OBS </Template.label>
                                        <Template.TextArea {...register("descricao")}></Template.TextArea>
                                    </Template.CamposInput>
                                </Template.Select>
                                <Template.label>IMG visitante<Resize>*</Resize></Template.label>
                                <DropPrincipal onFileSelect={handleFileSelect} titulo={"Clique ou arraste outra imagem para substituir"} resetSignal={resetCounter} permission={tipoAcesso?.toUpperCase()} />
                                {selectedFile && <p>Arquivo selecionado: {selectedFile.name}</p>}

                            </Template.FormSub>
                            <Template.btnDivider>
                                <Template.BtnLogin disabled={bloqueioBTN} onClick={handleSubmit(onSubmit)}>Enviar Pedido</Template.BtnLogin>
                                <BtnGlobal click={handleCancelar} nome_btn={"red"} isvalid={true}>Limpar</BtnGlobal>
                            </Template.btnDivider>
                        </Template.pedidos>
                    </Template.container>
                }
                {loading && <LoadingSecundary />}
            </Template.container_principal>
        </Fragment>
    )
}