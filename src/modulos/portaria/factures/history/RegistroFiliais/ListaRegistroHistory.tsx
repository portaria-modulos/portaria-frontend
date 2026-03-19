import { useEffect, useState, useCallback, type MouseEvent } from "react";
import Template from "./registroFiliaisCss";
import SearchIcon from "@mui/icons-material/Search";
import Api from "../../../service/apiRegistro/apiRegistro";
import portariaApi from "../../../service/api";
import VisibilityIcon from '@mui/icons-material/Visibility';
import ImageIcon from '@mui/icons-material/Image';
import DeleteIcon from '@mui/icons-material/Delete';
import DownloadIcon from '@mui/icons-material/Download';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import FilterListIcon from "@mui/icons-material/FilterList";
import CloseIcon from "@mui/icons-material/Close";
import AddIcon from '@mui/icons-material/Add';
import { ModalGlobalComponent } from "../../../../../components/modalGlobal/modalGlobalComponent";
import { Paginator } from "../../../../../components/paginator/paginator";
import { useNavigate } from "react-router-dom";
import SelectVariants from "../../../../../components/select/selectFiltro";
import { PopupComponent } from "../../../../../components/popup/popupComponent";
import { subjet } from "../../../../../jwt/jwtservice";
import { Avatar, Box, CircularProgress, IconButton, Paper, Stack, Typography, Menu, MenuItem, ListItemIcon, ListItemText } from "@mui/material";
import apiUsuario from "../../../../PaginaInicial/service/apiUsuario";

// Lista de situações (Enums do Backend)
const LISTA_SITUACAO = [
  { nome: "Aguardando Entrada", value: "AGUARDANDO_ENTRADA" },
  { nome: "Entrada Liberada", value: "ENTRADA_LIBERADA" },
  { nome: "Aguardando Saída", value: "AGUARDANDO_SAIDA" },
  { nome: "Liberado (Saída)", value: "SAIDA_LIBERADA" },
  { nome: "Recusado", value: "RECUSADO" },
  { nome: "Fechado Automático", value: "FECHADO_AUTOMATICO" },
];

export const ListaRegistroComponent = () => {
  const navigate = useNavigate();
  const user = subjet();

  // Dados e Estados Principais
  const [lista, setLista] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [totaPage, setTotalPage] = useState(0);
  const [filiais, setFiliais] = useState<any[]>([]);

  // Filtros
  const [busca, setBusca] = useState("");
  const [statusAberto, setStatusAberto] = useState<any | null>(null); // Filtro Aberto/Fechado
  const [situacaoEnum, setSituacaoEnum] = useState<string | null>(null); // Filtro Situação (Enum)
  const [selectedFilial, setSelectedFilial] = useState<number | null>(user?.filial);
  const [dataFiltro, setDataFiltro] = useState("");
  const [showFilters, setShowFilters] = useState(false);

  // Modais e Menus
  const [ativo, setAtivo] = useState(false);
  const [id, setId] = useState("");
  const [msg, setMsg] = useState("");
  const [exibeImagem, setExibeImagem] = useState(false);
  const [item, setItem] = useState<any>();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [itemSelecionado, setItemSelecionado] = useState<any>(null);

  const onSubmit = useCallback(async (pageUnique?: any) => {
    if (loading) return; 
    setLoading(true);
    const situacaoParaEnviar = LISTA_SITUACAO.some(s => s.value === situacaoEnum) 
    ? situacaoEnum 
    : null;
    try {
      const resposta = await Api.findAll(
        selectedFilial as any, 
        busca, 
        statusAberto, 
        pageUnique, 
        dataFiltro,
        situacaoParaEnviar
      );
      
      if (resposta) {
        setLista(resposta.content || []);
        setTotalPage(resposta?.totalPages || 0);
      }
    } catch (error) {
      console.error("Erro ao buscar dados:", error);
    } finally {
      setLoading(false);
      setShowFilters(false);
    }
  }, [selectedFilial, busca, statusAberto, dataFiltro, situacaoEnum, loading]);

  useEffect(() => {
    const handler = setTimeout(() => { onSubmit(); }, 500);
    return () => clearTimeout(handler);
  }, [busca]);

  useEffect(() => {
    const carregarFiliais = async () => {
      const resposta = await apiUsuario.FiliaisUsuario(user?.id);
      if (resposta?.acess) setFiliais(resposta.acess);
    };
    carregarFiliais();
  }, [user?.id]);

  const handleOpenMenu = (event: MouseEvent<HTMLElement>, row: any) => {
    setAnchorEl(event.currentTarget);
    setItemSelecionado(row);
  };

  const handleCloseMenu = () => {
    setAnchorEl(null);
    setItemSelecionado(null);
  };

  const handleDelete = async () => {
    await portariaApi.deletarPortaria(id, user?.id);
    setAtivo(false);
    onSubmit();
  };

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
    // AGUARDANDO ENTRADA -> AZUL (Início do processo)
    if (status === "AGUARDANDO_ENTRADA") return "#3b82f6"; 
    
    // ENTRADA LIBERADA -> VERDE
    if (status === "ENTRADA_LIBERADA") return "#26a69a";
    
    // AGUARDANDO SAÍDA -> LARANJA (Alerta de pátio/ocupação)
    if (status === "AGUARDANDO_SAIDA") return "#d97706";
    
    // SAÍDA LIBERADA -> VERDE (Finalizado com sucesso)
    if (status === "SAIDA_LIBERADA") return "#26a69a";
    
    // RECUSADO OU FECHADO -> VERMELHO (Atenção/Interrupção)
    if (status === "RECUSADO") return "#ef4444";
    if (status === "FECHADO_AUTOMATICO") return "#ef4444";

    return "#3b82f6"; // Padrão azul
  };

  return (
    <Template.container>
      <Typography sx={{ fontSize: '1.25rem', fontWeight: 800, color: '#1a1a1a', mb: 1 }}>
        Histórico Portaria
      </Typography>

      <Paper elevation={0} sx={{ borderRadius: '12px', border: '1px solid #e6eeec', overflow: 'hidden', display: 'flex', flexDirection: 'column', flex: 1, position: 'relative' }}>
        <Template.Toolbar>
          <Template.MainBar>
            <div className="search-container">
              <SearchIcon className="icon-search" />
              <input 
                type="text" 
                placeholder="Busca por nome ou placa..." 
                value={busca} 
                onChange={(e) => setBusca(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && onSubmit()}
              />
            </div>

            <Stack direction="row" spacing={1}>
                <IconButton onClick={() => setShowFilters(!showFilters)} sx={{ bgcolor: showFilters ? '#26a69a' : '#f1f5f9', color: showFilters ? 'white' : '#26a69a', borderRadius: '8px' }}>
                    {showFilters ? <CloseIcon fontSize="small" /> : <FilterListIcon fontSize="small" />}
                </IconButton>
                <IconButton onClick={() => onSubmit()} sx={{ bgcolor: '#76b0fc', color: 'white', '&:hover': { bgcolor: '#4aa8f5' }, borderRadius: '8px' }}>
                    <SearchIcon fontSize="small" />
                </IconButton>
                <IconButton onClick={()=>navigate("/portaria/controle/registro-portaria-cd") } sx={{ bgcolor: '#2682a6', color: 'white', '&:hover': { bgcolor: '#39cabc' }, borderRadius: '8px' }}>
                    <AddIcon fontSize="small" />
                </IconButton>
            </Stack>
          </Template.MainBar>

          <Template.FloatingFilter isOpen={showFilters}>
             <Typography sx={{ fontSize: '0.7rem', fontWeight: 800, color: '#94a3b8', mb: 1.5, textTransform: 'uppercase', textAlign: 'center' }}>
                Filtros Avançados
             </Typography>
             
             <div className="filter-grid">
                <div className="filter-item">
                   <label>Status (Aberto/Fechado)</label>
                   <SelectVariants 
                      value={statusAberto} 
                      onChange={setStatusAberto} 
                      titulo={""} 
                      list={[{ nome: "Aberto", value: true }, { nome: "Fechado", value: false }]} 
                   />
                </div>
                <div className="filter-item">
                   <label>Situação da Entrada</label>
                   <SelectVariants value={situacaoEnum} onChange={setSituacaoEnum} titulo={""} list={LISTA_SITUACAO} />
                </div>
                <div className="filter-item">
                   <label>Filial</label>
                   <SelectVariants value={selectedFilial} onChange={setSelectedFilial} titulo={""} list={filiais} />
                </div>
                <div className="filter-item">
                  <label>Data de Registro</label>
                  <Template.InputData type="date" value={dataFiltro} onChange={(e) => setDataFiltro(e.target.value)} />
                </div>
             </div>

             <Template.BtnAction onClick={() => onSubmit()}>
                Aplicar Filtros
             </Template.BtnAction>
          </Template.FloatingFilter>
        </Template.Toolbar>

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
                <th>Situação</th>
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
                  <td><Template.Chip color={retornaCorStatus(row?.status)}>{row?.status?.replace(/_/g, " ")}</Template.Chip></td>
                  <td><Typography sx={{ fontSize: '0.7rem' }}>{row?.entrada?.dataEntrada ? new Date(row.entrada.dataEntrada).toLocaleString() : "---"} {row?.entrada?.filial}</Typography></td>
                  <td><Typography sx={{ fontSize: '0.7rem' }}>{row?.saida?.dataSaida ? new Date(row.saida.dataSaida).toLocaleString() : "---"}</Typography></td>
                </tr>
              ))}
            </tbody>
          </Template.Table>
        </Template.TableContainer>

        <Box sx={{ p: 1, borderTop: '1px solid #eee', display: 'flex', justifyContent: 'flex-end' }}>
             <Paginator totalPage={totaPage} handleNextPage={(_: any, v: number) => onSubmit(v - 1)} />
        </Box>
      </Paper>

      {/* MENU DE AÇÕES */}
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

      {/* MODAL DE FOTOS/EVIDÊNCIAS */}
      {exibeImagem && (
        <ModalGlobalComponent cancelar={() => setExibeImagem(false)}>
          <Box sx={{ p: 2 }}>
            <Typography variant="subtitle1" sx={{ fontWeight: 800, mb: 2 }}>Evidências: {item?.visitante?.nomeCompleto}</Typography>
            <Template.imagemArea>
              {['entrada', 'saida'].map((tipo) => (
                item?.[tipo]?.imagem && (
                  <Template.divArea key={tipo}>
                    <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ mb: 1 }}>
                      <Typography variant="caption" sx={{ fontWeight: 800, color: '#26a69a' }}>{tipo}</Typography>
                      <IconButton size="small" onClick={() => handleDownload(item[tipo].imagem, `Foto_${tipo}`)}><DownloadIcon fontSize="small" /></IconButton>
                    </Stack>
                    <Template.imgem src={item[tipo].imagem} />
                  </Template.divArea>
                )
              ))}
            </Template.imagemArea>
          </Box>
        </ModalGlobalComponent>
      )}

      {/* POPUP DE CONFIRMAÇÃO DE DELETE */}
      {ativo && <PopupComponent handleCancel={() => setAtivo(false)} handleConfirm={handleDelete} message={msg} ativoBtn={true} />}
    </Template.container>
  );
};