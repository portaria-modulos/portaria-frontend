import Template from "./tabelaCss";
import DeleteIcon from '@mui/icons-material/Delete';
import { Avatar, IconButton } from "@mui/material";
import { subjet } from "../../jwt/jwtservice";
import LockIcon from '@mui/icons-material/Lock';
import LockOpenIcon from '@mui/icons-material/LockOpen';

interface TableProps {
  lista: any[];
  handleDelete: (id: any) => void;
  handleBloqueio: (id: any, type: string) => void;
  loading?: boolean;
}

export const TableComponent = ({ lista, handleDelete, handleBloqueio, loading }: TableProps) => {
  const user = subjet();
  const permission = user?.permissoes;

  if (loading) {
    return (
      <Template.LoadingArea>
        <div className="loader" />
        <span>Carregando visitantes...</span>
      </Template.LoadingArea>
    );
  }

  return (
    <Template.TableContainer>
      <Template.Table>
        <thead>
          <tr>
            <th>Status</th>
            <th>Visitante</th>
            <th>Placa</th>
            <th>Data Cadastro</th>
            <th>Tipo / Ocupação</th>
            <th style={{ textAlign: 'right' }}>Ações</th>
          </tr>
        </thead>
        <tbody>
          {lista.map((item, index) => (
            <Template.tr key={item.id || index}  ativo={item.ativo}>
              <td>
                <Template.Badge ativo={item.ativo}>
                  {item.ativo ? "Ativo" : "Bloqueado"}
                </Template.Badge>
              </td>
              <td>
                <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
                  <Avatar sx={{ width: 40, height: 40 }} src={item?.imagem || ""} />
                  <div>
                    <Template.TextPrimary>{item?.nomeCompleto}</Template.TextPrimary>
                    <Template.TextSecondary>{item?.numeroTelefone || "(00) 00000-0000"}</Template.TextSecondary>
                  </div>
                </div>
              </td>
               <Template.Badge ativo={item.ativo}>
                  {item?.placaVeiculo}
                </Template.Badge>
              <td>{item?.dataCriacao && new Date(item.dataCriacao).toLocaleDateString("pt-BR")}</td>
              <td>
                <Template.TextPrimary style={{ fontSize: '0.8rem' }}>{item?.recorrencia?.nome}</Template.TextPrimary>
                <Template.TextSecondary>{item?.ocupacao || "Geral"}</Template.TextSecondary>
              </td>
              <td>
                <Template.trBTN>
                  {permission?.includes("DELETE_GLOBAL") ? (
                    <>
                      <IconButton size="small" onClick={() => handleBloqueio(item.id, item.ativo ? "BLOQUEIO" : "DESBLOQUEIO")} sx={{ color: item.ativo ? "#10b981" : "#ef4444" }}>
                        {item.ativo ? <LockOpenIcon fontSize="small" /> : <LockIcon fontSize="small" />}
                      </IconButton>
                      <IconButton size="small" onClick={() => handleDelete(item?.id)} sx={{ color: '#94a3b8', '&:hover': { color: '#1e293b' } }}>
                        <DeleteIcon fontSize="small" />
                      </IconButton>
                    </>
                  ) : (
                    <IconButton disabled size="small"><DeleteIcon fontSize="small" /></IconButton>
                  )}
                </Template.trBTN>
              </td>
            </Template.tr>
          ))}
        </tbody>
      </Template.Table>
    </Template.TableContainer>
  );
};