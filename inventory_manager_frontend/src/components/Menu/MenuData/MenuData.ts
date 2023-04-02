import { BillIcon, BoxIcon, ExtraHomeIcon } from "@sapo-presentation/sapo-ui-components";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateMenuItems, updateStatusLoadingMenu } from "store/Menu/menuSlice";
import { AppState } from "store/store";

import { MenuItem } from "./MenuData.types";
const useGenMenuData = () => {
  const state = useSelector((state: AppState) => state);
  const dispatch = useDispatch();
  const {
    menu: { menuItems },
    auth,
  } = state;
  const genMenuDashboard = () => {
    let menu: MenuItem = {
      id: "dashboard",
      icon: ExtraHomeIcon,
      title: "Trang tổng quan",
      path: "/admin",
      checkIsExact: true,
      includePaths: ["", "/admin", "/admin/dashboard"],
    };
    return menu;
  };
  const genMenuProduct = () => {
    let menu: MenuItem = {
      id: "product",
      icon: BoxIcon,
      title: "Thiết bị",
      subMenus: [],
      path: "/admin/products",
    };
    menu.subMenus = [
      {
        title: "Thêm thiết bị",
        path: "/admin/products/create",
        typeRoute: "default",
      },
      {
        title: "Danh sách thiết bị",
        path: "/admin/products",
        includePaths: ["/admin/products/:id"],
        excludePaths: ["/admin/products/create"],
        typeRoute: "default",
      },
    ];

    return menu;
  };
  const genMenuOrder = () => {
    let menu: MenuItem = {
      id: "order",
      icon: BillIcon,
      title: "Phiếu mượn",
      subMenus: [],
      path: "/admin/orders",
    };
    menu.subMenus = [
      {
        title: "Tạo phiếu mượn",
        path: "/admin/orders/create",
        typeRoute: "default",
      },
      {
        title: "Danh sách phiếu",
        path: "/admin/orders",
        includePaths: ["/admin/orders/:id"],
        excludePaths: ["/admin/orders/create"],
        typeRoute: "default",
      },
    ];

    return menu;
  };

  const genMenuData = () => {
    let listMenu: MenuItem[] = [];
    listMenu.push(genMenuDashboard());
    listMenu.push(genMenuProduct())
    listMenu.push(genMenuOrder());
    return listMenu;
  };
  const genSapoMenu = async () => {
    let menuItems: MenuItem[] = [];
    let menuItemsPrimary = genMenuData();
    menuItems.push(...menuItemsPrimary);
    dispatch(updateMenuItems(menuItems));
  };
  useEffect(() => {
    if (menuItems.length > 0) {
      dispatch(updateStatusLoadingMenu(false));
    }
  }, [menuItems]);
  useEffect(() => {
    genSapoMenu();
  },[]);
};

export default useGenMenuData;
