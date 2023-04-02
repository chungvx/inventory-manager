export const OrderQuickFilterOptions = {
  NOTE: "note",
  MODIFIED_AT: "modifiedAt",
  CREATED_AT: "createdAt",
  RETURNED_AT: "returnedAt",
  STATUS: "status",
  NAME: "name",
  EMAIL: "email",
  QUANTITY: "quantity",
};

export const getOrderQuickFilterLabel = (key: string) => {
  switch (key) {
    case OrderQuickFilterOptions.NAME:
      return `Tên người mượn`;
    case OrderQuickFilterOptions.CREATED_AT:
      return `Ngày mượn`;
    case OrderQuickFilterOptions.MODIFIED_AT:
      return `Ngày cập nhật`;
    case OrderQuickFilterOptions.RETURNED_AT:
      return `Ngày trả`;
    case OrderQuickFilterOptions.STATUS:
      return `Trạng thái`;
    case OrderQuickFilterOptions.EMAIL:
      return `Email người mượn`;
    case OrderQuickFilterOptions.NOTE:
      return `Ghi chú`;
    case OrderQuickFilterOptions.QUANTITY:
      return `SL đồ mượn`;
    default:
      return "";
  }
};

export const OrderStatus = {
  //Đang mượn
  BORROWING: "borrowing",
  //Đã trả
  RETURNED: "returned",
};

export const getOrderStatusName = (status: string): string => {
  switch (status) {
    case OrderStatus.BORROWING:
      return "Đang mượn";
    case OrderStatus.RETURNED:
      return "Đã trả";
    default:
      return "";
  }
};
