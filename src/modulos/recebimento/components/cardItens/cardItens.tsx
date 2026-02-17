import { useState } from "react";
import Template from "./cardItens.syled"
import { Dialogs } from "../dialogs/Dialogs";
import { UpdateRegistro } from "../update/update";
import PositionedMenu from "../btn/btnMenu";
import apiMaterial from "../../service/apiRecebimento"
import { notify } from "../../../portaria/service/snackbarService";
import { subjet } from "../../../../jwt/jwtservice";
type props = {
    c: any,
    handleFunction: () => void
}
export const CardItensComponents = ({ c, handleFunction }: props) => {
    const user = subjet();
    const permission = user?.permissoes;
    function handleConvertData(data: any) {
        const date = new Date(data);
        const hora = date.toLocaleTimeString("pt-BR", {
            hour: "2-digit",
            minute: "2-digit",
        });
        const dia = date.toLocaleDateString("pt-BR");
        return `${hora} ${dia}`;
    }
    const [activeModal, setActiveModal] = useState(false);
    const handeClick = () => {
        setActiveModal(!activeModal)
    }
    const handeClickDelete = async () => {
        const resposta = await apiMaterial.delete(c.id, c.filial);
        if (resposta) {
            handleFunction();
            notify("Deletado", "success");
        }
    }
    return (
        <Template.Container>
            <Template.Card>
                <Template.CardHeaderPrincipal>
                    <div className="info-title">
                        <span className="tag">Resumo Portaria</span>
                        <span className="tag">User: {c?.nomeUsuario?.split(' ')[0]}</span>
                        <h4 className="titulo">{c?.filial} - {c?.nomeFilial}</h4>
                    </div>
                    <Template.info_date>
                        <span>📅 {handleConvertData(c?.dataAt)}</span>
                        {permission?.includes("DELETE_LOGISTICO") && (
                            <PositionedMenu hendleClick={handeClick} hendleClickDelete={handeClickDelete} />
                        )}
                    </Template.info_date>
                </Template.CardHeaderPrincipal>

                <Template.TableWrapper>
                    <Template.Table>
                        <Template.Thead>
                            <tr>
                                <th style={{ textAlign: 'left' }}>Tipo</th>
                                <th>Descarregado</th>
                                <th>Portos</th>
                                <th>Total</th>
                                <th>Pendente</th>
                            </tr>
                        </Template.Thead>
                        <Template.Tbody>
                            {c.itens.map((item: any, i: number) => (
                                <Template.Tr key={i}>
                                    <td className="bold">{item?.TipoBloco}</td>
                                    <td className="val-portaria">{item?.qtdPortariaDescarregada ?? 0}</td>
                                    <td className="val-porto">{item?.qtdPortoDescarregado ?? 0}</td>
                                    <td className="val-total">{item?.qtdtTotalCargaConcluida}</td>
                                    <td className="val-pendente">{item?.qtdDescargasPendentes}</td>
                                </Template.Tr>
                            ))}
                            <Template.Tr className="footer-row">
                                <td className="bold">TOTAL</td>
                                <td className="val-portaria">{c?.resumoTotal?.portariaTotalConsolidada}</td>
                                <td className="val-porto">{c?.resumoTotal?.portoTotalConsolidado}</td>
                                <td className="val-total total-geral">{c?.resumoTotal?.volumeTotalConsolidado}</td>
                                <td className="val-pendente">{c?.resumoTotal?.pendentesTotalConsolidada}</td>
                            </Template.Tr>
                        </Template.Tbody>
                    </Template.Table>
                </Template.TableWrapper>

                {activeModal && (
                    <Dialogs handleInative={handeClick}>
                        <UpdateRegistro onClickhTogle={handleFunction} registroId={c.id} itemMP={c.itens} />
                    </Dialogs>
                )}
            </Template.Card>
        </Template.Container>
    );
}