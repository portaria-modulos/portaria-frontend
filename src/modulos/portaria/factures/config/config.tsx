import { Navigate, Outlet, useOutlet } from "react-router-dom";
import { MenuConfig } from "./menuConfig/menuConfig"
import Template from "./ConfigCss"
import { useEffect } from "react";

export const ConfiguracaoComponent = () => {
  const outlet = useOutlet();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [outlet]);
  return (
    <Template.container>
      <MenuConfig />
      <Template.container_int>
        {outlet ? (
          <Outlet />
        ) : (
          <Navigate to="historico" replace />
        )}
      </Template.container_int>
    </Template.container>
  )
}
