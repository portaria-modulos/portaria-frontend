import { useEffect, useState } from "react";
import Template from "./homeItens.css"
import { useNavigate } from "react-router-dom";
import apiModulos from "../../service/moduleApi"
import { subjet } from "../../../../jwt/jwtservice";
import { FaTruck } from "react-icons/fa";
import SouthWestIcon from '@mui/icons-material/SouthWest';
import InventoryIcon from '@mui/icons-material/Inventory';
import Inventory2Icon from '@mui/icons-material/Inventory2';
export const HomeItens = () => {
    const usuario = subjet();
    const navigate = useNavigate();
    const handlenavigate = (router: any) => {
        navigate(router, { replace: false })
    }
    const [menu, setModule] = useState<any[]>([]);
    useEffect(() => {
        window.scroll(0, 0)
        const handleApi = async () => {
            const json = await apiModulos.modulo(usuario?.id);
            if (json) {
                const acessos = json.acess;
                if (acessos.length === 1) {
                    navigate(json?.acess[0].router, { replace: false });
                    return;
                }
                setModule(acessos);

            }
        }
        handleApi()
    }, [])
    // p=>perfil.permissoes.includes(p))
    function retornaIcone(modulo: string, valor: any) {
        switch (modulo) {
            case "PORTARIA_ACCESS":
                return <FaTruck color="#5B7FFF" size={valor} />
            case "INVENTARIO_ACCESS":
                return <InventoryIcon sx={{ color: '#5B7FFF', fontSize: valor }} />
            case "RECEBIMENTO_ACCESS":
                return <SouthWestIcon sx={{ color: '#5B7FFF', fontSize: valor, fontWeight: "bold" }} />
            case "LOGISTICO_ACCESS":
                return <Inventory2Icon sx={{ color: '#5B7FFF', fontSize: valor, fontWeight: "bold" }} />
        }
    }
    return (
        <Template.container_2>
            {menu.length === 0 &&
                <Template.semItens>
                    <Template.iconSemItens />
                    Sem permissão encontrada
                </Template.semItens>
            }
            {menu.length > 0 &&

                <Template.scroll>
                    {/* <Template.titulo>Modulos:</Template.titulo> */}

                    <Template.grid>
                        {menu.map((item, index) => (
                            <Template.link key={index} onClick={() => handlenavigate(item.router)}>
                                {retornaIcone(item?.permission_name, 24)}
                                <Template.card_title>{item?.titulo}</Template.card_title>
                                <Template.card_desc>{item?.subtitulo}</Template.card_desc>
                            </Template.link>


                        ))}



                    </Template.grid>

                </Template.scroll>
            }
            <Template.footer>© SuiteCore</Template.footer>

        </Template.container_2>
    )
}