import Template from "./visulizar_registroc";
import { LoadingSecundary } from "../../../../../components/LoadingSecundary/LoadingSecundary";
import api from "../../../service/api_secundaria";
import ImageDropZone from "../../novo registro/Drop/ImageDropZone";
import type { RegistroVisitante } from "../../../types/registros";
import { subjet } from "../../../../../jwt/jwtservice";
import type { AtualizaStatus } from "../../../types/stualizaStatus";
import { notify } from "../../../service/snackbarService";
import { Alert } from "@mui/material";
import WarningAmberIcon from "@mui/icons-material/WarningAmber";

import { useEffect, useState } from "react";
import { ImageModal } from "../../../../../components/Galeria/Galeria";
import { IconButton } from "@mui/material";

import EditIcon from "@mui/icons-material/Edit"
import { PopupUpdateResgistroComponent } from "../../../../../components/controleDeacesso/UpdateRegistro/popup/updateRegistro";
import { AlertComponent } from "../../../../../components/alert/alertaComponent";
import { ConfirmComponent } from "../../../../../components/confirmSucess/confirm";

const VisualizarRegistro = () => {
  const usuario = subjet()
  const queryParams = new URLSearchParams(window.location.search);
  const numeroDoRegistro: any = queryParams.get("order");
  const [item, setRegistro] = useState<RegistroVisitante | null>(null)
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [resetCounter, setResetCounter] = useState(0);
  const handleFileSelect = (file: File | null) => {
    setSelectedFile(file);
  };
  const detalhes = async () => {
    const resposta = await api.consuta_portaria(numeroDoRegistro);
    if (resposta != null) {
      setRegistro(resposta)
      setResetCounter(prev => prev + 1)
    }
  }
  useEffect(() => {
    window.scrollTo(0, 0);
    detalhes()
  }, [numeroDoRegistro])
  const [loading, setLoading] = useState(false);
  const [ativo, setAtivo] = useState(false);
  const [imagemAtivo, setImagemAtivo] = useState(false)
  const [Imagem, setImagem] = useState("");
  const verifyEntrada = item?.status.includes("AGUARDANDO_ENTRADA");
  const [nomeBtn, setNomeBtn] = useState("")
  const [msg, setMsg] = useState("")

  const [tilulomsg, setTituloMsg] = useState("")
  const hendleBTNIMG = (imagem: string) => {
    setImagemAtivo(true)
    setImagem(imagem)
  }
  const hendleUpdate = () => {
    setAtivo(true)
  }
  const volta = () => {
    setAtivo(false)
    detalhes()
  }
  const solicitarLiberacao = async (registroId: any) => {
    setLoading(true)
    const usuarioId = usuario?.id as any;
    const data: AtualizaStatus = {
      usuarioId,
      registroId
    }
    if (selectedFile != null) {
      try {
        setConfirm("LOADING")

        const resposta = await api.alterarEntrada(data, selectedFile as any);
        if (resposta) {
          setResetCounter(prev => prev + 1)
          const detalhesAtualizados = await api.consuta_portaria(numeroDoRegistro);

          if (detalhesAtualizados) {
            setRegistro(detalhesAtualizados);
            setLoading(false);
            setConfirm("SUCCESS")

            setTituloMsg(resposta.msg);
          }
        }
      } catch (error) {
        notify("Erro ao solicitar liberação", "error");
      } finally {
        setLoading(false);
      }
    } else {
      setTimeout(() => {
        notify("Selecione uma imagem", "error")
        setLoading(false)
      }, 2000)
    }

  }
  const [exibe, setExibe] = useState(false);

  const permissions: string[] = usuario?.permissoes || [];
  const permission = permissions.includes("REGISTRAR_ENTRADA")
  const permissionEdit = permissions.includes("EDITAR_REGISTRO")
  const SolicitarSaida = async (registroId: any) => {
    setLoading(true)
    setConfirm("CONFIRM")

    const usuarioId = usuario?.id as any;
    const data: AtualizaStatus = {
      usuarioId,
      registroId
    }
    if (selectedFile != null) {
      setConfirm("LOADING")
      const resposta = await api.alterarSaida(data, selectedFile as any);
      if (resposta) {
        setTituloMsg(resposta.msg)
        const detalhesAtualizados = await api.consuta_portaria(numeroDoRegistro);
        setResetCounter(prev => prev + 1)
        if (detalhesAtualizados) {
          setRegistro(detalhesAtualizados);
          setConfirm("SUCCESS")
        }
      }

    } else {
      setTimeout(() => {
        notify("Selecione uma imagem", "error")
        setLoading(false);
      }, 2000)
    }

  }
  const [confirm, setConfirm] = useState("");

  const handleConfirmeLiberacao = () => {
    if (selectedFile != null) {
      setExibe(true);
      setConfirm("CONFIRM")
      if (verifyEntrada) {
        setNomeBtn("Liberar Entrada");
        setMsg(`Deseja liberar a entrada de <b>${item?.nomeCompleto}</b>?`);
      } else {
        setNomeBtn("Liberar Saida");
        setMsg(`Deseja liberar a saída de <b>${item?.nomeCompleto}</b>?`)

      }
    } else {
      setTimeout(() => {
        notify("Selecione uma imagem", "error")
        setLoading(false);
      }, 100)
    }
  }
  const hendleCancelar = () => {
    setResetCounter(prev => prev + 1);
    setLoading(false);
    setExibe(false)
  }
  const headleConfirm = () => {
    if (verifyEntrada) {
      solicitarLiberacao(item?.id)
    } else {
      SolicitarSaida(item?.id);

    }
  }
  const retornaCorStatus = (status: any) => {
    switch (status) {
      case "AGUARDANDO_ENTRADA":
        return "#2563EB";
      case "AGUARDANDO_SAIDA":
        return "#D97706";
      case "SAIDA_LIBERADA":
        return "#059669";
      default:
        return "#DC2626";
    }
  };

  function handleConvertData(data: any) {
    const date = new Date(data);

    const hora = date.toLocaleTimeString("pt-BR", {
      hour: "2-digit",
      minute: "2-digit",
    });

    const dia = date.toLocaleDateString("pt-BR");

    return `${hora} ${dia}`;
  }

  return (
    <>
      {item ? (
        <div>
          <Template.Area>
            <Template.Container>
              {/* Status do pedido */}
              {item.ativo && item?.prioridadeAtrasoAtivo &&
                <Alert icon={<WarningAmberIcon fontSize="small" sx={{ fontSize: '0.75rem' }} />} severity="warning"
                  sx={{
                    padding: "0 5px",
                    fontSize: "0.52rem",
                    display: "flex",
                    alignItems: "center",
                    "& .MuiAlert-icon": {
                      fontSize: "0.9rem",
                      marginRight: "4px",
                    }

                  }}
                >
                  {item.prioridadeAviso ? item.prioridadeAviso : item.prioridadeAtraso}
                </Alert>
              }
              <Template.heanderPedido>
                <Template.tituloPedido>PRT: #{item?.protocolo}</Template.tituloPedido>
                <Template.status>
                  <Template.p></Template.p><Template.Chip color={retornaCorStatus(item?.status)}>{item?.status.replace("_", " ")}</Template.Chip>
                  {permissionEdit && !item.status.includes("SAIDA_LIBERADA") && !item.status.includes("AGUARDANDO_SAIDA") &&
                    <Template.edit onClick={hendleUpdate}>
                      <IconButton aria-label="mais opções" sx={{ color: "#000" }}>
                        <EditIcon />
                      </IconButton>
                    </Template.edit>
                  }
                </Template.status>
              </Template.heanderPedido>
              <Template.CardCentro >
                <Template.Image onClick={() => hendleBTNIMG(item.visitante.imagem)} src={item?.visitante.imagem} />
                <Template.ItemDetails>
                  <Template.AreaItemJust>
                    <Template.Label>Nome Completo:</Template.Label>
                    <Template.LabelSubtitulo>{item?.visitante?.nomeCompleto}</Template.LabelSubtitulo>
                  </Template.AreaItemJust>
                  <Template.AreaItemJust>
                    <Template.Label>Tipo de Pessoa:</Template.Label>
                    <Template.LabelSubtitulo>{item?.visitante.tipoPessoa.toUpperCase()
                    }

                    </Template.LabelSubtitulo>
                  </Template.AreaItemJust>
                  {/* <p><strong>Data entrada:</strong> <Template.Bold>1100011</Template.Bold></p> */}
                </Template.ItemDetails>
                <Template.ItemDetails>
                  <Template.AreaItemJust>
                    <Template.Label>Categoria de Acesso:</Template.Label>
                    <Template.LabelSubtitulo>{item?.visitante?.tipoAcesso || item.visitante?.recorrencia?.nome}</Template.LabelSubtitulo>
                  </Template.AreaItemJust>
                  <Template.AreaItemJust>
                    <Template.Label>Placa do Veículo:</Template.Label>
                    <Template.LabelSubtitulo>{item?.placaVeiculo}</Template.LabelSubtitulo>
                  </Template.AreaItemJust>
                  {/* <p><strong>Data entrada:</strong> <Template.Bold>1100011</Template.Bold></p> */}
                </Template.ItemDetails>
              </Template.CardCentro>

              <Template.Card>
                <Template.SummaryRow>
                  <Template.AreaItemJustCenter>
                    <Template.Label>Ocupação Liberada:</Template.Label>
                    <Template.LabelSubtitulo>{item?.ocupacaoLiberada}</Template.LabelSubtitulo>
                  </Template.AreaItemJustCenter>
                  <Template.AreaItemJustRigth>
                    <Template.Label>Data Criacao:</Template.Label>
                    <Template.LabelSubtitulo style={{ fontSize: 11 }}>
                      {new Date(item?.dataCriacao as any).toLocaleDateString("pt-BR", {
                        day: "2-digit",
                        month: "long",
                        year: "numeric",
                      })}
                    </Template.LabelSubtitulo>
                  </Template.AreaItemJustRigth>
                </Template.SummaryRow>
                <Template.SummaryRow>
                  <Template.AreaItemJustCenter>
                    <Template.Label>Destino da Visita:</Template.Label>
                    <Template.LabelSubtitulo>{item?.bloco}</Template.LabelSubtitulo>
                  </Template.AreaItemJustCenter>
                  <Template.AreaItemJustRigth>
                    <Template.Label>Unidade / Filial:</Template.Label>
                    <Template.LabelSubtitulo>
                      {item?.visitante.filial ? item?.visitante.filial : "N/A"}
                    </Template.LabelSubtitulo>
                  </Template.AreaItemJustRigth>
                </Template.SummaryRow>
                {item?.Obs &&
                  <div style={{ display: "flex", flexDirection: "column", gap: 3 }}>
                    <Template.Label>Observações:</Template.Label>
                    <Template.LabelDescrip>{item?.Obs}</Template.LabelDescrip>
                  </div >
                }
                <Template.imagemArea>
                  {item?.entrada && item?.entrada?.imagem &&
                    <Template.ImagemItemRecebido>
                      <p><strong>Imagem Entrada:</strong></p>
                      <small style={{ fontSize: 10, color: "#333" }}>{handleConvertData(item?.entrada?.dataEntrada)} | {item?.entrada?.filial}</small>
                      <Template.ItemImage onClick={() => hendleBTNIMG(item.entrada.imagem)} src={item?.entrada?.imagem} />
                    </Template.ImagemItemRecebido>
                  }
                  {item?.saida && item?.saida?.imagem &&
                    <Template.ImagemItemRecebido>
                      <p><strong>Imagem Saida:</strong></p>
                      <small style={{ fontSize: 10, color: "#333" }}>{handleConvertData(item?.saida?.dataSaida)}</small>
                      <Template.ItemImage onClick={() => hendleBTNIMG(item?.saida?.imagem)} src={item?.saida?.imagem} />
                    </Template.ImagemItemRecebido>
                  }

                </Template.imagemArea>
                {permission &&
                  <>
                    {item?.ativo &&
                      <Template.ImagemItemRecebido>
                        <Template.LabelSubtitulo>Imagem de Inspeção do Porta-malas *</Template.LabelSubtitulo>
                        <ImageDropZone onFileSelect={handleFileSelect} resetSignal={resetCounter}></ImageDropZone>
                      </Template.ImagemItemRecebido>
                    }
                    <Template.Button ativo={item?.ativo} onClick={handleConfirmeLiberacao}>{verifyEntrada ? "Liberar Entrada" : "Liberar Saida"}</Template.Button>

                  </>
                }
              </Template.Card>
              <AlertComponent titulo="info"
                msg={`Autorizado por ${item?.autorizador?.nome} (${item?.autorizador?.ocupacaoOperacional})`}

              />
            </Template.Container>
            {
              imagemAtivo &&
              <ImageModal src={Imagem} open={imagemAtivo} onClose={() => setImagemAtivo(false)} />
            }
            {loading &&
              <LoadingSecundary></LoadingSecundary>
            }
            {/* {selectedFile &&
          <PopupUpdatePerfilComponent ID={undefined} handleConfirm={} handleCancel={function (): void {
            throw new Error("Function not implemented.");
          } } message={""} ativoBtn={false}></PopupUpdatePerfilComponent>
        } */}

          </Template.Area>
          {permissionEdit && ativo &&
            <PopupUpdateResgistroComponent data={item as any} handleCancel={volta} message={""} ativoBtn={false} />
          }
          {exibe &&
            <ConfirmComponent confirm={confirm as any} handleConfirm={headleConfirm} handleCancel={hendleCancelar} message={msg} ativoBtn={true} btnName={nomeBtn} titutlo={tilulomsg} />
          }
        </div>
      ) : (<>
        <Template.semItens>
          <Template.iconSemItens></Template.iconSemItens>
          Nenhum item encontrado
        </Template.semItens>
      </>)}

    </>
  );
};

export default VisualizarRegistro;
