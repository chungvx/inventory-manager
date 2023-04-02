import { Box, MenuItem, Typography, WithStyles, withStyles } from "@material-ui/core";
import React, { Fragment, useCallback, useEffect, useRef, useState } from "react";
import { connect, ConnectedProps } from "react-redux";
import { AppState } from "store/store";
import styles from "./Product.styles";
import NoResultsComponent from "components/NoResults/NoResultsComponent";
import AddCircleOutline from "@material-ui/icons/AddCircleOutline";
import SearchBox from "components/SearchBox/SearchBox";
import LoadingAuth from "components/Loading/LoadingAuth";
import SapoGrid from "components/SapoGrid/SapoGrid";
import { CellTemplateProps } from "components/SapoGridSticky";
import { GridColumn } from "components/SapoGrid/GridColumn/GridColumn";
import { formatDateUTCToLocalDateString, formatStringLength, getMessageError } from "utilities";
import {
  DataResult,
  GridPageChangeEvent,
  GridSelectionChangeEvent,
} from "components/SapoGrid/SapoGrid.type";
import { useHistory } from "react-router-dom";

import QueryUtils from "utilities/QueryUtils";
import useQueryParams from "hocs/useQueryParams";
import { TagFilterItemType } from "components/TagFilterItem/TagFilterItem.types";
import ProductService, { ProductFilterRequest, ProductResponse, ProductsFilterRequest } from "services/ProductService";
import {
  getProductQuickFilterLabel,
  getProductStatusName,
  ProductQuickFilterOptions,
  ProductStatus,
} from "./ProductFilter/ProductQuickFilter.consant";
import Chip from "components/Chip";
import ListTagFilterItem from "components/TagFilterItem/ListTagFilterItem";
import { cloneDeep, isNil } from "lodash";
import SnackbarUtils from "utilities/SnackbarUtilsConfigurator";
import Button from "components/Button";
import ProductQuickFilter from "./ProductFilter/ProductQuickFilter.component";
import CategoryService, {CategoryFilterRequest, CategoryResponse} from "../../../services/CategoryService";

export interface ProductsProps extends WithStyles<typeof styles> {
  history: any;
}

const Product = (props: ProductsProps & PropsFromRedux) => {
  const { classes, menuState } = props;
  const [loading, setLoading] = useState<boolean>(true);
  const [tagsFilterItem, setTagsFilterItem] = useState<TagFilterItemType[]>([]);
  const [data, setData] = useState<DataResult>({
    data: [],
    total: 0,
  });
  const [categories, setCategories] = useState<CategoryResponse[]>([]);
  const queryParams = useQueryParams();
  const queryParamsRef = useRef<URLSearchParams>(queryParams);
  const [selected, setSelected] = useState<ProductResponse[]>([]);
  const history = useHistory();
  const getDefaultQuery = () => {
    // Không hiểu tại sao useQueryParams không dùng đk
    const currentFilter = props.history.location.search as string;
    const dataFromQuery: any = {};
    for (let searchFilter of currentFilter.slice(1).split("&")) {
      const data = searchFilter.split("=");
      dataFromQuery[data[0]] = decodeURIComponent(data[1]);
    }
    const initFilter: ProductsFilterRequest = {
      page: Number(dataFromQuery["page"]) || 1,
      limit: Number(dataFromQuery["limit"]) || 20,
      category_id: dataFromQuery["category_id"] || undefined,
      statuses: dataFromQuery["statuses"] || undefined,
    };
    return initFilter;
  };

  const [filters, setFilters] = useState<ProductsFilterRequest>({ ...getDefaultQuery() });
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
    document.title = "Danh sách thiết bị";
  }, []);
  async function fetchDataFilterItems(filters: ProductsFilterRequest) {
    let tagFilter: TagFilterItemType[] = [];
    if (filters.status) {
      let statuses = filters.status.split(",");
      let label = statuses.map((item) => getProductStatusName(item)).join(", ");
      tagFilter.push({
        filterType: "status",
        label: `${getProductQuickFilterLabel(ProductQuickFilterOptions.STATUS)}: ${label}`,
        filterName: ProductQuickFilterOptions.STATUS,
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

  const genProductStatus = (product: any) => {
    if (!product) {
      return undefined;
    }
    let name = getProductStatusName(product.status);
    let color = 0;
    switch (product.status) {
      case ProductStatus.ACTIVE:
        color = 1;
        break;
      case ProductStatus.DELETED:
        color = 3;
        break;
    }
    return { name, color };
  };
  useEffect(() => {
    initData();
    changeQueryString(filters);
  }, [filters]);
  const initData = async () => {
    fetchDataFilterItems(filters).then();
    let filter: ProductFilterRequest = {
      limit: filters.limit || 20,
      page: filters.page || 1,
      ids: filters.ids,
      category_id: filters.category_id,
      statuses: filters.statuses,
      query: filters.query,
      stock: filters.stock,
    };
    try {
      let res = await ProductService.filter(filter);
      if (res) {
        setData({
          data: res.data.data,
          total: res.data.metadata?.total || 0,
        });
        if (res.data.data.length > 0){
          let categoryIds = res.data.data.map((p) => p.category_id).filter(i => !isNil(i));
          let categoryFilter: CategoryFilterRequest = {
            limit: filters.limit || 20,
            page: 1,
            ids: categoryIds.join(','),
          }
          let cate = await CategoryService.filter(categoryFilter);
          if (cate){
            setCategories(cate.data.data);
          }
        }
        setLoading(false);
      }
    } catch (err) {
      SnackbarUtils.error(getMessageError(err));
    }
  };

  const onSubmitFilter = (filter: ProductsFilterRequest) => {
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
                  history.push(`/admin/products/create`);
                }}
              >
                {"Thêm thiết bị khác"}
              </Button>
            </Box>
          </Box>
          <Box className={classes.listProductBox}>
            <Box className={classes.utilities}>
              <Box className={classes.filterAndSearchBox}>
                <SearchBox
                  placeholder={"Tìm kiếm phiếu theo tên thiết bị"}
                  onSubmit={() => {}}
                  value={null}
                  onBlur={(e) => {}}
                  className={classes.searchbox}
                />
                <ProductQuickFilter filters={filters} onSubmit={onSubmitFilter} />
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
                    let newFilterQuery = cloneDeep(filters) as ProductsFilterRequest;
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
                      history.push(`/admin/products/${row.id}`);
                    }}
                    disablePaging={false}
                    selectedItems={selected}
                    selectBy={"id"}
                    onSelectionChange={handleSelectionChange}
                    nameObjectSelected="thiết bị"
                    isMenuCollapse={menuState.collapse}
                  >
                    <GridColumn
                      field="name"
                      title={"Tên thiết bị"}
                      width={100}
                      align="center"
                    >
                      {({ dataItem }: CellTemplateProps) => {
                        return (
                          <>
                            <Typography>{dataItem.name ? dataItem.name : "---"}</Typography>
                          </>
                        );
                      }}
                    </GridColumn>
                    <GridColumn
                      field="category_id"
                      title={"Loại sản phẩm"}
                      width={100}
                      align="center"
                    >
                      {({ dataItem }: CellTemplateProps) => {
                        return (
                          <>
                            <Typography>{dataItem.category_id ? categories.find(c => c.id === dataItem.category_id)?.name : "---"}</Typography>
                          </>
                        );
                      }}
                    </GridColumn>
                    <GridColumn
                      field="description"
                      title={"Mô tả"}
                      width={150}
                      align="center"
                    >
                      {({ dataItem }: CellTemplateProps) => {
                        return (
                          <>
                            <Typography>{dataItem.description ? formatStringLength(dataItem.description, 50) : "---"}</Typography>
                          </>
                        );
                      }}
                    </GridColumn>
                    <GridColumn
                      field="quantity_stock"
                      title={"Số lượng tồn"}
                      width={100}
                      align="center"
                    >
                      {({ dataItem }: CellTemplateProps) => {
                        return (
                          <>
                            <Typography>{dataItem.quantity_stock}</Typography>
                          </>
                        );
                      }}
                    </GridColumn>
                    <GridColumn
                      field="quantity_not_stock"
                      title={"Số lượng mượn"}
                      width={100}
                      align="center"
                    >
                      {({ dataItem }: CellTemplateProps) => {
                        return (
                          <>
                            <Typography>{dataItem.quantity_not_stock}</Typography>
                          </>
                        );
                      }}
                    </GridColumn>
                    <GridColumn
                      field="created_at"
                      title={"Ngày tạo"}
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
                      field="status"
                      title={"Trạng thái"}
                      width={100}
                      align="center"
                    >
                      {({ dataItem }: CellTemplateProps) => {
                        const productStatus = genProductStatus(dataItem);
                        return productStatus ? (
                          productStatus.color === 1 ? (
                            <Chip variant="outlined" size="small" label={productStatus.name} className="warning" />
                          ) : productStatus.color === 3 ? (
                            <Chip variant="outlined" size="small" label={productStatus.name} className="danger" />
                          ) : (
                            <Chip size="small" label={productStatus.name} color="default" />
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
export default connect(mapStateToProps, {})(withStyles(styles)(Product));
