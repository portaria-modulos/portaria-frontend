import { lazy, type ComponentType } from "react";
import { Route, Routes } from "react-router-dom";
// import { ControleDeAcesso } from "../../components/controleDeacesso/controledeAcesso";
import { MeusRegistroComponets } from "./factures/registros/meus_registros/meusRegistros";
import { ProtectedRoute } from "./service/ProtectedRoute";
import { HomeComponent } from "./factures/home/home";
import { ListaRegistroComponent } from "./factures/history/RegistroFiliais/ListaRegistroHistory";
import { RegistrosPortaria } from "./factures/novo registro/registroPortaria";
import NotFund from "../../paga_segunds/404/NotFund";
import { RedirectByPermissoes } from "../../RedirectByPerfil";
import { subjet } from "../../jwt/jwtservice";
import MeusRegistros from "./factures/registros/registro_portaria/registro";
import { VisitantesListaComponets } from "./factures/Visitantes/visitantes";
import { ConfiguracaoComponent } from "./factures/config/config";
import { ListahistoryComponent } from "./factures/history/lista/ListaHistory";
import { MeuPerfil } from "../PaginaInicial/factures/meu_perfil/meu_Perfil";
import { ListaEntradasVisitantes } from "./factures/history/entradaVisitante/ListaRegistroHistory";
function PortariaRoutes() {
    const perfil = subjet()
    function lazyWidth<T extends ComponentType>
        (factory: () => Promise<{ default: T }>, delay: number) {
        return lazy(() =>
            Promise.all([
                factory(),
                new Promise(resolve => setTimeout(resolve, delay))
            ]).then(([module]) => module)
        );
    };
    const Controle = lazyWidth(() => import("../../components/controleDeacesso/controledeAcesso"), 500);

    const RegistrosPortariaAntigo = lazyWidth(() => import("./factures/novo registro/registroPortariaAntigo"), 500);
    const VisualizarRegistro = lazyWidth(() => import("./factures/registros/detalhes_registro/visualizar_registro"), 500);
    return (
        <Routes>
            <Route index element={<RedirectByPermissoes permissoes={perfil?.perfil} />} />
            <Route path="/active"
                element={
                    <ProtectedRoute >
                        <HomeComponent key={Date.now()} />
                    </ProtectedRoute>
                }>
                <Route path="pendentes" element={
                    <ProtectedRoute allowedPermissions={["REGISTRAR_ENTRADA"]}>
                        <MeusRegistros key={Date.now()}
                        />
                    </ProtectedRoute>
                } />
                <Route path="gerais" element={
                    <ProtectedRoute allowedPermissions={["GERENCIAR_REGISTROS"]}>
                        <ListaRegistroComponent key={Date.now()}
                        />
                    </ProtectedRoute>
                } />
                 <Route path="entradaVisitante/:id" element={
                    <ProtectedRoute allowedPermissions={["GERENCIAR_REGISTROS"]}>
                        <ListaEntradasVisitantes key={Date.now()}
                        />
                    </ProtectedRoute>
                } />
            </Route>
            <Route path="/configuracao" element={<ConfiguracaoComponent />}>
                <Route path="visitantes" element={
                    <ProtectedRoute allowedPermissions={["GERENCIAR_USUARIOS"]}>
                        <VisitantesListaComponets key={Date.now()}
                        />
                    </ProtectedRoute>
                } />
                <Route path="historico" element={
                    <ProtectedRoute allowedPermissions={["GERENCIAR_REGISTROS"]}>
                        <ListahistoryComponent key={Date.now()}
                        />
                    </ProtectedRoute>
                } />
                <Route path="geral" element={
                    <ProtectedRoute allowedPermissions={["GERENCIAR_REGISTROS"]}>
                        <ListaRegistroComponent key={Date.now()}
                        />
                    </ProtectedRoute>
                } />
                <Route path="novo" element={
                    <ProtectedRoute allowedPermissions={["CRIAR_REGISTRO"]}>
                        <RegistrosPortaria key={Date.now()}
                        />
                    </ProtectedRoute>
                }>
                </Route>
                <Route path="my-count" element={
                    <MeuPerfil key={Date.now()}
                    />
                } />
            </Route>
            <Route path="/teste" element={<HomeComponent key={Date.now()} />} />
            {/* rota pai */}
            <Route path="/controle"
                element={
                    <ProtectedRoute >
                        <Controle key={Date.now()} />
                    </ProtectedRoute>
                } >
                <Route path="registro-portaria-cd" element={
                    <ProtectedRoute allowedPermissions={["CRIAR_REGISTRO"]}>
                        <RegistrosPortaria key={Date.now()}
                        />
                    </ProtectedRoute>
                } />
                <Route path="registro" element={
                    <ProtectedRoute allowedPermissions={["CRIAR_REGISTRO"]}>
                        <RegistrosPortariaAntigo key={Date.now()}
                        />
                    </ProtectedRoute>
                } />
                <Route path="meus-registros" element={
                    <ProtectedRoute allowedPermissions={["VISUALIZAR_REGISTRO"]}>
                        <MeusRegistroComponets key={Date.now()}
                        />
                    </ProtectedRoute>
                } />
                {/* <Route path="meus-pedidos"  element={<MainComponent />} /> */}
                <Route path="detalhes-registro" element={
                    <ProtectedRoute allowedPermissions={["REGISTRAR_SAIDA", "REGISTRAR_ENTRADA", "VISUALIZAR_REGISTRO"]}>
                        <VisualizarRegistro key={Date.now()}
                        />
                    </ProtectedRoute>
                } />
                {/*cadastro de usuario*/}
            </Route>
            <Route path="*" element={<NotFund />} />
        </Routes>
    )
}

export default PortariaRoutes;