import { useEffect, useState, useCallback, useMemo, type MouseEvent } from "react";
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
import { useNavigate } from "react-router-dom";
import SelectVariants from "../../../../../components/select/selectFiltro";
import { PopupComponent } from "../../../../../components/popup/popupComponent";
import { subjet } from "../../../../../jwt/jwtservice";
import {Box, CircularProgress, IconButton, Paper, Stack, Typography, Menu, MenuItem, ListItemIcon, ListItemText } from "@mui/material";
import apiUsuario from "../../../../PaginaInicial/service/apiUsuario";

const LISTA_SITUACAO = [
  { nome: "Aguardando Entrada", value: "AGUARDANDO_ENTRADA" },
  { nome: "Entrada Liberada", value: "ENTRADA_LIBERADA" },
  { nome: "Aguardando Saída", value: "AGUARDANDO_SAIDA" },
  { nome: "Liberado (Saída)", value: "SAIDA_LIBERADA" },
  { nome: "Recusado", value: "RECUSADO" },
  { nome: "Fechado Automático", value: "FECHADO_AUTOMATICO" },
];

const columnHelper = createColumnHelper<any>();

const retornaCorStatus = (status: any) => {
  const cores: any = {
    AGUARDANDO_ENTRADA: "#4f46e5",
    ENTRADA_LIBERADA: "#10b981",
    AGUARDANDO_SAIDA: "#f59e0b",
    SAIDA_LIBERADA: "#10b981",
    RECUSADO: "#ef4444",
    FECHADO_AUTOMATICO: "#ef4444",
  };
  return cores[status] || "#4f46e5";
};

const retornaLabelStatus = (status: any) => {
  const labels: any = {
    AGUARDANDO_ENTRADA: "Aguardando",
    ENTRADA_LIBERADA: "Liberado",
    AGUARDANDO_SAIDA: "Em Visita",
    SAIDA_LIBERADA: "Finalizado",
    RECUSADO: "Recusado",
    FECHADO_AUTOMATICO: "Fechado",
  };
  return labels[status] || status;
};

const getInitials = (name: string) => {
  if (!name) return "?";
  const parts = name.trim().split(" ");
  return parts.length > 1
    ? (parts[0][0] + parts[parts.length - 1][0]).toUpperCase()
    : parts[0][0].toUpperCase();
};

const avatarColors = ["#4f46e5", "#10b981", "#f59e0b", "#ef4444", "#8b5cf6", "#06b6d4", "#ec4899"];
const getAvatarColor = (name: string) => {
  if (!name) return avatarColors[0];
  let hash = 0;
  for (let i = 0; i < name.length; i++) hash = name.charCodeAt(i) + ((hash << 5) - hash);
  return avatarColors[Math.abs(hash) % avatarColors.length];
};

// const formatDate = (dateStr: string) => {
//   if (!dateStr) return "---";
//   const d = new Date(dateStr);
//   return d.toLocaleDateString("pt-BR", { day: "2-digit", month: "2-digit", year: "2-digit" });
// };

export const ListaRegistroComponent = () => {
  const navigate = useNavigate();
  const user = subjet();

  const [lista, setLista] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [totaPage, setTotalPage] = useState(0);
  const [totalElements, setTotalElements] = useState(0);
  const [filiais, setFiliais] = useState<any[]>([]);

  const [busca, setBusca] = useState("");
  const [statusAberto, setStatusAberto] = useState<any | null>(null);
  const [situacaoEnum, setSituacaoEnum] = useState<string | null>(null);
  const [selectedFilial, setSelectedFilial] = useState<number | null>(user?.filial);
  const [dataFiltro, setDataFiltro] = useState("");
  const [showFilters, setShowFilters] = useState(false);

  const [ativo, setAtivo] = useState(false);
  const [id, setId] = useState("");
  const [msg, setMsg] = useState("");
  const [exibeImagem, setExibeImagem] = useState(false);
  const [item, setItem] = useState<any>();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [itemSelecionado, setItemSelecionado] = useState<any>(null);

  const [sorting, setSorting] = useState<SortingState>([]);

  const onSubmit = useCallback(async (pageUnique?: any) => {
    if (loading) return;
    setLoading(true);
    try {
      const resposta = await Api.findAll(selectedFilial as any, busca, statusAberto, pageUnique, dataFiltro, situacaoEnum);
      if (resposta) {
        setLista(resposta.content || []);
        setTotalPage(resposta?.totalPages || 0);
        setTotalElements(resposta?.totalElements || 0);
      }
    } catch (error) { console.error(error); }
    finally { setLoading(false); setShowFilters(false); }
  }, [selectedFilial, busca, statusAberto, dataFiltro, situacaoEnum, loading]);

  useEffect(() => {
    const handler = setTimeout(() => { onSubmit(); }, 500);
    return () => clearTimeout(handler);
  }, [busca]);

  useEffect(() => {
    apiUsuario.FiliaisUsuario(user?.id).then(res => { if (res?.acess) setFiliais(res.acess); });
  }, [user?.id]);

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

  const columns = useMemo(() => [
    columnHelper.accessor('protocolo', {
      header: 'N°',
      size: 70,
      cell: info => (
        <Typography sx={{ fontFamily: 'monospace', fontWeight: 700, fontSize: '0.82rem', color: '#4f46e5' }}>
          #{info.getValue()}
        </Typography>
      ),
    }),
    columnHelper.accessor('nomeCompleto', {
      header: 'Visitante',
      size: 220,
      cell: info => (
        <Typography sx={{ fontWeight: 600, fontSize: '0.82rem', color: '#1a1a2e' }}>
          {info.getValue() || "---"}
        </Typography>
      ),
    }),
    columnHelper.accessor('status', {
      header: 'Status',
      size: 120,
      cell: info => (
        <Template.StatusBadge color={retornaCorStatus(info.getValue())}>
          {retornaLabelStatus(info.getValue())}
        </Template.StatusBadge>
      ),
    }),
    columnHelper.display({
      id: 'tipoPlaca',
      header: 'Tipo / Placa',
      size: 150,
      cell: info => (
        <Box>
          <Typography sx={{ fontSize: '0.8rem', fontWeight: 500, color: '#1a1a2e' }}>
            {info.row.original?.visitante?.tipoPessoa || "---"}
          </Typography>
          <Typography sx={{ fontSize: '0.68rem', color: '#4f46e5', fontWeight: 700 }}>
            {info.row.original?.placaVeiculo || "SEM VEÍCULO"}
          </Typography>
        </Box>
      ),
    }),
    columnHelper.display({
      id: 'ocupacao',
      header: 'Ocupação',
      size: 160,
      cell: info => (
        <Typography sx={{ fontSize: '0.8rem', color: '#1a1a2e' }}>
          {info.row.original?.ocupacaoLiberada || "---"}
        </Typography>
      ),
    }),
    columnHelper.display({
      id: 'filialInfo',
      header: 'Filial',
      size: 140,
      cell: info => (
        <Typography sx={{ fontSize: '0.8rem', color: '#1a1a2e' }}>
          {info.row.original?.filialSocitado || "---"}
        </Typography>
      ),
    }),
    columnHelper.display({
      id: 'criador',
      header: 'Criado Por',
      size: 140,
      cell: info => {
        const nome = info.row.original?.criador?.nome || info.row.original?.nomeCompleto || "---";
        return (
          <Template.CreatorCell>
            <Template.CreatorAvatar color={getAvatarColor(nome)}>
              {getInitials(nome)}
            </Template.CreatorAvatar>
            <Typography sx={{ fontSize: '0.8rem', fontWeight: 600, color: '#1a1a2e' }}>
              {nome.split(" ")[0]}
            </Typography>
          </Template.CreatorCell>
        );
      },
    }),
    columnHelper.display({
      id: 'recorrencia',
      header: 'Recorrência',
      size: 130,
      cell: info => (
        <Typography sx={{ fontSize: '0.78rem', color: '#8e8ea0' }}>
          {info.row.original?.visitante?.recorrencia?.nome || "---"}
        </Typography>
      ),
    }),
    columnHelper.accessor('entrada.dataEntrada', {
      header: 'Data Entrada',
      size: 150,
      cell: info => (
        <Typography sx={{ fontSize: '0.75rem', color: '#1a1a2e' }}>
          {info.getValue() ? new Date(info.getValue()).toLocaleString() : "---"}
        </Typography>
      ),
    }),
    columnHelper.accessor('saida.dataSaida', {
      header: 'Data Saída',
      size: 150,
      cell: info => (
        <Typography sx={{ fontSize: '0.75rem', color: '#1a1a2e' }}>
          {info.getValue() ? new Date(info.getValue()).toLocaleString() : "---"}
        </Typography>
      ),
    }),
    columnHelper.accessor('entrada.nomeFiscal', {
      header: 'Fiscal Entrada',
      size: 130,
      cell: info => (
        <Typography sx={{ fontSize: '0.75rem', fontWeight: 600, color: '#4a635d' }}>
          {info.getValue() || "---"}
        </Typography>
      ),
    }),
    columnHelper.accessor('saida.nomeFiscal', {
      header: 'Fiscal Saída',
      size: 130,
      cell: info => (
        <Typography sx={{ fontSize: '0.75rem', fontWeight: 600, color: '#4a635d' }}>
          {info.getValue() || "---"}
        </Typography>
      ),
    }),
    columnHelper.display({
      id: 'acoes',
      header: '',
      size: 50,
      cell: info => (
        <Template.trBTN>
          <IconButton size="small" onClick={(e) => handleOpenMenu(e, info.row.original)}>
            <MoreVertIcon sx={{ fontSize: 18, color: '#a0a0b8' }} />
          </IconButton>
        </Template.trBTN>
      ),
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
      <Template.Header>
        <Template.HeaderLeft>
          <h1>Histórico Portaria</h1>
          <span>{totalElements} registro(s)</span>
        </Template.HeaderLeft>
        <Template.BtnNovo onClick={() => navigate("/portaria/controle/registro-portaria-cd")}>
          <AddIcon sx={{ fontSize: 18 }} /> Novo
        </Template.BtnNovo>
      </Template.Header>

      <Paper elevation={0} sx={{ borderRadius: '12px', border: '1px solid #e8e8ef', overflow: 'hidden', display: 'flex', flexDirection: 'column', flex: 1 }}>
        <Template.Toolbar>
          <Template.SearchContainer>
            <SearchIcon />
            <input
              type="text"
              placeholder="Buscar por número, nome, placa, filial..."
              value={busca}
              onChange={(e) => setBusca(e.target.value)}
            />
          </Template.SearchContainer>
          <Stack direction="row" spacing={1}>
            <Template.BtnFiltros isOpen={showFilters} onClick={() => setShowFilters(!showFilters)}>
              {showFilters ? <CloseIcon sx={{ fontSize: 16 }} /> : <FilterListIcon sx={{ fontSize: 16 }} />}
              Filtros
            </Template.BtnFiltros>
          </Stack>

          <Template.FloatingFilter isOpen={showFilters}>
            <Template.FilterGroup>
              <Template.FilterLabel>Status do Registro</Template.FilterLabel>
              <SelectVariants value={statusAberto} onChange={setStatusAberto} titulo={undefined} list={[{ nome: "Aberto", value: true }, { nome: "Fechado", value: false }]} />
            </Template.FilterGroup>

            <Template.FilterGroup>
              <Template.FilterLabel>Situação Atual</Template.FilterLabel>
              <SelectVariants value={situacaoEnum} onChange={setSituacaoEnum} list={LISTA_SITUACAO} titulo={undefined} />
            </Template.FilterGroup>

            <Template.FilterGroup>
              <Template.FilterLabel>Filial de Origem</Template.FilterLabel>
              <SelectVariants value={selectedFilial} onChange={setSelectedFilial} list={filiais} titulo={undefined} />
            </Template.FilterGroup>

            <Template.FilterGroup>
              <Template.FilterLabel>Data do Registro</Template.FilterLabel>
              <Template.InputData type="date" value={dataFiltro} onChange={(e) => setDataFiltro(e.target.value)} />
            </Template.FilterGroup>

            <Stack direction="row" spacing={1} sx={{ mt: 1 }}>
              <Template.BtnClear onClick={() => { setBusca(""); setStatusAberto(null); setSituacaoEnum(null); setDataFiltro(""); }}>Limpar</Template.BtnClear>
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
                          <Box sx={{ display: 'flex', color: header.column.getIsSorted() ? '#4f46e5' : '#cbd5e1' }}>
                            {header.column.getIsSorted() === 'asc' ? <ArrowUpwardIcon sx={{ fontSize: 14 }} /> :
                             header.column.getIsSorted() === 'desc' ? <ArrowDownwardIcon sx={{ fontSize: 14 }} /> :
                             <SortIcon sx={{ fontSize: 14, opacity: 0.4 }} />}
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
                <Template.loadingRow>
                  <td colSpan={columns.length}>
                    <CircularProgress size={24} sx={{ color: '#4f46e5' }} />
                  </td>
                </Template.loadingRow>
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

        <Template.Footer>
          <Template.FooterInfo>
            Exibindo {lista.length} de {totalElements}
          </Template.FooterInfo>
          <Paginator totalPage={totaPage} handleNextPage={(_: any, v: number) => onSubmit(v - 1)} />
        </Template.Footer>
      </Paper>

      <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleCloseMenu}
        PaperProps={{ sx: { borderRadius: '10px', boxShadow: '0 10px 40px rgba(0,0,0,0.12)', minWidth: 180 } }}
      >
        <MenuItem onClick={() => { navigate(`/portaria/controle/detalhes-registro?order=${itemSelecionado.id}`); handleCloseMenu(); }}>
          <ListItemIcon><VisibilityIcon fontSize="small" sx={{ color: '#4f46e5' }} /></ListItemIcon>
          <ListItemText primaryTypographyProps={{ fontSize: '0.85rem' }}>Ver Detalhes</ListItemText>
        </MenuItem>
        <MenuItem onClick={() => { setItem(itemSelecionado); setExibeImagem(true); handleCloseMenu(); }}>
          <ListItemIcon><ImageIcon fontSize="small" sx={{ color: '#10b981' }} /></ListItemIcon>
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
                      <Typography variant="caption" sx={{ fontWeight: 800, color: '#4f46e5' }}>{tipo}</Typography>
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
