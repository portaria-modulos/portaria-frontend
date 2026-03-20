import { useEffect, useState, useCallback, useMemo, type MouseEvent } from "react";
import Template from "../../history/RegistroFiliais/registroFiliaisCss";
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
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import SortIcon from '@mui/icons-material/Sort';
import { 
  useReactTable, 
  getCoreRowModel, 
  getSortedRowModel, 
  flexRender, 
  createColumnHelper,
  type SortingState
} from "@tanstack/react-table";
import { ModalGlobalComponent } from "../../../../../components/modalGlobal/modalGlobalComponent";
import { Paginator } from "../../../../../components/paginator/paginator";
import { useNavigate, useParams } from "react-router-dom";
import SelectVariants from "../../../../../components/select/selectFiltro";
import { PopupComponent } from "../../../../../components/popup/popupComponent";
import { subjet } from "../../../../../jwt/jwtservice";
import { Avatar, Box, CircularProgress, IconButton, Paper, Stack, Typography, Menu, MenuItem, ListItemIcon, ListItemText } from "@mui/material";
const LISTA_SITUACAO = [
  { nome: "Aguardando Entrada", value: "AGUARDANDO_ENTRADA" },
  { nome: "Entrada Liberada", value: "ENTRADA_LIBERADA" },
  { nome: "Aguardando Saída", value: "AGUARDANDO_SAIDA" },
  { nome: "Liberado (Saída)", value: "SAIDA_LIBERADA" },
  { nome: "Recusado", value: "RECUSADO" },
  { nome: "Fechado Automático", value: "FECHADO_AUTOMATICO" },
];

const columnHelper = createColumnHelper<any>();

export const ListaEntradasVisitantes = () => {
  const navigate = useNavigate();
  const user = subjet();

  const [lista, setLista] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [totaPage, setTotalPage] = useState(0);
  const [busca, setBusca] = useState("");
  const [statusAberto, setStatusAberto] = useState<any | null>(null); 
  const [situacaoEnum, setSituacaoEnum] = useState<string | null>(null); 
  const [dataFiltro, setDataFiltro] = useState("");
  const [dataAntes, setDataDepois] = useState("");
  const [showFilters, setShowFilters] = useState(false);
   const params = useParams()

  const [ativo, setAtivo] = useState(false);
  const [id, setId] = useState("");
  const [msg, setMsg] = useState("");
  const [exibeImagem, setExibeImagem] = useState(false);
  const [item, setItem] = useState<any>();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [itemSelecionado, setItemSelecionado] = useState<any>(null);

  const [sorting, setSorting] = useState<SortingState>([]);

  const onSubmit = useCallback(async (___pageUnique?: any) => {
    if (loading) return; 
    setLoading(true);
    try {
      const resposta = await Api.buscaEntradaUnicaVisitante(params.id, dataAntes, dataFiltro);
      if (resposta) {
        setLista(resposta.content || []);
        setTotalPage(resposta?.totalPages || 0);
      }
    } catch (error) { console.error(error); }
    finally { setLoading(false); setShowFilters(false); }
  }, [busca, statusAberto, dataFiltro, situacaoEnum, loading]);

  useEffect(() => {
    const handler = setTimeout(() => { onSubmit(); }, 500);
    return () => clearTimeout(handler);
  }, [busca]);


  const handleOpenMenu = (event: MouseEvent<HTMLElement>, row: any) => {
    setAnchorEl(event.currentTarget);
    setItemSelecionado(row);
  };

  const handleCloseMenu = () => { setAnchorEl(null); setItemSelecionado(null); };

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
    link.click();
    window.URL.revokeObjectURL(url);
  };

  const retornaCorStatus = (status: any) => {
    const cores: any = { AGUARDANDO_ENTRADA: "#3b82f6", ENTRADA_LIBERADA: "#26a69a", AGUARDANDO_SAIDA: "#d97706", SAIDA_LIBERADA: "#26a69a", RECUSADO: "#ef4444", FECHADO_AUTOMATICO: "#ef4444" };
    return cores[status] || "#3b82f6";
  };

  const columns = useMemo(() => [
    columnHelper.display({
      id: 'acoes',
      header: 'Ações',
      size: 50,
      cell: info => (
        <Template.trBTN>
          <IconButton size="small" onClick={(e) => handleOpenMenu(e, info.row.original)}>
            <MoreVertIcon sx={{ fontSize: 18 }} />
          </IconButton>
        </Template.trBTN>
      ),
    }),
    columnHelper.accessor('nomeCompleto', {
      header: 'Visitante',
      size: 250,
      cell: info => (
        <Stack direction="row" spacing={1.5} alignItems="center">
          <Avatar sx={{ width: 34, height: 34, fontSize: '0.8rem', fontWeight: 700 }} src={info.row.original?.visitante?.imagem} />
          <Box>
            <Typography sx={{ fontWeight: 700, fontSize: '0.82rem' }}>{info.getValue() || "---"}</Typography>
            <Typography sx={{ fontSize: '0.68rem', color: '#4a635d' }}>{info.row.original?.filialSocitado}</Typography>
          </Box>
        </Stack>
      ),
    }),
    columnHelper.accessor('protocolo', {
      header: 'Protocolo',
      size: 100,
      cell: info => <Typography sx={{ fontFamily: 'monospace', fontWeight: 700, fontSize: '0.75rem', color: '#26a69a' }}>#{info.getValue()}</Typography>,
    }),
    columnHelper.display({
      id: 'tipoPlaca',
      header: 'Tipo / Placa',
      size: 140,
      cell: info => (
        <Box>
          <Typography sx={{ fontSize: '0.8rem' }}>{info.row.original?.visitante?.tipoPessoa}</Typography>
          <Typography sx={{ fontSize: '0.68rem', color: '#26a69a', fontWeight: 800 }}>{info.row.original?.placaVeiculo || "SEM VEÍCULO"}</Typography>
        </Box>
      ),
    }),
    columnHelper.display({
      id: 'ocupacaoRecorrencia',
      header: 'Ocupação / Recorrência',
      size: 180,
      cell: info => (
        <Box>
          <Typography sx={{ fontSize: '0.8rem' }}>{info.row.original?.ocupacaoLiberada || "---"}</Typography>
          <Typography sx={{ fontSize: '0.68rem', color: '#4a635d' }}>{info.row.original?.visitante?.recorrencia?.nome || "---"}</Typography>
        </Box>
      ),
    }),
    columnHelper.accessor('status', {
      header: 'Situação',
      size: 150,
      cell: info => <Template.Chip color={retornaCorStatus(info.getValue())}>{info.getValue()?.replace(/_/g, " ")}</Template.Chip>,
    }),
    columnHelper.accessor('entrada.dataEntrada', {
      header: 'Data Entrada',
      size: 150,
      cell: info => <Typography sx={{ fontSize: '0.75rem' }}>{info.getValue() ? new Date(info.getValue()).toLocaleString() : "---"}</Typography>,
    }),
    columnHelper.accessor('saida.dataSaida', {
      header: 'Data Saída',
      size: 150,
      cell: info => <Typography sx={{ fontSize: '0.75rem' }}>{info.getValue() ? new Date(info.getValue()).toLocaleString() : "---"}</Typography>,
    }),
    columnHelper.accessor('entrada.nomeFiscal', {
      header: 'Fisca Entrada',
      size: 120,
      cell: info => <Typography sx={{ fontSize: '0.75rem', fontWeight: 600, color: '#4a635d' }}>{info.getValue() || "---"}</Typography>,
    }),
    columnHelper.accessor('saida.nomeFiscal', {
      header: 'Fiscal Saída',
      size: 120,
      cell: info => <Typography sx={{ fontSize: '0.75rem', fontWeight: 600, color: '#4a635d' }}>{info.getValue() || "---"}</Typography>,
    }),
  ], []);

  const table = useReactTable({
    data: lista,
    columns,
    state: { sorting },
    onSortingChange: setSorting,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    columnResizeMode: "onChange",
  });

  return (
    <Template.container>
      <Typography sx={{ fontSize: '1.25rem', fontWeight: 800, color: '#1a1a1a', mb: 1 }}>Histórico Portaria</Typography>

      <Paper elevation={0} sx={{ borderRadius: '12px', border: '1px solid #e6eeec', overflow: 'hidden', display: 'flex', flexDirection: 'column', flex: 1 }}>
        <Template.Toolbar>
          <Template.MainBar>
            <div className="search-container">
              <SearchIcon />
              <input type="text" placeholder="Busca por nome, protocolo ou placa..." value={busca} onChange={(e) => setBusca(e.target.value)} />
            </div>
            <Stack direction="row" spacing={1}>
                <IconButton onClick={() => setShowFilters(!showFilters)} sx={{ bgcolor: showFilters ? '#26a69a' : '#f1f5f9', color: showFilters ? 'white' : '#26a69a' }}>
                    {showFilters ? <CloseIcon fontSize="small" /> : <FilterListIcon fontSize="small" />}
                </IconButton>
                <IconButton onClick={() => onSubmit()} sx={{ bgcolor: '#76b0fc', color: 'white' }}><SearchIcon fontSize="small" /></IconButton>
                <IconButton onClick={()=>navigate("/portaria/controle/registro-portaria-cd") } sx={{ bgcolor: '#2682a6', color: 'white' }}><AddIcon fontSize="small" /></IconButton>
            </Stack>
          </Template.MainBar>

          <Template.FloatingFilter isOpen={showFilters}>
              <Template.FilterGroup>
                <Template.FilterLabel>Status do Registro</Template.FilterLabel>
                <SelectVariants value={statusAberto} onChange={setStatusAberto} titulo={undefined} list={[{ nome: "Aberto", value: true }, { nome: "Fechado", value: false }]} />
              </Template.FilterGroup>

              <Template.FilterGroup>
                <Template.FilterLabel>Situação Atual</Template.FilterLabel>
                <SelectVariants value={situacaoEnum} onChange={setSituacaoEnum} list={LISTA_SITUACAO} titulo={undefined}/>
              </Template.FilterGroup>
              <Template.FilterGroup>
                <Template.FilterLabel>Data antes</Template.FilterLabel>
                <Template.InputData type="date" value={dataAntes} onChange={(e:any) => setDataDepois(e.target.value)} />
              </Template.FilterGroup>
              <Template.FilterGroup>
                <Template.FilterLabel>Data depois</Template.FilterLabel>
                <Template.InputData type="date" value={dataFiltro} onChange={(e:any) => setDataFiltro(e.target.value)} />
              </Template.FilterGroup>           
             <Stack direction="row" spacing={1} sx={{ mt: 1 }}>
                <Template.BtnClear onClick={() => {setBusca(""); setStatusAberto(null); setSituacaoEnum(null); setDataFiltro("");}}>Limpar</Template.BtnClear>
                <Template.BtnAction onClick={() => onSubmit()}>Filtrar</Template.BtnAction>
             </Stack>
          </Template.FloatingFilter>
        </Template.Toolbar>

        <Template.TableContainer>
          <Template.Table style={{ width: table.getTotalSize() }}>
            <thead>
              {table.getHeaderGroups().map(headerGroup => (
                <tr key={headerGroup.id}>
                  {headerGroup.headers.map(header => (
                    <th key={header.id} style={{ width: header.getSize() }}>
                      <div 
                        className="header-content"
                        onClick={header.column.getToggleSortingHandler()}
                      >
                        {flexRender(header.column.columnDef.header, header.getContext())}
                        {header.column.getCanSort() && (
                          <Box sx={{ display: 'flex', color: header.column.getIsSorted() ? '#26a69a' : '#cbd5e1' }}>
                            {header.column.getIsSorted() === 'asc' ? <ArrowUpwardIcon sx={{ fontSize: 14 }} /> : 
                             header.column.getIsSorted() === 'desc' ? <ArrowDownwardIcon sx={{ fontSize: 14 }} /> : 
                             <SortIcon sx={{ fontSize: 14, opacity: 0.5 }} />}
                          </Box>
                        )}
                      </div>
                      <Template.Resizer
                        onMouseDown={header.getResizeHandler()}
                        onTouchStart={header.getResizeHandler()}
                        isResizing={header.column.getIsResizing()}
                      />
                    </th>
                  ))}
                </tr>
              ))}
            </thead>
            <tbody>
              {loading ? (
                <Template.loadingRow><td colSpan={columns.length}><CircularProgress size={24} sx={{ color: '#26a69a' }} /></td></Template.loadingRow>
              ) : table.getRowModel().rows.map(row => (
                <tr key={row.id}>
                  {row.getVisibleCells().map(cell => (
                    <td key={cell.id} style={{ width: cell.column.getSize() }}>
                      {flexRender(cell.column.columnDef.cell, cell.getContext())}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </Template.Table>
        </Template.TableContainer>

        <Box sx={{ p: 1, borderTop: '1px solid #eee', display: 'flex', justifyContent: 'flex-end' }}>
             <Paginator totalPage={totaPage} handleNextPage={(_: any, v: number) => onSubmit(v - 1)} />
        </Box>
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
        <MenuItem onClick={() => { setId(itemSelecionado.id); setMsg(`Deseja excluir o registro?`); setAtivo(true); handleCloseMenu(); }}>
          <ListItemIcon><DeleteIcon fontSize="small" color="error" /></ListItemIcon>
          <ListItemText primaryTypographyProps={{ fontSize: '0.85rem', color: 'error.main' }}>Deletar</ListItemText>
        </MenuItem>
      </Menu>

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

      {ativo && <PopupComponent handleCancel={() => setAtivo(false)} handleConfirm={handleDelete} message={msg} ativoBtn={true} />}
    </Template.container>
  );
};