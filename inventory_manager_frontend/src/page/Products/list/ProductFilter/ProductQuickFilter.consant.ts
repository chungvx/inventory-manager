export const ProductQuickFilterOptions = {
  STATUS: "status",
  STOCK: "stock"
};

export const getProductQuickFilterLabel = (key: string) => {
  switch (key) {
    case ProductQuickFilterOptions.STATUS:
      return `Trạng thái`;
    case ProductQuickFilterOptions.STOCK:
      return `Tồn kho`;
    default:
      return "";
  }
};

export const ProductStatus = {
  ACTIVE: "active",
  DELETED: "deleted",
};

export const getProductStatusName = (status: string): string => {
  switch (status) {
    case ProductStatus.ACTIVE:
      return "Đang quản lý";
    case ProductStatus.DELETED:
      return "Đã xóa";
    default:
      return "";
  }
};

export const ProductStock = {
  TRUE: "true",
  FALSE: "false",
};

export const getProductStockName = (status: string): string => {
  switch (status) {
    case ProductStock.TRUE:
      return "Còn tồn kho";
    case ProductStock.FALSE:
      return "Hết";
    default:
      return "";
  }
};
