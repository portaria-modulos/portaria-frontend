import { useEffect, useState, useMemo, type ChangeEvent, type MouseEvent } from "react";
import Template from "./visitantesCss";
import Api from "../../service/api";
import ApiVisitante from "../../service/visitanteApi/visitanteApi";
import type { Visitante } from "../../types/visitante";
import { PopupComponent } from "../../../../components/popup/popupComponent";
import { subjet } from "../../../../jwt/jwtservice";
import { notify } from "../../service/snackbarService";
import { Paginator } from "../../../../components/paginator/paginator";
import { useNavigate } from "react-router-dom";
import SearchIcon from "@mui/icons-material/Search";
import FilterListIcon from "@mui/icons-material/FilterList";
import CloseIcon from "@mui/icons-material/Close";
import AddIcon from "@mui/icons-material/Add";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import DeleteIcon from "@mui/icons-material/Delete";
import LockIcon from "@mui/icons-material/Lock";
import LockOpenIcon from "@mui/icons-material/LockOpen";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";
import SortIcon from "@mui/icons-material/Sort";
import { CarIcon } from "lucide-react";
import {
  useReactTable,
  getCoreRowModel,
  getSortedRowModel,
  flexRender,
  createColumnHelper,
  type SortingState,
} from "@tanstack/react-table";
import { Avatar, Box, CircularProgress, IconButton, Paper, Stack, Typography, Menu, MenuItem, ListItemIcon, ListItemText } from "@mui/material";
import { Filtro } from "../history/filtro/filtro";

const columnHelper = createColumnHelper<any>();

export const VisitantesListaComponets = () => {
  const [lista, setLista] = useState<Visitante[]>([]);
  const [busca, setBusca] = useState("");
  const [totalPage, setTotalPage] = useState(0);
  const [totalElements, setTotalElements] = useState(0);
  const [loading, setLoading] = useState(false);
  const [id, setId] = useState("");
  const [titulo, setTitulo] = useState("");
  const [type, setType] = useState("");
  const [ativoBtn, setAtivo] = useState(false);
  const [showFilters, setShowFilters] = useState(false);
  const [sorting, setSorting] = useState<SortingState>([]);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [itemSelecionado, setItemSelecionado] = useState<any>(null);

  const user = subjet();
  const navigate = useNavigate();
  const permission = user?.permissoes;

  const [selectedFilial, setSelectedFilial] = useState<number | null>(user?.filial);

  const onSubmit = async (numeroPage: number = 0) => {
    setLoading(true);
    try {
      const resposta = await Api.listaVisistante(busca, numeroPage, selectedFilial);
      if (resposta) {
        setLista(resposta.content);
        setTotalPage(resposta.totalPages);
        setTotalElements(resposta.totalElements || 0);
      }
    } catch (error) {
      notify("Erro ao carregar visitantes", "error");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (busca.trim() === "") {
      onSubmit();
    }
  }, [busca]);

  const handleOpenMenu = (event: MouseEvent<HTMLElement>, row: any) => {
    setAnchorEl(event.currentTarget);
    setItemSelecionado(row);
  };

  const handleCloseMenu = () => {
    setAnchorEl(null);
    setItemSelecionado(null);
  };

  const handleBloqueio = (idItem: any, type: string) => {
    setType(type);
    setTitulo(`Deseja realmente fazer ${type} o item de ID ${idItem}?`);
    setId(idItem);
    setAtivo(true);
    handleCloseMenu();
  };

  const handleDelete = (idItem: any) => {
    setType("DELETE");
    setId(idItem);
    setTitulo(`Deseja realmente deletar o item de ID ${idItem}?`);
    setAtivo(true);
    handleCloseMenu();
  };

  const handleAPi = async () => {
    const resposta = await ApiVisitante.deletarVisitante(id, user?.id, type);
    notify(resposta?.msg, "success");
    setAtivo(false);
    onSubmit();
  };

  const handleNextPage = (_: ChangeEvent<unknown>, value: number) => {
    onSubmit(value - 1);
  };

  const handleFiltraEntradas = (idVisitante: any) => {
    navigate(`/portaria/active/entradaVisitante/${idVisitante}`);
    handleCloseMenu();
  };

  const columns = useMemo(() => [
    columnHelper.display({
      id: "status",
      header: "Status",
      size: 100,
      cell: (info) => (
        <Template.StatusBadge color={info.row.original?.ativo ? "#10b981" : "#ef4444"}>
          {info.row.original?.ativo ? "Ativo" : "Bloqueado"}
        </Template.StatusBadge>
      ),
    }),
    columnHelper.accessor("nomeCompleto", {
      header: "Nome",
      size: 250,
      cell: (info) => (
        <Stack direction="row" spacing={1.5} alignItems="center">
          <Avatar sx={{ width: 34, height: 34, fontSize: "0.8rem", fontWeight: 700 }} src={info.row.original?.imagem || ""} />
          <Box>
            <Typography sx={{ fontWeight: 700, fontSize: "0.82rem", color: "#1a1a2e" }}>
              {info.getValue()}
            </Typography>
            <Typography sx={{ fontSize: "0.68rem", color: "#8e8ea0" }}>
              {info.row.original?.numeroTelefone || "(00) 00000-0000"}
            </Typography>
          </Box>
        </Stack>
      ),
    }),
    columnHelper.display({
      id: "filialVisita",
      header: "Filial/Visita",
      size: 120,
      cell: (info) => (
        <Typography sx={{ fontSize: "0.82rem", fontWeight: 600, color: "#1a1a2e" }}>
          {info.row.original?.filial || "---"}
        </Typography>
      ),
    }),
    columnHelper.accessor("placaVeiculo", {
      header: "Placa",
      size: 120,
      cell: (info) => (
        <Typography sx={{ fontSize: "0.8rem", fontWeight: 700, color: "#4f46e5", fontFamily: "monospace" }}>
          {info.getValue() || "---"}
        </Typography>
      ),
    }),
    columnHelper.accessor("dataCriacao", {
      header: "Data Cadastro",
      size: 120,
      cell: (info) => (
        <Typography sx={{ fontSize: "0.78rem", color: "#8e8ea0" }}>
          {info.getValue() ? new Date(info.getValue()).toLocaleDateString("pt-BR") : "---"}
        </Typography>
      ),
    }),
    columnHelper.display({
      id: "tipoOcupacao",
      header: "Tipo / Ocupação",
      size: 160,
      cell: (info) => (
        <Box>
          <Typography sx={{ fontSize: "0.8rem", fontWeight: 600, color: "#1a1a2e" }}>
            {info.row.original?.recorrencia?.nome || "---"}
          </Typography>
          <Typography sx={{ fontSize: "0.68rem", color: "#8e8ea0" }}>
            {info.row.original?.ocupacao || "Geral"}
          </Typography>
        </Box>
      ),
    }),
    columnHelper.display({
      id: "acoes",
      header: "",
      size: 50,
      cell: (info) => (
        <Template.trBTN>
          <IconButton size="small" onClick={(e) => handleOpenMenu(e, info.row.original)}>
            <MoreVertIcon sx={{ fontSize: 18, color: "#a0a0b8" }} />
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
          <h1>Gerenciamento de Visitantes</h1>
          <span>{totalElements} registro(s)</span>
        </Template.HeaderLeft>
        <Template.BtnNovo onClick={() => navigate("/portaria/controle/registro-portaria-cd")}>
          <AddIcon sx={{ fontSize: 18 }} /> Novo Visitante
        </Template.BtnNovo>
      </Template.Header>

      <Paper elevation={0} sx={{ borderRadius: "12px", border: "1px solid #e8e8ef", overflow: "hidden", display: "flex", flexDirection: "column", flex: 1 }}>
        <Template.Toolbar>
          <Template.SearchContainer>
            <SearchIcon />
            <input
              type="text"
              placeholder="Buscar por nome, placa, documento..."
              value={busca}
              onChange={(e) => setBusca(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && onSubmit()}
            />
          </Template.SearchContainer>
          <Stack direction="row" spacing={1}>
            <Template.BtnFiltros isOpen={showFilters} onClick={() => setShowFilters(!showFilters)}>
              {showFilters ? <CloseIcon sx={{ fontSize: 16 }} /> : <FilterListIcon sx={{ fontSize: 16 }} />}
              Filtros
            </Template.BtnFiltros>
          </Stack>

          <Template.FloatingFilter isOpen={showFilters}>
            <Filtro
              selectedFilial={selectedFilial}
              setSelectedFilial={setSelectedFilial}
              showFilters={showFilters}
              setStatusAberto={() => null}
              onSubmit={onSubmit}
              setBusca={setBusca}
            />
          </Template.FloatingFilter>
        </Template.Toolbar>

        <Template.TableContainer>
          <Template.Table style={{ width: table.getTotalSize() }}>
            <thead>
              {table.getHeaderGroups().map((headerGroup) => (
                <tr key={headerGroup.id}>
                  {headerGroup.headers.map((header) => (
                    <th key={header.id} style={{ width: header.getSize() }}>
                      <div className="header-content" onClick={header.column.getToggleSortingHandler()}>
                        {flexRender(header.column.columnDef.header, header.getContext())}
                        {header.column.getCanSort() && (
                          <Box sx={{ display: "flex", color: header.column.getIsSorted() ? "#4f46e5" : "#cbd5e1" }}>
                            {header.column.getIsSorted() === "asc" ? (
                              <ArrowUpwardIcon sx={{ fontSize: 14 }} />
                            ) : header.column.getIsSorted() === "desc" ? (
                              <ArrowDownwardIcon sx={{ fontSize: 14 }} />
                            ) : (
                              <SortIcon sx={{ fontSize: 14, opacity: 0.4 }} />
                            )}
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
                    <CircularProgress size={24} sx={{ color: "#4f46e5" }} />
                  </td>
                </Template.loadingRow>
              ) : lista.length === 0 ? (
                <tr>
                  <td colSpan={columns.length} style={{ textAlign: "center", padding: "60px", color: "#8e8ea0" }}>
                    Nenhum registro encontrado para sua busca.
                  </td>
                </tr>
              ) : (
                table.getRowModel().rows.map((row) => (
                  <tr key={row.id}>
                    {row.getVisibleCells().map((cell) => (
                      <td key={cell.id} style={{ width: cell.column.getSize() }}>
                        {flexRender(cell.column.columnDef.cell, cell.getContext())}
                      </td>
                    ))}
                  </tr>
                ))
              )}
            </tbody>
          </Template.Table>
        </Template.TableContainer>

        <Template.Footer>
          <Template.FooterInfo>
            Exibindo {lista.length} de {totalElements}
          </Template.FooterInfo>
          <Paginator totalPage={totalPage} handleNextPage={handleNextPage} />
        </Template.Footer>
      </Paper>

      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleCloseMenu}
        PaperProps={{ sx: { borderRadius: "10px", boxShadow: "0 10px 40px rgba(0,0,0,0.12)", minWidth: 180 } }}
      >
        {permission?.includes("DELETE_GLOBAL") && [
          <MenuItem key="bloqueio" onClick={() => handleBloqueio(itemSelecionado?.id, itemSelecionado?.ativo ? "BLOQUEIO" : "DESBLOQUEIO")}>
            <ListItemIcon>
              {itemSelecionado?.ativo ? <LockOpenIcon fontSize="small" sx={{ color: "#10b981" }} /> : <LockIcon fontSize="small" sx={{ color: "#ef4444" }} />}
            </ListItemIcon>
            <ListItemText primaryTypographyProps={{ fontSize: "0.85rem" }}>
              {itemSelecionado?.ativo ? "Bloquear" : "Desbloquear"}
            </ListItemText>
          </MenuItem>,
          <MenuItem key="delete" onClick={() => handleDelete(itemSelecionado?.id)}>
            <ListItemIcon><DeleteIcon fontSize="small" color="error" /></ListItemIcon>
            <ListItemText primaryTypographyProps={{ fontSize: "0.85rem", color: "error.main" }}>Deletar</ListItemText>
          </MenuItem>,
          <MenuItem key="entradas" onClick={() => handleFiltraEntradas(itemSelecionado?.id)}>
            <ListItemIcon><CarIcon size={18} color="#4f46e5" /></ListItemIcon>
            <ListItemText primaryTypographyProps={{ fontSize: "0.85rem" }}>Ver Entradas</ListItemText>
          </MenuItem>,
        ]}
      </Menu>

      {ativoBtn && (
        <PopupComponent
          handleCancel={() => setAtivo(false)}
          handleConfirm={handleAPi}
          message={titulo}
          ativoBtn={ativoBtn}
        />
      )}
    </Template.container>
  );
};
