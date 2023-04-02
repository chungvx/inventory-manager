import { Box, MenuItem, Typography, WithStyles, withStyles } from "@material-ui/core";
import React, { Fragment, useCallback, useEffect, useRef, useState } from "react";
import { connect, ConnectedProps } from "react-redux";
import { AppState } from "store/store";
import styles from "./Orders.styles";
import NoResultsComponent from "components/NoResults/NoResultsComponent";
import AddCircleOutline from "@material-ui/icons/AddCircleOutline";
import LoadingAuth from "components/Loading/LoadingAuth";
import SapoGrid from "components/SapoGrid/SapoGrid";
import { CellTemplateProps } from "components/SapoGridSticky";
import { GridColumn } from "components/SapoGrid/GridColumn/GridColumn";
import { formatDateUTC, formatDateUTCToLocalDateString, formatStringLength, getMessageError } from "utilities";
import {
  CellTemplateDrillDownProps,
  DataResult,
  GridPageChangeEvent,
  GridSelectionChangeEvent,
} from "components/SapoGrid/SapoGrid.type";
import { useHistory } from "react-router-dom";

import QueryUtils from "utilities/QueryUtils";

import { GridDrillDown } from "components/SapoGrid/DrillDown/GridDrillDown";
import useQueryParams from "hocs/useQueryParams";
import { TagFilterItemType } from "components/TagFilterItem/TagFilterItem.types";
import OrderService, { OrderFilterRequest, OrderResponse, OrdersFilterRequest } from "services/OrderService";
import {
  getOrderQuickFilterLabel,
  getOrderStatusName,
  OrderQuickFilterOptions,
  OrderStatus,
} from "./OrdersFilter/OrdersQuickFilter.consant";
import { GridToolbar } from "components/SapoGrid/Toolbar/GridToolbar";
import { SapoGridToolbarProps } from "components/SapoGrid/Header/SapoGridHeader.type";
import Select from "components/Select/Index";
import Chip from "components/Chip";
import ListTagFilterItem from "components/TagFilterItem/ListTagFilterItem";
import { cloneDeep } from "lodash";
import SnackbarUtils from "utilities/SnackbarUtilsConfigurator";
import Button from "components/Button";
import OrderQuickFilter from "./OrdersFilter/OrdersQuickFilter.component";
import { convertPredefinedToDate, getNameAndDatePredefined } from "utilities/DateRangesPredefine";
import { SearchBox } from "@sapo-presentation/sapo-ui-components";
import Dialog from "components/Dialog";

export interface OrdersProps extends WithStyles<typeof styles> {
  history: any;
}

const Orders = (props: OrdersProps & PropsFromRedux) => {
  const { classes, menuState } = props;
  const [loading, setLoading] = useState<boolean>(true);
  const [tagsFilterItem, setTagsFilterItem] = useState<TagFilterItemType[]>([]);
  const [isShowPopup, setIsShowPopup] = useState(false);
  const [countSuccess, setCountSuccess] = useState(0);
  const [countFail, setCountFail] = useState(0);
  const [data, setData] = useState<DataResult>({
    data: [],
    total: 0,
  });
  const queryParams = useQueryParams();
  const queryParamsRef = useRef<URLSearchParams>(queryParams);
  const [selected, setSelected] = useState<OrderResponse[]>([]);
  const history = useHistory();
  const getDefaultQuery = () => {
    // Không hiểu tại sao useQueryParams không dùng đk
    const currentFilter = props.history.location.search as string;
    const dataFromQuery: any = {};
    for (let searchFilter of currentFilter.slice(1).split("&")) {
      const data = searchFilter.split("=");
      dataFromQuery[data[0]] = decodeURIComponent(data[1]);
    }
    const initFilter: OrdersFilterRequest = {
      page: Number(dataFromQuery["page"]) || 1,
      limit: Number(dataFromQuery["limit"]) || 20,
      statuses: dataFromQuery["statuses"] || undefined,
      created_at_predefined: dataFromQuery["created_at_predefined"] || undefined,
      created_at_min: dataFromQuery["created_on_min"] || undefined,
      created_at_max: dataFromQuery["created_on_max"] || undefined,
      modified_at_predefined: dataFromQuery["modified_at_predefined"] || undefined,
      modified_at_min: dataFromQuery["modified_at_min"] || undefined,
      modified_at_max: dataFromQuery["modified_at_max"] || undefined,
      returned_at_predefined: dataFromQuery["returned_at_predefined"] || undefined,
      returned_at_min: dataFromQuery["returned_at_min"] || undefined,
      returned_at_max: dataFromQuery["returned_at_max"] || undefined,
    };
    return initFilter;
  };

  const [filters, setFilters] = useState<OrdersFilterRequest>({ ...getDefaultQuery() });
  const changeQueryString = useCallback(
    (filters: Record<string, any>) => {
      const queryString = QueryUtils.buildQueryString(filters);
      history.replace({
        search: queryString,
      });
    },
    [filters]
  );

  useEffect(() => {
    queryParamsRef.current = queryParams;
  }, [queryParams]);

  useEffect(() => {
    document.title = "Danh sách phiếu mượn";
  }, []);
  async function fetchDataFilterItems(filters: OrdersFilterRequest) {
    let tagFilter: TagFilterItemType[] = [];
    if (!filters.created_at_predefined) {
      if (filters.created_at_max || filters.created_at_min) {
        let label = `Từ ${
          filters.created_at_min ? formatDateUTCToLocalDateString(filters.created_at_min, false) : `${"trước "}`
        } đến ${
          filters.created_at_max ? formatDateUTCToLocalDateString(filters.created_at_max, true) : `${"hiện tại"}`
        }`;
        tagFilter.push({
          filterType: "created_at_max,created_at_min",
          filterName: OrderQuickFilterOptions.CREATED_AT,
          label: `${getOrderQuickFilterLabel(OrderQuickFilterOptions.CREATED_AT)}: ${label}`,
        });
      }
    } else {
      if (filters.created_at_predefined) {
        tagFilter.push({
          filterType: "created_at_max,created_at_min,created_at_predefined",
          filterName: OrderQuickFilterOptions.CREATED_AT,
          label: `${getOrderQuickFilterLabel(OrderQuickFilterOptions.CREATED_AT)}: ${getNameAndDatePredefined(
            filters.created_at_predefined
          )}`,
        });
      }
    }
    if (filters.status) {
      let statuses = filters.status.split(",");
      let label = statuses.map((item) => getOrderStatusName(item)).join(", ");
      tagFilter.push({
        filterType: "status",
        label: `${getOrderQuickFilterLabel(OrderQuickFilterOptions.STATUS)}: ${label}`,
        filterName: OrderQuickFilterOptions.STATUS,
      });
    }
    setTagsFilterItem(tagFilter);
  }
  const handlePageChange = (e: GridPageChangeEvent) => {
    setSelected([]);
    const page = e.page;
    const newParams: Record<string, any> = {
      ...Object.fromEntries(queryParams),
      page: page.page,
      limit: page.pageSize,
    };
    setFilters((prev) => ({ ...prev, limit: page.pageSize || 20, page: page.page }));
    changeQueryString(newParams);
  };

  const handleSelectionChange = useCallback((e: GridSelectionChangeEvent) => {
    if (!e.dataItems) {
      return;
    }
    setSelected(e.dataItems);
  }, []);

  const genOrderStatus = (order: any) => {
    if (!order) {
      return undefined;
    }
    let name = getOrderStatusName(order.status);
    let color = 0;
    switch (order.status) {
      case OrderStatus.BORROWING:
        color = 1;
        break;
      case OrderStatus.RETURNED:
        color = 2;
        break;
    }
    return { name, color };
  };
  useEffect(() => {
    initData();
    changeQueryString(filters);
  }, [filters]);
  const initData = async () => {
    if (filters.created_at_predefined) {
      const newDateCreatedOn = convertPredefinedToDate(filters.created_at_predefined);
      filters.created_at_min = formatDateUTC(newDateCreatedOn.startDate, false);
      filters.created_at_max = formatDateUTC(newDateCreatedOn.endDate, true);
    }
    if (filters.modified_at_predefined) {
      const newDateCreatedOn = convertPredefinedToDate(filters.modified_at_predefined);
      filters.modified_at_min = formatDateUTC(newDateCreatedOn.startDate, false);
      filters.modified_at_max = formatDateUTC(newDateCreatedOn.endDate, true);
    }
    if (filters.returned_at_predefined) {
      const newDateCreatedOn = convertPredefinedToDate(filters.returned_at_predefined);
      filters.returned_at_min = formatDateUTC(newDateCreatedOn.startDate, false);
      filters.returned_at_max = formatDateUTC(newDateCreatedOn.endDate, true);
    }
    fetchDataFilterItems(filters).then();
    let filter: OrderFilterRequest = {
      limit: filters.limit || 20,
      page: filters.page || 1,
      createdAtMax: filters.created_at_max,
      createdAtMin: filters.created_at_min,
      modifiedAtMax: filters.modified_at_max,
      modifiedAtMin: filters.modified_at_min,
      returnedAtMax: filters.returned_at_max,
      returnedAtMin: filters.returned_at_min,
      ids: filters.ids,
      accountIds: filters.account_ids,
      statuses: filters.statuses,
      query: filters.query,
    };
    try {
      let res = await OrderService.filter(filter);
      if (res) {
        setData({
          data: res.data.orders,
          total: res.data.metadata?.total || 0,
        });
        setLoading(false);
      }
    } catch (err) {
      SnackbarUtils.error(getMessageError(err));
    }
  };

  const caculateQuantity = (dataItem: any) => {
    let quantity: number = 0;
    if (dataItem && dataItem?.line_item) {
      if (dataItem?.line_item.length > 0) {
        dataItem?.line_item.map((item: any) => {
          quantity += item.serials.length;
        });
      }
    }
    return quantity;
  };
  const handleBulkAction = (event: React.ChangeEvent<any>, selected?: OrderResponse[]) => {
    switch (event.target.value) {
      case 1:
        handleReturn(selected);
        break;
    }
  };
  const handleReturn = async (selected?: OrderResponse[]) => {
    if (selected) {
      let countSuccess: number = 0;
      let countFail: number = 0;
      selected.map(async (item) => {
        debugger;
        try {
          let res = await OrderService.return(String(item?.id));
          setTimeout(() => {
            if (res) {
              countSuccess++;
            }
          }, 400);
        } catch (error) {
          countFail++;
        }
      });
      setTimeout(() => {
        setIsShowPopup(true);
        setCountFail(countFail);
        setCountSuccess(countSuccess);
      }, 400);
    }
  };
  const onSubmitFilter = (filter: OrdersFilterRequest) => {
    filter.page = 1;
    setFilters(filter);
  };
  return (
    <>
      <Fragment>
        <Box className={classes.container} visibility={loading ? "hidden" : "visible"}>
          <Box className={classes.header}>
            <Box className={classes.headerItem} display="flex"></Box>
            <Box className={classes.headerItem}>
              <Button
                color="primary"
                variant="contained"
                startIcon={<AddCircleOutline />}
                onClick={() => {
                  history.push(`/admin/orders/create`);
                }}
              >
                {"Thêm phiếu khác"}
              </Button>
            </Box>
          </Box>
          <Box className={classes.listOrderBox}>
            <Box className={classes.utilities}>
              <Box className={classes.filterAndSearchBox}>
                <SearchBox
                  placeholder={"Tìm kiếm phiếu theo tên, email nhân viên"}
                  onSubmit={(value) => {
                    onSubmitFilter({ ...filters, query: value });
                  }}
                  value={null}
                  onBlur={(e) => {}}
                />
                <OrderQuickFilter filters={filters} onSubmit={onSubmitFilter} />
              </Box>
              <Box>
                <ListTagFilterItem
                  data={tagsFilterItem}
                  handleClickTagFilter={(filterName) => {
                    setTimeout(() => {
                      document.querySelector(`[filter-name=${filterName}]`)?.scrollIntoView();
                    }, 300);
                  }}
                  handleDeleteTagFilter={(filterType) => {
                    let newFilterQuery = cloneDeep(filters) as OrdersFilterRequest;
                    filterType.split(",").forEach((item) => {
                      (newFilterQuery as any)[`${item}`] = undefined;
                    });
                    setFilters(newFilterQuery);
                  }}
                />
              </Box>
            </Box>
            {loading ? (
              <LoadingAuth />
            ) : (
              <React.Fragment>
                {data.total > 0 ? (
                  <SapoGrid
                    data={data}
                    page={filters?.page}
                    pageSize={filters?.limit}
                    onPageChange={handlePageChange}
                    stickyHeader
                    tableDrillDown
                    stickyHeaderTop={52}
                    onRowClick={(e, row) => {
                      history.push(`/admin/orders/${row.id}`);
                    }}
                    disablePaging={false}
                    selectable
                    selectedItems={selected}
                    selectBy={"id"}
                    onSelectionChange={handleSelectionChange}
                    nameObjectSelected="đơn hàng"
                    isMenuCollapse={menuState.collapse}
                  >
                    {selected && (
                      <GridToolbar>
                        {(props: SapoGridToolbarProps) => {
                          return (
                            <Select
                              style={{ height: 36, width: 165 }}
                              className={classes.bulkActions}
                              value=""
                              placeholder={`Chọn thao tác`}
                              MenuProps={{
                                anchorOrigin: { vertical: "bottom", horizontal: "left" },
                                transformOrigin: { vertical: "top", horizontal: "left" },
                                getContentAnchorEl: null,
                              }}
                              onChange={(e) => {
                                handleBulkAction(e, props.selectedItems);
                              }}
                            >
                              <MenuItem value={1}>Trả phiếu</MenuItem>
                            </Select>
                          );
                        }}
                      </GridToolbar>
                    )}
                    <GridDrillDown>{({ dataItem, ...remainProps }: CellTemplateDrillDownProps) => <></>}</GridDrillDown>
                    <GridColumn
                      field="name"
                      title={getOrderQuickFilterLabel(OrderQuickFilterOptions.NAME)}
                      width={100}
                      align="center"
                    >
                      {({ dataItem }: CellTemplateProps) => {
                        return (
                          <>
                            <Typography>{dataItem.account?.name ? dataItem.account?.name : "---"}</Typography>
                          </>
                        );
                      }}
                    </GridColumn>
                    <GridColumn
                      field="email"
                      title={getOrderQuickFilterLabel(OrderQuickFilterOptions.EMAIL)}
                      width={100}
                      align="center"
                    >
                      {({ dataItem }: CellTemplateProps) => {
                        return (
                          <>
                            <Typography>{dataItem.account?.email ? dataItem.account?.email : "---"}</Typography>
                          </>
                        );
                      }}
                    </GridColumn>
                    <GridColumn
                      field="note"
                      title={getOrderQuickFilterLabel(OrderQuickFilterOptions.NOTE)}
                      width={100}
                      align="center"
                    >
                      {({ dataItem }: CellTemplateProps) => {
                        return (
                          <>
                            <Typography>{dataItem.note ? formatStringLength(dataItem.note, 30) : "---"}</Typography>
                          </>
                        );
                      }}
                    </GridColumn>
                    <GridColumn
                      field="quantity"
                      title={getOrderQuickFilterLabel(OrderQuickFilterOptions.QUANTITY)}
                      width={100}
                      align="center"
                    >
                      {({ dataItem }: CellTemplateProps) => {
                        return (
                          <>
                            <Typography>{caculateQuantity(dataItem)}</Typography>
                          </>
                        );
                      }}
                    </GridColumn>
                    <GridColumn
                      field="created_at"
                      title={getOrderQuickFilterLabel(OrderQuickFilterOptions.CREATED_AT)}
                      width={100}
                      align="center"
                    >
                      {({ dataItem }: CellTemplateProps) => {
                        return (
                          <>
                            <Typography>
                              {dataItem.created_at
                                ? formatDateUTCToLocalDateString(dataItem.created_at, false, "DD/MM/YYYY")
                                : "---"}
                            </Typography>
                          </>
                        );
                      }}
                    </GridColumn>
                    <GridColumn
                      field="returned_at"
                      title={getOrderQuickFilterLabel(OrderQuickFilterOptions.RETURNED_AT)}
                      width={100}
                      align="center"
                    >
                      {({ dataItem }: CellTemplateProps) => {
                        return (
                          <>
                            <Typography>
                              {dataItem.returned_at
                                ? formatDateUTCToLocalDateString(dataItem.returned_at, false, "DD/MM/YYYY")
                                : "---"}
                            </Typography>
                          </>
                        );
                      }}
                    </GridColumn>
                    <GridColumn
                      field="modified_at"
                      title={getOrderQuickFilterLabel(OrderQuickFilterOptions.MODIFIED_AT)}
                      width={100}
                      align="center"
                    >
                      {({ dataItem }: CellTemplateProps) => {
                        return (
                          <>
                            <Typography>
                              {dataItem.modified_at
                                ? formatDateUTCToLocalDateString(dataItem.modified_at, false, "DD/MM/YYYY")
                                : "---"}
                            </Typography>
                          </>
                        );
                      }}
                    </GridColumn>
                    <GridColumn
                      field="shipStatus"
                      title={getOrderQuickFilterLabel(OrderQuickFilterOptions.STATUS)}
                      width={100}
                      align="center"
                    >
                      {({ dataItem }: CellTemplateProps) => {
                        const orderStatus = genOrderStatus(dataItem);
                        return orderStatus ? (
                          orderStatus.color === 1 ? (
                            <Chip variant="outlined" size="small" label={orderStatus.name} className="warning" />
                          ) : orderStatus.color === 2 ? (
                            <Chip variant="outlined" size="small" label={orderStatus.name} className="success" />
                          ) : orderStatus.color === 3 ? (
                            <Chip variant="outlined" size="small" label={orderStatus.name} className="danger" />
                          ) : (
                            <Chip size="small" label={orderStatus.name} color="default" />
                          )
                        ) : null;
                      }}
                    </GridColumn>
                  </SapoGrid>
                ) : (
                  <NoResultsComponent
                    message={"Không tìm thấy kết quả"}
                    helpText={"Thử thay đổi điều kiện lọc hoặc từ khóa tìm kiếm"}
                  />
                )}
              </React.Fragment>
            )}
          </Box>
        </Box>
        <Dialog
          open={isShowPopup}
          minWidthPaper="600px"
          title="Cập nhập trạng thái"
          DialogActionProps={{
            renderActions: () => (
              <>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={() => {
                    setIsShowPopup(false);
                    initData();
                    setSelected([]);
                  }}
                >
                  Xác nhận
                </Button>
              </>
            ),
          }}
          children={
            <>
              <Box width={500}>
                <Typography>Các phiếu trả thiết bị thành công: {countSuccess}</Typography>
                <Typography>Các phiếu trả thiết bị thất bại: {countFail}</Typography>
              </Box>
            </>
          }
        ></Dialog>
      </Fragment>
    </>
  );
};

const mapStateToProps = (state: AppState) => ({
  menuState: state.menu,
  authState: state.auth,
});
const connector = connect(mapStateToProps);
type PropsFromRedux = ConnectedProps<typeof connector>;
export default connect(mapStateToProps, {})(withStyles(styles)(Orders));
