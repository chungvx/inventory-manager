import { Box, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from "@material-ui/core";
import { CloseIcon, Grid, IconButton } from "@sapo-presentation/sapo-ui-components";
import Paper from "components/Paper";
import SelectInfinite from "components/Select/SelectInfinite";
import { DataSource } from "components/Select/types";
import ViewTagsV2 from "components/ViewTagsV2";
import { ProductStatus } from "page/Products/list/ProductFilter/ProductQuickFilter.consant";
import React from "react";
import { Fragment, memo } from "react";
import { connect, ConnectedProps } from "react-redux";
import ProductService, { ProductFilterRequest, ProductResponse } from "services/ProductService";
import SerialService, { SerialFilterRequest, SerialResponse } from "services/SerialService";
import { AppState } from "store/store";
import { formatStringLength } from "utilities";
import { OrderLineItemRequest, SerialRequest } from "../../CreateOrders.types";
import { useCreateOrderStore } from "../../stores";
import useStyles from "./BoxProduct.styles";
interface BoxProductProps extends PropsFromRedux {}

const BoxProduct = memo((props: BoxProductProps) => {
  const classes = useStyles();
  const { set, addOrderLineItems, lineItems, deleteOrderLineItemById, updateOrderLineItems } = useCreateOrderStore();

  console.log({ lineItems });
  return (
    <Fragment>
      <Paper className={classes.root} borderHeader={false} headerProps={{ height: 48 }}>
        <Box
          height={"100%"}
          display={"flex"}
          flexDirection={"column"}
          justifyContent={"space-between"}
          position={"relative"}
        >
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <Typography style={{ fontWeight: 500, fontSize: 16, paddingBottom: 5 }}>Thông tin thiết bị</Typography>
              <hr
                style={{
                  borderTop: "0px solid #F3F4F5",
                  marginLeft: -24,
                  marginRight: -24,
                  marginBottom: 0,
                }}
              />
            </Grid>
            <Grid item xs={12}>
              <Box>
                <SelectInfinite
                  value={null}
                  placeholder={""}
                  onChange={(value: ProductResponse) => {
                    if (value) {
                      let orderRequest: OrderLineItemRequest = {
                        product_id: value.id,
                        description: value.description,
                        name: value.name,
                      };
                      addOrderLineItems(orderRequest);
                    }
                  }}
                  getOptionLabel={(e: ProductResponse) => e.name}
                  fetchDataSource={async (filters) => {
                    let filter: ProductFilterRequest = {
                      limit: filters.limit || 20,
                      page: filters.page || 1,
                      query: filters.query === "" ? undefined : filters.query,
                      statuses: ProductStatus.ACTIVE,
                    };
                    let res = await ProductService.filter(filter);
                    const dataSource = {} as DataSource;
                    dataSource.data = res.data.data;
                    dataSource.metaData = {
                      totalPage: Math.ceil((res.data.metadata?.total || 0) / (filter.limit || 10)),
                      totalItems: res.data.metadata?.total || 0,
                    };
                    return Promise.resolve(dataSource);
                  }}
                  className={classes.infiniteList}
                />
              </Box>
            </Grid>
            <Grid item xs={12}>
              <Box width="100%" maxHeight="400px" minHeight="200px" style={{ overflow: "auto" }}>
                <TableContainer style={{ marginBottom: 24 }}>
                  <Table
                    stickyHeader
                    aria-label="simple table"
                    style={{ borderCollapse: "inherit", tableLayout: "fixed" }}
                  >
                    <TableHead>
                      <TableRow>
                        <TableCell align="center" style={{ width: 55 }}>
                          <Typography>STT</Typography>
                        </TableCell>
                        <TableCell align="center" style={{ width: 200 }}>
                          <Typography>Tên</Typography>
                        </TableCell>
                        <TableCell align="center" style={{ width: 100 }}>
                          <Typography>Số lượng</Typography>
                        </TableCell>
                        <TableCell align="center" style={{ width: 200 }}>
                          <Typography>Mô tả</Typography>
                        </TableCell>
                        <TableCell align="center" style={{ width: 20 }}></TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {lineItems &&
                        lineItems.map((item, index) => {
                          return (
                            <>
                              <TableRow key={index}>
                                <TableCell align="center" style={{ width: 55, borderBottom: 0 }} >
                                  {index + 1}
                                </TableCell>
                                <TableCell align="center" style={{ width: 200 }}>
                                  {item?.name}
                                </TableCell>
                                <TableCell align="center" style={{ width: 100 }}>
                                  {item.serials?.length || 0}
                                </TableCell>
                                <TableCell align="center" style={{ width: 200 }}>
                                  {formatStringLength(item?.description || "", 50)}
                                </TableCell>
                                <TableCell align="center" style={{ width: 20 }}>
                                  <IconButton
                                    size="small"
                                    color="secondary"
                                    onClick={() => {
                                      deleteOrderLineItemById(item.product_id);
                                    }}
                                  >
                                    <CloseIcon />
                                  </IconButton>
                                </TableCell>
                              </TableRow>
                              <TableRow>
                                <TableCell style={{ borderBottom: 0 }}></TableCell>
                                <TableCell colSpan={4} style={{ borderBottom: 0 }}>
                                  <SelectInfinite
                                    value={undefined}
                                    placeholder="Tìm kiếm serial"
                                    getOptionLabel={(e: SerialResponse) => e.label}
                                    fetchDataSource={async (filters: any) => {
                                      let filter: SerialFilterRequest = {
                                        product_ids: [item.product_id],
                                        limit: filters.limit,
                                        page: filters.page,
                                        query: filters.query,
                                        statuses: "active",
                                      };
                                      let res = await SerialService.filter(filter);
                                      let data = {} as DataSource;
                                      data.data = res.data.data;
                                      data.metaData = {
                                        totalPage: Math.ceil((res.data.metadata?.total || 0) / (filter.limit || 10)),
                                        totalItems: res.data.metadata?.total || 0,
                                      };
                                      return Promise.resolve(data);
                                    }}
                                    onChange={(value: SerialResponse) => {
                                      if (value) {
                                        let serialRequest: SerialRequest = {
                                          serial_id: value.id,
                                          label: value.label,
                                        };
                                        let itemOld = item.serials?.filter(
                                          (item) => item.serial_id === serialRequest.serial_id
                                        );
                                        let newItem: OrderLineItemRequest = {
                                          ...item,
                                          serials:
                                            itemOld && itemOld.length > 0 && item?.serials
                                              ? [...item?.serials]
                                              : [...(item?.serials || []), serialRequest],
                                        };
                                        updateOrderLineItems(newItem);
                                      }
                                    }}
                                  />
                                </TableCell>
                              </TableRow>
                              <TableRow>
                                <TableCell></TableCell>
                                <TableCell colSpan={4}>
                                  {item.serials && (
                                    <ViewTagsV2
                                      onDelete={(serial) => {
                                        if (serial) {
                                          let newItem: OrderLineItemRequest = {
                                            ...item,
                                            serials: item.serials?.filter((item) => item.label !== serial),
                                          };
                                          updateOrderLineItems(newItem);
                                        }
                                      }}
                                      classRoot={classes.viewTag}
                                      tags={item.serials?.map((x) => x.label) || []}
                                      parentWidth={100}
                                    />
                                  )}
                                </TableCell>
                              </TableRow>
                            </>
                          );
                        })}
                    </TableBody>
                  </Table>
                </TableContainer>
              </Box>
            </Grid>
          </Grid>
        </Box>
      </Paper>
    </Fragment>
  );
});

const mapStateToProps = ({ auth: { user } }: AppState) => ({
  user,
});

const mapDispatchToProps = {};

const connector = connect(mapStateToProps, mapDispatchToProps);
type PropsFromRedux = ConnectedProps<typeof connector>;

export default connector(BoxProduct);
