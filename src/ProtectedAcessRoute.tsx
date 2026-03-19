// import { useEffect, useState, type ReactNode } from "react";
// import { Navigate } from "react-router-dom";
// import apiAcess from "./modulos/PaginaInicial/service/moduleApi"
// import { subjet } from "./jwt/jwtservice";

// interface ProtectedRouteProps {
//   children: ReactNode;
//   allowedPermissions?: string;
// };

// export const ProtectedRoute = ({ children, allowedPermissions }: ProtectedRouteProps) => {
//   const user = subjet();
//   const [loading, setLoading] = useState(true);

//   const [isAuthenticated, setIsAuthenticated] = useState(false);
//   const [userPermissions, setUserPermissions] = useState<any>(null);

//   useEffect(() => {
//     // Inicializa o carregamento em true
//     setLoading(true); 
//     const token = !!localStorage.getItem("acessToken");

//     if (token!=null) {
//       setIsAuthenticated(true);
      
//       async function handleBuscaApi() {
//         try {
//           const resposta = await apiAcess.modulo(user?.id);
//                     if (resposta?.acess) {
//             setUserPermissions(resposta);
//           }
//         } catch (error) {
//           setUserPermissions({ acess: [] }); // Trata erro definindo sem permissão
//         } finally {
//           setLoading(false); 
//         }
//       }

//       handleBuscaApi();
//     }else{
//       setIsAuthenticated(false);
//     }
    
//   }, []); 

//   // --- LÓGICA DE VERIFICAÇÃO ---

//   // Calcula a permissão
//   const hasPermission = userPermissions?.acess?.some((p: any) =>
//     p?.permission_name.includes(allowedPermissions)
//   );
//   if (loading) {
//     return ; 
//   }

//   // Se o carregamento terminou, prossegue com as verificações de acesso

//   if (!isAuthenticated) {
//     return <Navigate to="/verify" replace />;
//   };

//   if (allowedPermissions && !hasPermission) {
//     return <Navigate to="/unauthorized" replace />;
//   };

//   return <>{children}</>;
// };

import { useEffect, useState, type ReactNode } from "react";
import { Navigate } from "react-router-dom";
import apiAcess from "./modulos/PaginaInicial/service/moduleApi";
import { subjet } from "./jwt/jwtservice";

interface ProtectedRouteProps {
  children: ReactNode;
  allowedPermissions?: string;
}

export const ProtectedRoute = ({ children, allowedPermissions }: ProtectedRouteProps) => {
  const user = subjet();
  const token = localStorage.getItem("acessToken");
  
  const [loading, setLoading] = useState(!!allowedPermissions); // Só carrega se precisar checar permissão
  const [hasPermission, setHasPermission] = useState(false);

  useEffect(() => {
    // Se não há token, não precisa nem buscar na API
    if (!token) {
      setLoading(false);
      return;
    }

    // Se a rota não exige permissão específica (ex: /required), libera direto
    if (!allowedPermissions) {
      setHasPermission(true);
      setLoading(false);
      return;
    }

    const handleBuscaApi = async () => {
      try {
        const resposta = await apiAcess.modulo(user?.id);
        // Verifica se a permissão exigida está na lista retornada
        const matches = resposta?.acess?.some((p: any) =>
          p?.permission_name.includes(allowedPermissions)
        );
        setHasPermission(!!matches);
      } catch (error) {
        setHasPermission(false);
      } finally {
        setLoading(false);
      }
    };

    handleBuscaApi();
  }, [allowedPermissions, token, user?.id]);

  // 1. Se não tem token, manda para o login imediatamente (sem tela branca)
  if (!token) {
    return <Navigate to="/login" replace />;
  }

  // 2. Enquanto checa permissões na API, você pode retornar um loading discreto
  if (loading) {
    return null; // Ou um <LoadingSecundary /> para não ficar branco
  }

  // 3. Se a rota exige permissão e o usuário não tem
  if (allowedPermissions && !hasPermission) {
    return <Navigate to="/unauthorized" replace />;
  }

  // 4. Tudo certo, renderiza o conteúdo
  return <>{children}</>;
};