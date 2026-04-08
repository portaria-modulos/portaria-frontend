import styled from "styled-components";

export default {
  continer: styled.section`
    display: flex;
    background: var(--header-background, #1a1a1a);
    width: 100%;
    padding: 0 16px;
    justify-content: space-between;
    align-items: center;
    height: 52px;
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.2);
    font-family: "Inter", -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
    position: relative;
    z-index: 900;

    @media (min-width: 760px) {
      padding: 0 28px;
    }
  `,

  areaMenu: styled.div`
    display: flex;
    align-items: center;
    gap: 6px;
  `,

  /* ======= DESKTOP MENU ======= */
  menu: styled.div`
    display: none;

    @media (min-width: 760px) {
      display: flex;
      align-items: center;
      padding-left: 12px;
    }
  `,

  menu_nav: styled.nav``,

  menu_ul: styled.ul`
    display: flex;
    gap: 2px;
    list-style: none;
    padding: 0;
    margin: 0;
  `,

  menu_li: styled.li`
    font-family: "Inter", sans-serif;
    position: relative;
    font-size: 13px;
    font-weight: 500;
    color: rgba(255, 255, 255, 0.7);
    cursor: pointer;
    border-radius: 6px;
    padding: 8px 14px;
    transition: all 0.15s ease;

    &:hover {
      color: #fff;
      background: rgba(255, 255, 255, 0.08);
    }

    &:hover ul {
      display: block;
      opacity: 1;
      transform: translateY(0);
      pointer-events: auto;
    }
  `,

  submenu: styled.ul`
    display: none;
    position: absolute;
    top: 100%;
    left: 0;
    background: #fff;
    border-radius: 10px;
    list-style: none;
    padding: 6px 0;
    min-width: 210px;
    box-shadow: 0 8px 24px rgba(0, 0, 0, 0.12), 0 2px 6px rgba(0, 0, 0, 0.06);
    border: 1px solid #e5e7eb;
    opacity: 0;
    transform: translateY(-6px);
    transition: all 0.2s ease;
    z-index: 1000;
    margin-top: 4px;
    pointer-events: none;

    a {
      color: #334155;
      text-decoration: none;
      display: block;
      width: 100%;
    }
  `,

  submenu_item: styled.li`
    padding: 10px 16px;
    color: #475569;
    font-size: 13px;
    font-weight: 400;
    font-family: "Inter", sans-serif;
    cursor: pointer;
    transition: all 0.12s ease;
    border-left: 3px solid transparent;

    &:hover {
      background: #f1f5f9;
      color: #1e293b;
      border-left-color: #6366f1;
    }
  `,

  /* ======= LOGO ======= */
  logo: styled.img`
    object-fit: contain;
    height: 28px;
    cursor: pointer;
    transition: opacity 0.2s ease;

    &:hover {
      opacity: 0.8;
    }

    @media (max-width: 760px) {
      height: 26px;
    }
  `,

  /* ======= MOBILE HAMBURGER ======= */
  btnMenu: styled.button`
    background: transparent;
    border: none;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 6px;
    border-radius: 6px;
    color: rgba(255, 255, 255, 0.8);
    transition: all 0.15s ease;

    &:hover {
      background: rgba(255, 255, 255, 0.08);
      color: #fff;
    }

    @media (min-width: 760px) {
      display: none;
    }
  `,

  /* ======= MOBILE OVERLAY ======= */
  overlay: styled.div<{ open: boolean }>`
    display: ${({ open }) => (open ? "block" : "none")};
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.4);
    z-index: 998;
  `,

  /* ======= MOBILE DRAWER ======= */
  drawer: styled.aside<{ open: boolean }>`
    position: fixed;
    top: 0;
    left: 0;
    width: 280px;
    max-width: 85vw;
    height: 100%;
    background: #fff;
    z-index: 999;
    transform: ${({ open }) => (open ? "translateX(0)" : "translateX(-100%)")};
    transition: transform 0.25s ease;
    display: flex;
    flex-direction: column;
    box-shadow: ${({ open }) => (open ? "4px 0 20px rgba(0, 0, 0, 0.12)" : "none")};
  `,

  drawerHeader: styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 16px 20px;
    border-bottom: 1px solid #e5e7eb;

    span {
      font-family: "Inter", sans-serif;
      font-size: 15px;
      font-weight: 600;
      color: #1e293b;
    }
  `,

  drawerClose: styled.button`
    background: none;
    border: none;
    cursor: pointer;
    padding: 4px;
    color: #64748b;
    display: flex;
    align-items: center;
    border-radius: 6px;
    transition: all 0.15s ease;

    &:hover {
      background: #f1f5f9;
      color: #1e293b;
    }
  `,

  drawerBody: styled.div`
    flex: 1;
    overflow-y: auto;
    padding: 12px 0;
  `,

  drawerGroup: styled.div`
    padding: 0 16px;
    margin-bottom: 8px;
  `,

  drawerGroupTitle: styled.div`
    font-family: "Inter", sans-serif;
    font-size: 11px;
    font-weight: 600;
    color: #94a3b8;
    text-transform: uppercase;
    letter-spacing: 0.8px;
    padding: 12px 8px 6px;
  `,

  drawerItem: styled.div`
    a {
      display: block;
      padding: 11px 12px;
      font-family: "Inter", sans-serif;
      font-size: 14px;
      font-weight: 400;
      color: #334155;
      text-decoration: none;
      border-radius: 8px;
      transition: all 0.12s ease;

      &:hover {
        background: #f1f5f9;
        color: #1e293b;
      }
    }
  `,

  container_int: styled.div`
    padding: 20px;
  `,
};
