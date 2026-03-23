import Template from "./updateRegistroCss";
import { Button } from "@mui/material";
import { Fragment, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import filiaçApi from "../../../../modulos/portaria/service/filiaisApi/filiasAPi"

import apiSec from "../../../../modulos/portaria/service/api_secundaria"
import type { RegistroVisitante } from "../../../../modulos/portaria/types/registros";
import api from "../../../../modulos/portaria/service/api";
import { notify } from "../../../../modulos/portaria/service/snackbarService";
import serviceTipoPessoa from "../../../../modulos/portaria/service/tipoPessoaApi/serviceTipoPessoa";
import { subjet } from "../../../../jwt/jwtservice";
export const ocupacoesLiberada = [
  { id: 1, nome: "Somente Motorista", codigo: "PRES" },
  { id: 2, nome: "Motorista e Passageiros", codigo: "DIR" },
];
type Props = {
  handleCancel: () => void;
  message: string;
  ativoBtn: boolean,
  data: RegistroVisitante
};
type FormData = {
  id: any;
  filialSolicitado?: any,
  nomeCompleto: any
  placaVeiculo: any,
  numeroTelefone: any,
  bloco: any,
  tipoPessoa: string,
  tipoDeAcesso: string,
  ocupacaoLiberada: string,
  dataAcesso?: any
};
type bloco = {
  id: number,
  nome: any
}
export const PopupUpdateResgistroComponent = ({ handleCancel, data }: Props) => {
  const { register, handleSubmit, setValue, watch } = useForm<FormData>({
    defaultValues: {
      nomeCompleto: data.nomeCompleto || "",
      placaVeiculo: data?.placaVeiculo || "",
      numeroTelefone: data?.visitante.numeroTelefone || "",
      bloco: data.bloco || "",
      tipoPessoa: data.tipPessoa,
      tipoDeAcesso: data?.visitante.tipoAcesso || data.visitante.recorrencia?.nome    },
  })
  const usuario = subjet();
  const valorSelecionado = watch("bloco")
  const valorSelecionadoTipo = watch("tipoPessoa")
  const ocupacao = watch("ocupacaoLiberada")

  const tipoAcesso = watch("tipoDeAcesso")
  const [blocos, setBlocos] = useState<bloco[]>([])
  const [ocupacoes, setOcupacao] = useState<any[]>([]);
  const [recorrencia, setRecorrencia] = useState<any[]>([])

  async function henfleConfirm(dataInput: FormData) {
    dataInput.id = data.id;
    const TipoAcessoRecorrencia = dataInput.tipoDeAcesso;
    if (TipoAcessoRecorrencia === "RECORRENTE TEMPORARIO" && dataInput.dataAcesso == null) {
      notify("informa uma data valida", "error");
    }

    const response = await api.atualizarRegistro(dataInput);
    if (response.msg) {
      notify(response.msg, "success");
      handleCancel()
    }
  }
  const buscaApi = async () => {
    const resposta = await serviceTipoPessoa.lista();
    if (resposta.tipoPessoa) {
      setOcupacao(resposta.tipoPessoa)
    }

  }
  const buscar_recorencia = async () => {
    const resposta = await serviceTipoPessoa.recorrecia();
    if (resposta.recorrencia) {
      setRecorrencia(resposta.recorrencia)
    }

  }
  useEffect(() => {
    buscaApi();
    buscar_recorencia()
  }, [])
  useEffect(() => {
    const hendleBusca = async () => {
      const resposta = await apiSec.blocos();
      if (resposta.blocos) {
        setBlocos(resposta?.blocos);

      }
    }
    setValue("nomeCompleto", data.nomeCompleto || "");
    setValue("placaVeiculo", data.placaVeiculo || "");
    setValue("numeroTelefone", data.visitante.numeroTelefone || "");
    setValue("ocupacaoLiberada", data.ocupacaoLiberada || "");
    setValue("bloco", data.bloco || "");
    hendleBusca()
  }, [data, setValue])
const [filiais,setListaFiliais]= useState([])
 const handleSearchFiliais = async () => {
        const resposta = await filiaçApi.lista();
        if (resposta?.filial) {
            setListaFiliais(resposta?.filial);
        }

    };
    useEffect(()=>{
      handleSearchFiliais()
    },[usuario?.id])
  const permissions: string[] = usuario?.permissoes || [];
  const permissionEdit = permissions.includes("GERENCIAR_USUARIOS")
  const nomeFilial = filiais.filter((b:any) => b.numeroFilial === data.filialSocitado) as any
  return (
    <Template.container>
      <Template.container_int>
        <Template.header>
          <h2>Editar Registro</h2>
          <p>Atualize os dados de acesso do visitante abaixo.</p>
        </Template.header>

        <Template.content>
           <Template.CamposInput>
            <Template.label>Portaria Filial</Template.label>
            <Template.SelectItens {...register("filialSolicitado")}  onChange={e => setValue("filialSolicitado", e.target.value)}>
              
              {filiais.some((b:any) => b.filial === data.filialSocitado) ? null : (
              
                <Template.Options value={data.filialSocitado}>
                  {nomeFilial[0]?.nome as any}
                </Template.Options>

              )}

              {filiais.map((item:any) => (
                <Template.Options key={item.id} value={item?.numeroFilial}>
                  {item.nome}
                </Template.Options>
              ))}
            </Template.SelectItens>
          </Template.CamposInput>
          {/* Nome ocupa a linha toda */}
          <Template.CamposInput className="full-width">
            <Template.label>Nome Completo *</Template.label>
            <Template.Campos
              type="text"
              placeholder="Ex: João Silva"
              {...register("nomeCompleto", { required: "Nome é obrigatório" })}
            />
          </Template.CamposInput>

          {/* Telefone e Placa lado a lado */}
          <Template.CamposInput>
            <Template.label>Telefone *</Template.label>
            <Template.Campos
              type="text"
              placeholder="(00) 00000-0000"
              {...register("numeroTelefone")}
            />
          </Template.CamposInput>

          <Template.CamposInput>
            <Template.label>Placa Veículo *</Template.label>
            <Template.Campos
              type="text"
              placeholder="ABC1234"
              {...register("placaVeiculo", {
                required: "Obrigatório",
                pattern: {
                  value: /^([^0-9][^0-9][^0-9][0-9][A-Za-z0-9][0-9][0-9])/,
                  message: "Formato inválido",
                }
              })}
            />
          </Template.CamposInput>

          <Template.CamposInput>
            <Template.label>Bloco</Template.label>
            <Template.SelectItens {...register("bloco")} value={valorSelecionado} onChange={e => setValue("bloco", e.target.value)}>
              {blocos.some(b => b.nome === valorSelecionado) ? null : (
                <Template.Options value={valorSelecionado}>
                  {valorSelecionado}
                </Template.Options>

              )}

              {blocos.map((item) => (
                <Template.Options key={item.id} value={item.nome.toUpperCase()}>
                  {item.nome}
                </Template.Options>
              ))}
            </Template.SelectItens>
          </Template.CamposInput>

          <Template.CamposInput>
            <Template.label>Ocupação</Template.label>
            <Template.SelectItens {...register("ocupacaoLiberada")} value={ocupacao} onChange={e => setValue("ocupacaoLiberada", e.target.value)}>
              {ocupacoesLiberada.some(b => b.nome === ocupacao) ? null : (
                <Template.Options value={ocupacao}>
                  {ocupacao}
                </Template.Options>

              )}

              {ocupacoesLiberada.map((item) => (
                <Template.Options key={item.id} value={item.nome.toUpperCase()}>
                  {item.nome}
                </Template.Options>
              ))}
            </Template.SelectItens>
          </Template.CamposInput>

          <Template.CamposInput className="full-width">
            <Template.label>Tipo de Pessoa</Template.label>
            <Template.SelectItens {...register("tipoPessoa")} value={valorSelecionadoTipo} onChange={e => setValue("tipoPessoa", e.target.value)}>
              {ocupacoes.some(b => b.nome.toLowerCase() === valorSelecionado.toLowerCase()) ? null : (
                <Template.Options value={valorSelecionadoTipo}>
                  {valorSelecionadoTipo}
                </Template.Options>

              )}

              {ocupacoes.map((item) => (
                <Template.Options key={item.id} value={item.nome.toUpperCase()}>
                  {item.nome}
                </Template.Options>
              ))}
            </Template.SelectItens>
          </Template.CamposInput>

          {permissionEdit && (
            <Fragment>
              <Template.CamposInput className="full-width">
                <Template.label>Recorrência de Acesso</Template.label>
                <Template.SelectItens {...register("tipoDeAcesso")} value={tipoAcesso} onChange={e => setValue("tipoDeAcesso", e.target.value)}>
                  {recorrencia.some(b => b?.nome.toLowerCase() === tipoAcesso.toLowerCase()) ? null : (
                    <Template.Options value={tipoAcesso}>
                      {tipoAcesso}
                    </Template.Options>

                  )}

                  {recorrencia.map((item) => (
                    <Template.Options key={item.id} value={item.nome.toUpperCase()}>
                      {item.nome}
                    </Template.Options>
                  ))}
                </Template.SelectItens>
              </Template.CamposInput>

              {tipoAcesso?.toUpperCase() === "RECORRENTE TEMPORARIO" && (
                <Template.CamposInput className="full-width">
                  <Template.label>Data Expiração</Template.label>
                  <Template.Campos type="date" {...register("dataAcesso")} />
                </Template.CamposInput>
              )}
            </Fragment>
          )}
        </Template.content>

        <Template.buttons>
          <Button
            variant="outlined"
            onClick={handleCancel}
            sx={{
              borderRadius: "8px",
              textTransform: "none",
              fontWeight: 600,
              color: "#64748b",
              borderColor: "#e2e8f0",
              "&:hover": { backgroundColor: "#f8fafc", borderColor: "#cbd5e1" },
            }}
          >
            Cancelar
          </Button>
          <Button
            variant="contained"
            onClick={handleSubmit(henfleConfirm)}
            sx={{
              borderRadius: "8px",
              textTransform: "none",
              fontWeight: 600,
              backgroundColor: "#2563eb",
              boxShadow: "none",
              "&:hover": { backgroundColor: "#1d4ed8", boxShadow: "none" },
            }}
          >
            Salvar Alterações
          </Button>
        </Template.buttons>
      </Template.container_int>
    </Template.container>
  );
};
