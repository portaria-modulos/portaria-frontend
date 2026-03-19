import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { useState, type ComponentType } from "react";
import { ProviderUser } from "./reducer/userProvider/userProvider";
import { lazy, Suspense } from "react";
import { LoadingSecundary } from "./components/LoadingSecundary/LoadingSecundary";
import { LoadingR } from "./modulos/portaria/factures/LoadingR";
import { LoginComponen } from "./modulos/auth/login/Login";
import { ProtectedRoute } from "./ProtectedAcessRoute";
const App = () => {
  const [appKey, setAppKey] = useState(0);
  const handleReset = () => setAppKey((k) => k + 1);
  function lazyWidth<T extends ComponentType>
    (factory: () => Promise<{ default: T }>, delay: number) {
    return lazy(() =>
      Promise.all([
        factory(),
        new Promise(resolve => setTimeout(resolve, delay))
      ]).then(([module]) => module)
    );
  }
  const PortariaRoutes = lazyWidth(() => import("./modulos/portaria/PortariaRoutes"), 500);
    const Logistico = lazyWidth(() => import("./modulos/logistico/logisticoRouter"), 500);
        const Recebimento = lazyWidth(() => import("./modulos/recebimento/recebimento.router"), 500);

  const NotFund = lazyWidth(() => import("./paga_segunds/404/NotFund"), 500);
  const UnauthorizedPage = lazyWidth(() => import("./paga_segunds/unauthorized/unauthorized"), 500);
  const PaginaPrincipal = lazyWidth(() => import("./modulos/PaginaInicial/Pagina.router"), 500);

  return (
    //  <LoadingR></LoadingR>
    <ProviderUser key={appKey} onReset={handleReset}>
      <BrowserRouter>
        <Suspense fallback={<LoadingSecundary />}>

          <Routes>
            <Route path="/" element={<Navigate to="/required" replace />} />

            {/*modulo portaria, usando arquitetura modular */}
            <Route path="required/*" element={
              <ProtectedRoute>
                <PaginaPrincipal />
              </ProtectedRoute>
            } />
            <Route path="portaria/*" element={
              <ProtectedRoute allowedPermissions="PORTARIA_ACCESS">
                <PortariaRoutes />
              </ProtectedRoute>
            } />
             <Route path="logistico/*" element={
              <ProtectedRoute allowedPermissions="LOGISTICO_ACCESS">
                <Logistico />
              </ProtectedRoute>
            } />
             <Route path="recebimento/*" element={
              <ProtectedRoute allowedPermissions="LOGISTICO_ACCESS">
                <Recebimento />
              </ProtectedRoute>
            } />
            <Route index path="verify" element={<LoadingR />} />
            <Route index path="/login" element={<LoginComponen />} />I
            <Route path="/unauthorized" element={<UnauthorizedPage />} />
            <Route path="*" element={<NotFund />} />
          </Routes>
        </Suspense>

      </BrowserRouter>
    </ProviderUser>
  )
}
export default App; 