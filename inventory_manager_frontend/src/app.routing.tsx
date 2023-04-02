import React from "react";
import Route from "./shared/model/routing/route.model";
import MainLayoutComponent from "./layout/main/MainLayout";

const OrderModule = React.lazy(() => import("./page/Orders/list"));
const CreateOrderModule = React.lazy(() => import("./page/Orders/create"));
const DetailOrderModule = React.lazy(() => import("./page/Orders/detail"));
const ProductModule = React.lazy(() => import("./page/Products/list"));
const CreateProductModule = React.lazy(() => import("./page/Products/create"));
const DetailProductModule = React.lazy(() => import("./page/Products/detail"));
export const LAYOUT_ROUTES: Route[] = [
  {
    path: "/",
    extract: true,
    redirect: "/admin",
  },
  {
    path: "/",
    extract: true,
    component: () => {
      window.location.href = `/login`;
      return null;
    },
  },
  {
    path: "/admin",
    component: MainLayoutComponent,
  },
];

let MAIN_ROUTES = (): Route[] => [
  {
    path: "/",
    extract: true,
    redirect: "/admin/dashboard",
    header: {
      title: `Tổng quan`,
      linkTo: "",
      showNoti: true,
    },
  },
  {
    path: "/orders",
    component: OrderModule,
    extract: true,
    header: {
      title: `Phiếu mượn`,
      linkTo: "",
      showNoti: true,
    },
  },
  {
    path: "/orders/create",
    component: CreateOrderModule,
    extract: true,
  },
  {
    path: "/orders/:id",
    component: DetailOrderModule,
    extract: true,
  },
  {
    path: "/products",
    component: ProductModule,
    extract: true,
    header: {
      title: `Danh sách thiết bị`,
      linkTo: "",
      showNoti: true,
    },
  },
  {
    path: "/products/create",
    component: CreateProductModule,
    extract: true,
  },
  {
    path: "/products/:id",
    component: DetailProductModule,
    extract: true,
  },
  {
    path: "/products/:id/edit",
    component: CreateProductModule,
    extract: true,
  },
];
export default MAIN_ROUTES;
