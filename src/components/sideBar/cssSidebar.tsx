import styled from "styled-components";
import { Link } from "react-router-dom";

type prop = {
    open:any
}
export default {
    container: styled.aside`
      width: 100%;
      height: 100vh;
      top: 0;
      left: 0;
      z-index: 999;
      position: fixed;
      background-color: transparent;
      cursor: pointer;
    `,
    container_int: styled.aside<prop>`
      position: fixed;
      top: 0;
      background: var(--header-background, #1a1a1a);
      width: 270px;
      height: 100%;
      left: ${({open}) => open ? 0 : "-270px"};
      transition: left 0.3s cubic-bezier(.4,0,.2,1);
      padding: 28px 18px 18px 18px;
      box-shadow: 4px 0 24px rgba(0,0,0,0.25);
      border-top-right-radius: 18px;
      border-bottom-right-radius: 18px;
      z-index: 999;
      display: flex;
      flex-direction: column;
      gap: 18px;
    `,
    menu: styled.div`
      display: flex;
      align-items: center;
      margin-bottom: 10px;
      font-weight: 700;
      color: #FFF;
      cursor: pointer;
      font-size: 1.08rem;
      padding: 10px 12px;
      border-radius: 8px;
      transition: background 0.2s;
      &:hover {
        background: rgba(161, 114, 114, 0.10);
      }
    `,
    subMenu:styled.div`
      margin-left: 10px;
      display: flex;
      flex-direction: column;
      gap: 2px;
      background: rgba(40,40,40,0.97);
      border-radius: 10px;
      box-shadow: 0 4px 16px rgba(161, 114, 114, 0.10);
      padding: 8px 0 8px 0;
      margin-top: 4px;
      min-width: 170px;
    `,
    MenuLink: styled(Link)`
      color: #cfc9d8;
      text-decoration: none;
      padding: 10px 18px 10px 18px;
      display: block;
      font-size: 1rem;
      border-radius: 8px;
      margin: 2px 8px;
      transition: background 0.18s, color 0.18s, transform 0.18s;
      &:hover {
        color: #fff !important;
        background: rgba(161, 114, 114, 0.22);
        transform: translateX(8px) scale(1.04);
        text-decoration: none;
        box-shadow: 0 2px 8px rgba(161, 114, 114, 0.10);
      }
    `
}