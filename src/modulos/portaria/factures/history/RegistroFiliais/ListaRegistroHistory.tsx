import { useEffect, useState, type MouseEvent } from "react";
import Template from "./registroFiliaisCss";
import SearchIcon from "@mui/icons-material/Search";
import Api from "../../../service/apiRegistro/apiRegistro";
import portariaApi from "../../../service/api";
import VisibilityIcon from '@mui/icons-material/Visibility';
import ImageIcon from '@mui/icons-material/Image';
import DeleteIcon from '@mui/icons-material/Delete';
import DownloadIcon from '@mui/icons-material/Download';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { ModalGlobalComponent } from "../../../../../components/modalGlobal/modalGlobalComponent";
import { Paginator } from "../../../../../components/paginator/paginator";
import { useNavigate } from "react-router-dom";
import SelectVariants from "../../../../../components/select/selectFiltro";
import { PopupComponent } from "../../../../../components/popup/popupComponent";
import AddIcon from '@mui/icons-material/Add';
import { subjet } from "../../../../../jwt/jwtservice";
import { Avatar, Box, CircularProgress, IconButton, Paper, Stack, Tooltip, Typography, Menu, MenuItem, ListItemIcon, ListItemText } from "@mui/material";
import apiUsuario from "../../../../PaginaInicial/service/apiUsuario";

export const ListaRegistroComponent = () => {
  const [lista, setLista] = useState<any[]>([]);
  const [ativo, setAtivo] = useState(false);
  const [id, setId] = useState("");
  const navigate = useNavigate();
  const [busca, setBusca] = useState("");
  const [msg, setMsg] = useState("");
  const user = subjet();
  const [exibeImagem, setExibeImagem] = useState(false);
  const [loading, setLoading] = useState(false);
  const [selectedValue, setSelectedValue] = useState<any | null>(null);
  const [selectedFilial, setSelectedFilial] = useState<number | null>(user?.filial);
  const [totaPage, setTotalPage] = useState(0);
  const [item, setItem] = useState<any>();
  const [filiais, setFiliais] = useState<any[]>([]);

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [itemSelecionado, setItemSelecionado] = useState<any>(null);

  const handleOpenMenu = (event: MouseEvent<HTMLElement>, row: any) => {
    setAnchorEl(event.currentTarget);
    setItemSelecionado(row);
  };

  const handleCloseMenu = () => {
    setAnchorEl(null);
    setItemSelecionado(null);
  };

  const onSubmit = async (pageUnique?: any) => {
    setLoading(true);
    const resposta = await Api.findAll(selectedFilial as any, busca, selectedValue as any, pageUnique);
    if (resposta) {
      setLista(resposta.content);
      setTotalPage(resposta?.totalPages);
    }
    setLoading(false);
  };

  useEffect(() => { if (busca.trim() === "") onSubmit(); }, [busca]);

  useEffect(() => {
    const carregarFiliais = async () => {
      const resposta = await apiUsuario.FiliaisUsuario(user?.id);
      if (resposta?.acess) setFiliais(resposta.acess);
    };
    carregarFiliais();
  }, []);

  const handleDelete = async () => {
    await portariaApi.deletarPortaria(id, user?.id);
    setAtivo(false);
    onSubmit();
  };

  // FUNÇÃO DE DOWNLOAD RESTAURADA
  const handleDownload = async (imagem: string, nomeArquivo: string) => {
    const response = await fetch(imagem);
    const blob = await response.blob();
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `${nomeArquivo}.jpg`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    window.URL.revokeObjectURL(url);
  };

  const retornaCorStatus = (status: any) => {
    if (status === "SAIDA_LIBERADA") return "#26a69a";
    if (status === "AGUARDANDO_SAIDA") return "#d97706";
    return "#3b82f6";
  };

  return (
    <Template.container>
      <Typography sx={{ fontSize: '1.25rem', fontWeight: 800, color: '#1a1a1a', letterSpacing: '-0.02em' }}>Histórico Portaria</Typography>

      <Paper elevation={0} sx={{ borderRadius: '12px', border: '1px solid #e6eeec', overflow: 'hidden' }}>
        <Template.FormSub>
          <Template.CamposInput>
            <div className="search-container">
              <SearchIcon />
              <input type="text" placeholder="Busca..." value={busca} onChange={(e) => setBusca(e.target.value)} />
            </div>

            <SelectVariants value={selectedValue} onChange={setSelectedValue} titulo={"Status"} list={[{ nome: "Aberto", value: true }, { nome: "Fechado", value: false }]} />
            <SelectVariants value={selectedFilial} onChange={setSelectedFilial} titulo={"Filial"} list={filiais} />

            <IconButton onClick={() => onSubmit()} sx={{ bgcolor: '#76b0fc', color: 'white', '&:hover': { bgcolor: '#4aa8f5' }, borderRadius: '8px' }}>
              <SearchIcon fontSize="small" />
            </IconButton>

            <IconButton onClick={()=>navigate("/portaria/controle/registro-portaria-cd") } sx={{ bgcolor: '#2682a6', color: 'white', '&:hover': { bgcolor: '#39cabc' }, borderRadius: '8px' }}>
              <AddIcon fontSize="small" />
            </IconButton>

            <Box sx={{ flexGrow: 1 }} />
            <Paginator totalPage={totaPage} handleNextPage={(_: any, v: number) => onSubmit(v - 1)} />
          </Template.CamposInput>

          <Template.TableContainer>
            <Template.Table>
              <thead>
                <tr>
                  <th style={{ textAlign: 'right' }}>Ações</th>
                  <th>Visitante</th>
                  <th>Protocolo</th>
                  <th>Tipo / Placa</th>
                  <th>Ocupação / Recorrência</th>
                  <th>Local</th>
                  <th>Status</th>
                  <th>Entrada / Filal</th>
                  <th>Saída</th>
                </tr>
              </thead>
              <tbody>
                {loading ? (
                  <Template.loadingRow><td colSpan={9}><CircularProgress size={24} sx={{ color: '#26a69a' }} /></td></Template.loadingRow>
                ) : lista.map((row, key) => (
                  <tr key={key}>
                    <td>
                      <Template.trBTN>
                        <IconButton size="small" onClick={(e) => handleOpenMenu(e, row)}><MoreVertIcon sx={{ fontSize: 20 }} /></IconButton>
                      </Template.trBTN>
                    </td>
                    <td>
                      <Stack direction="row" spacing={1.5} alignItems="center">
                        <Avatar sx={{ width: 34, height: 34, fontSize: '0.8rem', fontWeight: 700 }} src={row?.visitante?.imagem} />
                        <Box>
                          <Typography sx={{ fontWeight: 700, fontSize: '0.82rem' }}>{row?.nomeCompleto || "---"}</Typography>
                          <Typography sx={{ fontSize: '0.68rem', color: '#4a635d' }}>{row?.filialSocitado}</Typography>
                        </Box>
                      </Stack>
                    </td>
                    <td><Typography sx={{ fontFamily: 'monospace', fontWeight: 700, fontSize: '0.75rem', color: '#26a69a' }}>#{row?.protocolo}</Typography></td>
                    <td>
                      <Typography sx={{ fontSize: '0.8rem' }}>{row?.visitante?.tipoPessoa}</Typography>
                      <Typography sx={{ fontSize: '0.68rem', color: '#26a69a', fontWeight: 800 }}>{row?.placaVeiculo || "SEM VEÍCULO"}</Typography>
                    </td>
                    <td>
                      <Typography sx={{ fontSize: '0.8rem' }}>{row?.ocupacaoLiberada || "---"}</Typography>
                      <Typography sx={{ fontSize: '0.68rem', color: '#4a635d' }}>{row?.visitante?.recorrencia?.nome || "---"}</Typography>
                    </td>
                    <td><Typography sx={{ fontSize: '0.8rem' }}>{row?.bloco}</Typography></td>
                    <td><Template.Chip color={retornaCorStatus(row?.status)}>{row?.status.replace("_", " ")}</Template.Chip></td>
                    <td><Typography sx={{ fontSize: '0.7rem' }}>{row?.entrada?.dataEntrada ? new Date(row.entrada.dataEntrada).toLocaleString() : "---"} {row?.entrada?.filial}</Typography></td>
                    <td><Typography sx={{ fontSize: '0.7rem' }}>{row?.saida?.dataSaida ? new Date(row.saida.dataSaida).toLocaleString() : "---"}</Typography></td>
                  </tr>
                ))}
              </tbody>
            </Template.Table>
          </Template.TableContainer>
        </Template.FormSub>
      </Paper>

      <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleCloseMenu}>
        <MenuItem onClick={() => { navigate(`/portaria/controle/detalhes-registro?order=${itemSelecionado.id}`); handleCloseMenu(); }}>
          <ListItemIcon><VisibilityIcon fontSize="small" /></ListItemIcon>
          <ListItemText primaryTypographyProps={{ fontSize: '0.85rem' }}>Ver Detalhes</ListItemText>
        </MenuItem>
        <MenuItem onClick={() => { setItem(itemSelecionado); setExibeImagem(true); handleCloseMenu(); }}>
          <ListItemIcon><ImageIcon fontSize="small" sx={{ color: '#26a69a' }} /></ListItemIcon>
          <ListItemText primaryTypographyProps={{ fontSize: '0.85rem' }}>Ver Fotos</ListItemText>
        </MenuItem>
        <MenuItem onClick={() => { setId(itemSelecionado.id); setMsg(`Deseja excluir o registro ${itemSelecionado.id}?`); setAtivo(true); handleCloseMenu(); }}>
          <ListItemIcon><DeleteIcon fontSize="small" color="error" /></ListItemIcon>
          <ListItemText primaryTypographyProps={{ fontSize: '0.85rem', color: 'error.main' }}>Deletar</ListItemText>
        </MenuItem>
      </Menu>

      {/* MODAL DE IMAGENS COM DOWNLOAD RESTAURADO */}
      {exibeImagem && (
        <ModalGlobalComponent cancelar={() => setExibeImagem(false)}>
          <Box sx={{ p: 2 }}>
            <Typography variant="subtitle1" sx={{ fontWeight: 800, color: '#1a1a1a', mb: 2 }}>
              Evidências: {item?.visitante?.nomeCompleto}
            </Typography>
            <Template.imagemArea>
              {['entrada', 'saida'].map((tipo) => (
                item?.[tipo]?.imagem && (
                  <Template.divArea key={tipo}>
                    <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ mb: 1 }}>
                      <Typography variant="caption" sx={{ fontWeight: 800, textTransform: 'uppercase', color: '#26a69a' }}>{tipo}</Typography>
                      <Tooltip title="Baixar Foto">
                        <IconButton size="small" onClick={() => handleDownload(item[tipo].imagem, `Foto_${tipo}_${item.nomeCompleto}`)}>
                          <DownloadIcon fontSize="small" sx={{ color: '#26a69a' }} />
                        </IconButton>
                      </Tooltip>
                    </Stack>
                    <Template.imgem src={item[tipo].imagem} />
                  </Template.divArea>
                )
              ))}
            </Template.imagemArea>
          </Box>
        </ModalGlobalComponent>
      )}

      {ativo && <PopupComponent handleCancel={() => setAtivo(false)} handleConfirm={handleDelete} message={msg} ativoBtn={true} />}
    </Template.container>
  );
};