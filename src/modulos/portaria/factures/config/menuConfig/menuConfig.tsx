import Template from "./menuConfigCss";
import { Link, useNavigate } from "react-router-dom";
import logo from "../../../../../assets/logo portaria (1).png"
import { BotaoVoltar } from "../../../../../components/voltar/BotaoVoltar";
import ObjConfig from "../../../../../objConfig";
import { useContext, useEffect, useState } from "react";
import { subjet } from "../../../../../jwt/jwtservice";
import { contextProvider } from "../../../../../reducer/userProvider/userProvider";
import { HiOutlineMenuAlt2 } from "react-icons/hi";
import { IoCloseOutline } from "react-icons/io5";

export const MenuConfig = () => {
    const navigate = useNavigate()
    const [drawerOpen, setDrawerOpen] = useState(false);
    const [userPermissions, setUserPermissions] = useState<string[]>([])
    const contex = useContext(contextProvider)

    const hendleHome = () => {
        navigate("/verify")
    }

    useEffect(() => {
        const userSuv = subjet();
        setUserPermissions(userSuv?.permissoes || []);
    }, [contex?.user])

    const hasPermission = (perm?: string | null) => {
        if (!perm) return true;
        return userPermissions.includes(perm);
    };

    const handleDrawerLink = () => {
        setDrawerOpen(false);
    };

    return (
        <>
            <Template.continer>
                <Template.areaMenu>
                    <Template.btnMenu onClick={() => setDrawerOpen(true)}>
                        <HiOutlineMenuAlt2 size={22} />
                    </Template.btnMenu>
                    <BotaoVoltar />
                    <Template.menu>
                        <Template.menu_nav>
                            <Template.menu_ul>
                                {ObjConfig.flatMap((item, index) => (
                                    <Template.menu_li key={index}>
                                        {item.label}
                                        <Template.submenu>
                                            {item.items.filter(sub => hasPermission(sub.permission)).map((sub, i) => (
                                                <div key={i}>
                                                    <Link to={sub?.to as any}>
                                                        <Template.submenu_item>{sub.label}</Template.submenu_item>
                                                    </Link>
                                                </div>
                                            ))}
                                        </Template.submenu>
                                    </Template.menu_li>
                                ))}
                            </Template.menu_ul>
                        </Template.menu_nav>
                    </Template.menu>
                </Template.areaMenu>
                <Template.logo src={logo} onClick={hendleHome} />
            </Template.continer>

            {/* Mobile Drawer */}
            <Template.overlay open={drawerOpen} onClick={() => setDrawerOpen(false)} />
            <Template.drawer open={drawerOpen}>
                <Template.drawerHeader>
                    <span>Menu</span>
                    <Template.drawerClose onClick={() => setDrawerOpen(false)}>
                        <IoCloseOutline size={22} />
                    </Template.drawerClose>
                </Template.drawerHeader>
                <Template.drawerBody>
                    {ObjConfig.map((group, index) => (
                        <Template.drawerGroup key={index}>
                            <Template.drawerGroupTitle>{group.label}</Template.drawerGroupTitle>
                            {group.items.filter(sub => hasPermission(sub.permission)).map((sub, i) => (
                                <Template.drawerItem key={i} onClick={handleDrawerLink}>
                                    <Link to={sub?.to as any}>{sub.label}</Link>
                                </Template.drawerItem>
                            ))}
                        </Template.drawerGroup>
                    ))}
                </Template.drawerBody>
            </Template.drawer>
        </>
    );
};
