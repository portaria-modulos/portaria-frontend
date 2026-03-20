import { useEffect, useState, type ChangeEvent } from "react";
import Template from "./visitantesCss";
import Api from "../../service/api";
import ApiVisitante from "../../service/visitanteApi/visitanteApi";
import type { Visitante } from "../../types/visitante";
import { TableComponent } from "../../../../components/tabela/Tabela";
import { PopupComponent } from "../../../../components/popup/popupComponent";
import { subjet } from "../../../../jwt/jwtservice";
import { notify } from "../../service/snackbarService";
import { Paginator } from "../../../../components/paginator/paginator";
import { useNavigate } from "react-router-dom";
import SearchIcon from '@mui/icons-material/Search'; // Importe o ícone se estiver usando MUI

export const VisitantesListaComponets = () => {
  const [lista, setLista] = useState<Visitante[]>([]);
  const [busca, setBusca] = useState("");
  const [totalPage, setTotalPage] = useState(0);
  const [loading, setLoading] = useState(false);
  const [id, setId] = useState("");
  const [titulo, setTitulo] = useState("");
  const [type, setType] = useState("");
  const [ativoBtn, setAtivo] = useState(false);

  const user = subjet();
  const navigate = useNavigate();

  const onSubmit = async (numeroPage: number = 0) => {
    setLoading(true);
    try {
      const resposta = await Api.listaVisistante(busca, numeroPage);
      if (resposta) {
        setLista(resposta.content);
        setTotalPage(resposta.totalPages); // Corrigido para totalPages conforme seu JSON
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

  const handleBloqueio = (idItem: any, type: any) => {
    setType(type);
    setTitulo(`Deseja realmente fazer ${type} o item de ID ${idItem}?`);
    setId(idItem);
    setAtivo(true);
  };

  const handleDelete = (idItem: any) => {
    setType("DELETE");
    setId(idItem);
    setTitulo(`Deseja realmente deletar o item de ID ${idItem}?`);
    setAtivo(true);
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
  return (
    <Template.container>
      <Template.titulo>Gerenciamento de Visitantes</Template.titulo>
      <Template.FormSub>
        <Template.HeaderTable>
          
          {/* Grupo de Busca: Input + Botão */}
          <Template.SearchGroup>
            <Template.InputWrapper>
              <Template.Campos
                placeholder="Pesquisar por nome ou documento..."
                value={busca}
                onChange={e => setBusca(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && onSubmit()}
              />
            </Template.InputWrapper>
            
            <Template.ButtonBusca onClick={() => onSubmit()}>
              <SearchIcon sx={{ fontSize: 18, marginRight: '4px' }} />
              Buscar
            </Template.ButtonBusca>
          </Template.SearchGroup>

          <Template.ButtonNovo onClick={() => navigate("/portaria/controle/registro-portaria-cd")}>
            <span>+</span> Novo Visitante
          </Template.ButtonNovo>
        </Template.HeaderTable>

        {loading ? (
          <TableComponent lista={[]} loading={true} handleDelete={() => {}} handleBloqueio={() => {}} />
        ) : lista.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '60px', color: '#94a3b8' }}>
            Nenhum registro encontrado para sua busca.
          </div>
        ) : (
          <TableComponent
            lista={lista}
            loading={false}
            handleDelete={handleDelete}
            handleBloqueio={handleBloqueio}
          />
        )}

        <Template.FooterTable>
          <Paginator totalPage={totalPage} handleNextPage={handleNextPage} />
        </Template.FooterTable>
      </Template.FormSub>

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