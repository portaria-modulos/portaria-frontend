import { useEffect, useState, type ChangeEvent } from "react";
import Template from "./registroFiliaisCss";
import SearchIcon from "@mui/icons-material/Search";
import Api from "../../../service/apiRegistro/apiRegistro";
import portariaApi from "../../../service/api";

import VisibilityIcon from '@mui/icons-material/Visibility';
import ImageIcon from '@mui/icons-material/Image';
import DeleteIcon from '@mui/icons-material/Delete';
import DownloadIcon from '@mui/icons-material/Download';
import ViewHeadlineIcon from '@mui/icons-material/ViewHeadline'; // Ícone para encolher
import ViewStreamIcon from '@mui/icons-material/ViewStream';     // Ícone padrão

import { ModalGlobalComponent } from "../../../../../components/modalGlobal/modalGlobalComponent";
import { Paginator } from "../../../../../components/paginator/paginator";
import { useNavigate } from "react-router-dom";
import SelectVariants from "../../../../../components/select/selectFiltro";
import { PopupComponent } from "../../../../../components/popup/popupComponent";
import { subjet } from "../../../../../jwt/jwtservice";
import { Avatar, Box, CircularProgress, IconButton, Paper, Stack, TextField, Tooltip, Typography } from "@mui/material";
import apiUsuario from "../../../../PaginaInicial/service/apiUsuario";

const listaSelect = [
  { nome: "Aberto", value: true },
  { nome: "Fechado", value: false }
];

export const ListaRegistroComponent = () => {
  const [lista, setLista] = useState<any[]>([]);
  const [ativo, setAtivo] = useState(false);
  const [id, setId] = useState("");
  const navigate = useNavigate();
  const [busca, setBusca] = useState("");
  const [msg, setMsg] = useState("");
  const [ativoBtn, setBtnAtivo] = useState(true);
  const user = subjet();
  const [exibeImagem, setExibeImagem] = useState(false);
  const [loading, setLoading] = useState(false);
  const [selectedValue, setSelectedValue] = useState<any | null>(null);
  const [selectedFilial, setSelectedFilial] = useState<number | null>(user?.filial);
  const [totaPage, setTotalPage] = useState(0);
  const [item, setItem] = useState<any>();

  // ESTADO PARA DIMINUIR A PLANILHA (Densidade)
  const [density, setDensity] = useState<'compact' | 'standard'>('standard');

  const onSubmit = async (pageUnique?: any) => {
    setLoading(true);
    const resposta = await Api.findAll(selectedFilial as any, busca, selectedValue as any, pageUnique);
    if (resposta) {
      setTimeout(() => {
        setLoading(false);
        setLista(resposta.content);
        setTotalPage(resposta?.totalPages);
      }, 1000);
    }
  };

  useEffect(() => {
    if (busca.trim() === "") {
      onSubmit();
    }
  }, [busca]);

  const [filiais, setFiliais] = useState<any[]>([]);
  const handleSearchFiliais = async () => {
    const resposta = await apiUsuario.FiliaisUsuario(user?.id);
    if (resposta?.acess) {
      setFiliais(resposta.acess);
    }
  };

  useEffect(() => {
    handleSearchFiliais();
  }, []);

  const hendleDelete = (item: any) => {
    setMsg(`Deseja realmente deletar o item ${item.id}`);
    setAtivo(true);
    setId(item.id);
  };

  const handleDeleteHistory = async () => {
    await portariaApi.deletarPortaria(id, user?.id);
    setMsg(`${id} Deletado com sucesso`);
    setBtnAtivo(false);
    await onSubmit();
    setAtivo(false);
  };

  const handleModalImg = (item: any) => {
    setExibeImagem(true);
    setItem(item);
  };

  const handleNextPage = (_: ChangeEvent<unknown>, value: number) => {
    const valueBusca = value - 1;
    onSubmit(valueBusca);
  };

  const handleExibeImagem = async (imagem: any, nomeImagem: any) => {
    const response = await fetch(imagem);
    const blob = await response.blob();
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = nomeImagem;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    window.URL.revokeObjectURL(url);
  };

  const retornaCorStatus = (status: any) => {
    switch (status) {
      case "AGUARDANDO_ENTRADA": return "#3b82f6";
      case "AGUARDANDO_SAIDA": return "#eab308";
      case "SAIDA_LIBERADA": return "#22c55e";
      default: return "#ef4444";
    }
  };

  const handleVisualItem = (id: any) => {
    setLoading(true);
    setTimeout(() => {
      navigate(`/portaria/controle/detalhes-registro?order=${id}`, { replace: false, state: { refresh: Date.now() } });
    }, 2000);
  };

  return (
    <Template.container>
      <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ mb: 3 }}>
        <Typography variant="h4" sx={{ fontWeight: 700, color: '#1e293b' }}>
          Histórico Portaria
        </Typography>

        {/* CONTROLES DE TAMANHO DA PLANILHA */}
        <Stack direction="row" spacing={1} sx={{ bgcolor: '#f1f5f9', p: 0.5, borderRadius: '8px' }}>
          <Tooltip title="Visualização Compacta">
            <IconButton 
              size="small" 
              onClick={() => setDensity('compact')}
              color={density === 'compact' ? 'primary' : 'default'}
            >
              <ViewHeadlineIcon fontSize="small" />
            </IconButton>
          </Tooltip>
          <Tooltip title="Visualização Padrão">
            <IconButton 
              size="small" 
              onClick={() => setDensity('standard')}
              color={density === 'standard' ? 'primary' : 'default'}
            >
              <ViewStreamIcon fontSize="small" />
            </IconButton>
          </Tooltip>
        </Stack>
      </Stack>

      <Paper elevation={0} sx={{ p: 2, borderRadius: '16px', border: '1px solid #e2e8f0' }}>
        <Template.FormSub>
          <Box sx={{
            display: 'flex',
            gap: 2,
            alignItems: 'center',
            flexWrap: 'wrap',
            bgcolor: '#f8fafc',
            p: 2,
            borderRadius: '12px'
          }}>
            <TextField
              variant="outlined"
              size="small"
              placeholder="Pesquisar..."
              value={busca}
              onChange={(e) => setBusca(e.target.value)}
              sx={{ bgcolor: 'white', minWidth: 250 }}
            />
            <SelectVariants value={selectedValue} onChange={setSelectedValue} titulo={"Status"} list={listaSelect} />
            <SelectVariants value={selectedFilial} onChange={setSelectedFilial} titulo={"Filial"} list={filiais} />

            <Tooltip title="Pesquisar">
              <IconButton
                onClick={() => onSubmit()}
                sx={{ bgcolor: '#6366f1', color: 'white', '&:hover': { bgcolor: '#4f46e5' } }}
              >
                <SearchIcon />
              </IconButton>
            </Tooltip>

            <Box sx={{ flexGrow: 1 }} />
            <Paginator totalPage={totaPage} handleNextPage={handleNextPage} />
          </Box>

          <Template.TableContainer>
            {/* PASSANDO A PROP DENSITY PARA O STYLED TABLE */}
            <Template.Table density={density}>
              <thead>
                <tr>
                  <th style={{ width: '100px' }}>Ações</th> {/* AÇÕES NO INÍCIO */}
                  <th>Visitante</th>
                  <th>Protocolo</th>
                  <th>Tipo / Placa</th>
                  <th>Acesso</th>
                  <th>Local</th>
                  <th>Status</th>
                  <th>Entrada</th>
                  <th>Saída</th>
                  <th>Fiscal E.</th>
                  <th>Fiscal S.</th>
                </tr>
              </thead>
              <tbody>
                {loading ? (
                  <Template.loadingRow>
                    <td colSpan={11}>
                      <Template.loadingContainer>
                        <CircularProgress size={28} />
                        <Typography variant="body2">Carregando...</Typography>
                      </Template.loadingContainer>
                    </td>
                  </Template.loadingRow>
                ) : lista.length === 0 ? (
                  <tr>
                    <td colSpan={11}>
                      <Template.semItens>
                        <Template.iconSemItens />
                        <Typography variant="h6">Nenhum registro</Typography>
                      </Template.semItens>
                    </td>
                  </tr>
                ) : (
                  lista.map((item, key) => (
                    <tr key={key}>
                      {/* CÉLULA DE AÇÕES NO INÍCIO */}
                      <td>
                        <Template.ActionCell>
                          <IconButton size="small" onClick={() => handleVisualItem(item.id)}>
                            <VisibilityIcon fontSize="inherit" />
                          </IconButton>
                          <IconButton size="small" onClick={() => hendleDelete(item)} color="error">
                            <DeleteIcon fontSize="inherit" />
                          </IconButton>
                          {item?.entrada?.imagem && (
                            <IconButton size="small" onClick={() => handleModalImg(item)} color="primary">
                              <ImageIcon fontSize="inherit" />
                            </IconButton>
                          )}
                        </Template.ActionCell>
                      </td>

                      <td>
                        <Stack direction="row" spacing={1} alignItems="center">
                          <Avatar
                            sx={{ 
                                width: density === 'compact' ? 28 : 40, 
                                height: density === 'compact' ? 28 : 40,
                                fontSize: '0.8rem'
                            }}
                            src={item?.visitante?.imagem}
                          />
                          <Box>
                            <Typography variant={density === 'compact' ? "caption" : "body2"} sx={{ fontWeight: 600 }}>
                                {item?.nomeCompleto || "---"}
                            </Typography>
                          </Box>
                        </Stack>
                      </td>
                      <td><Typography variant="caption" sx={{ fontWeight: 700 }}>#{item?.protocolo || '---'}</Typography></td>
                      <td>
                        <Typography variant="caption" display="block">{item?.visitante?.tipoPessoa}</Typography>
                        <Typography variant="caption" sx={{ bgcolor: '#f1f5f9', px: 0.5 }}>{item?.placaVeiculo}</Typography>
                      </td>
                      <td><Typography variant="caption">{item?.visitante?.recorrencia?.nome || "Normal"}</Typography></td>
                      <td>{item?.bloco}</td>
                      <td><Template.Chip color={retornaCorStatus(item?.status)}>{item?.status.replace("_", " ")}</Template.Chip></td>
                      <td><Typography variant="caption">{item?.entrada?.dataEntrada ? new Date(item.entrada.dataEntrada).toLocaleString() : "---"}</Typography></td>
                      <td><Typography variant="caption">{item?.saida?.dataSaida ? new Date(item.saida.dataSaida).toLocaleString() : "---"}</Typography></td>
                      <td><Typography variant="caption">{item?.entrada?.nomeFiscal || "---"}</Typography></td>
                      <td><Typography variant="caption">{item?.saida?.nomeFiscal || "---"}</Typography></td>
                    </tr>
                  ))
                )}
              </tbody>
            </Template.Table>
          </Template.TableContainer>
        </Template.FormSub>
      </Paper>

      {/* MODAL IMAGEM E POPUP (Mantidos) */}
      {exibeImagem && (
        <ModalGlobalComponent cancelar={() => setExibeImagem(false)}>
           <Box sx={{ p: 2 }}>
            <Typography variant="h6" sx={{ mb: 2 }}>Evidências</Typography>
            <Template.imagemArea>
              {['entrada', 'saida'].map((tipo) => item?.[tipo]?.imagem && (
                <Template.divArea key={tipo}>
                  <IconButton 
                    size="small" 
                    sx={{ position: 'absolute', right: 5, top: 5, bgcolor: 'white' }} 
                    onClick={() => handleExibeImagem(item?.[tipo]?.imagem, `Foto_${tipo}`)}
                  >
                    <DownloadIcon fontSize="small" />
                  </IconButton>
                  <Template.imgem src={item?.[tipo]?.imagem} />
                </Template.divArea>
              ))}
            </Template.imagemArea>
          </Box>
        </ModalGlobalComponent>
      )}

      {ativo && <PopupComponent handleCancel={() => setAtivo(false)} handleConfirm={handleDeleteHistory} message={msg} ativoBtn={ativoBtn} />}
    </Template.container>
  );
};