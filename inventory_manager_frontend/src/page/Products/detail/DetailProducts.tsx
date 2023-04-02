import React, { Fragment, useEffect, useState } from "react";
import useStyles from "./DetailProduct.styles";
import HeaderAction from "components/HeaderAction/HeaderAction";
import {Box, Grid, withStyles} from "@material-ui/core";
import { Button, Chip, Typography, useModal, CircleCheckOutlineIcon } from "@sapo-presentation/sapo-ui-components";
import { Typography as TypographyMui } from "@material-ui/core";
import { useHistory, useLocation, useParams } from "react-router-dom";
import { useSnackbar } from "notistack";
import { Error, getMessageError, SnackbarSuccessProp } from "utilities";
import { AppState } from "store/store";
import { connect, ConnectedProps } from "react-redux";
import SnackbarUtils from "utilities/SnackbarUtilsConfigurator";
import { colorInk } from "theme/palette";
import moment from "moment";
import AddCircleOutlineIcon from "@material-ui/icons/AddCircleOutline";
import ProductService, {ProductResponse} from "../../../services/ProductService";
import SerialService, {SerialFilterRequest, SerialResponse} from "../../../services/SerialService";
import {getProductStatusName} from "../list/ProductFilter/ProductQuickFilter.consant";
import styles from "../create/CreateProducts.styles";
import {isNil} from "lodash";
import CategoryService, {CategoryResponse} from "../../../services/CategoryService";

interface DetialProductProps {}

const DetailProduct = (props: DetialProductProps & PropsFromRedux) => {
  const classes = useStyles();
  const { id } = useParams<{ id: string }>();
  const { enqueueSnackbar } = useSnackbar();
  const [product, setProduct] = useState<ProductResponse>();
  const [serials, setSerials] = useState<SerialResponse[]>([]);
  const [category, setCategory] = useState<CategoryResponse>();
  const history = useHistory();
  const locationUrl = useLocation<{ isNew: boolean; url: string }>();
  const { confirm } = useModal();
  const [loadingPage, setLoadingPage] = useState(false);

  useEffect(() => {
    fetchData(Number(id));
  }, [id]);

  const fetchData = async (proId: number) => {
    try {
      let serialFilter: SerialFilterRequest = {
        product_ids: [proId],
        limit: 100,
        page: 1,
        statuses: "active,inactive"
      }
      let [productTask, serialTask] = await Promise.all([
        ProductService.getById(proId),
        SerialService.filter(serialFilter),
      ]);
      if (productTask.data) {
        setProduct(productTask?.data);
      }
      if (serialTask?.data) {
        setSerials(serialTask?.data.data);
      }
      if (!isNil(productTask?.data?.category_id)){
        let categoryTask = await CategoryService.getById(productTask?.data?.category_id || 0);
        if (categoryTask?.data){
          setCategory(categoryTask?.data);
        }
      }

    } catch (e) {
      Error("Không tìm thấy thiết bị", enqueueSnackbar);
    }
  };

  // chuyển đến trang đơn hàng có line là serial này
  const handleClickSerial = async (id: number) => {
    // Tìm kiếm serial trong đơn nào
    let task = await SerialService.getWithOrder(id);
    if (task?.data && task?.data?.order_id){
      history.push(`/admin/orders/${task?.data?.order_id}`)
    }
  }
  const onDeleteProduct = async () => {
    if (!product) return;
    if (serials.filter((item) => item.status === "inactive").length > 0) {
      SnackbarUtils.error("Không thể xóa thiết bị này vì đang cho nhân viên mượn");
    }
    confirm(
      {
        title: `Xóa thiết bị ${product.name}`,
        message: (
          <Box>
            <Typography>Bạn có chắc chắn muốn xóa thiết bị này</Typography>
          </Box>
        ),
        primaryText: "Xác nhận",
      },
      async () => {
        setLoadingPage(true);
        await ProductService.delete(product.id)
          .then((res) => {
            if (res) {
              SnackbarUtils.success('Xóa thiết bị thành công');
              fetchData(product.id);
            }
          })
          .catch((e) => Error("Xóa thiết bị thất bại"))
          .finally(() => setLoadingPage(false));
      }
    );
  };

  return (
    <Fragment>
      <HeaderAction
        maxWidthContent={1366}
        title={"Quay lại trang danh sách thiết bị"}
        linkTo={"/admin/products"}
        groupAction={
          product?.status === "active" ? (
            <Fragment>
              <Box display="flex" justifyContent="space-between" alignItems="center">
                <Box style={{ marginRight: 16 }}>
                  <Button destruction size="regular" variant="outlined" onClick={onDeleteProduct} isLoading={loadingPage}>
                    {"Xóa"}
                  </Button>
                </Box>
                <Box>
                  <Button
                    onClick={() => {
                      history.push("/admin/products/" + id + "/edit");
                    }}
                    size="regular"
                    variant="outlined"
                    isLoading={loadingPage}
                  >
                    {"Sửa"}
                  </Button>
                </Box>
              </Box>
            </Fragment>
          ) : null
        }
      />
      <Box width={"100%"}>
        <Box className={classes.root}>
          {product ? (
            <Box className={classes.container}>
              <Grid container spacing={3}>
                <Grid item xs={12}>
                  <Box className={classes.boxCode}>
                    <Typography variant={"h4"}>{product.name}</Typography>
                    <Typography variant={"body2"} color={colorInk.base40} ml={"4px"}>
                      {moment(product.created_at).local().format("DD/MM/YYYY HH:mm")}
                    </Typography>
                    <Chip
                      ml={"12px"}
                      label={getProductStatusName(product.status || "")}
                      variant={product.status === "deleted" ? "warning" : "success"}
                      size="small"
                    />
                  </Box>
                </Grid>
              </Grid>
              <Grid container spacing={3} style={{marginTop: 32}}>
                <Grid item container xs={7} style={{maxWidth: "calc(58% - 24px)", backgroundColor: "#fff"}}>
                  <Grid item xs={12}>
                    <TypographyMui style={{ fontWeight: 500, fontSize: 16, paddingBottom: 5, paddingTop: 4 }}>Thông tin thiết bị</TypographyMui>
                    <hr style={{ borderTop: "0px solid #F3F4F5", marginLeft: -24, marginRight: -24, marginBottom: 0 }} />
                  </Grid>
                  <Grid item md={12} xs={12}>
                    <Box className={classes.generalInfoContainer}>
                      <Box className={classes.area1}>
                        <Typography color="#46515F" variant="body2">
                          Tên
                        </Typography>
                      </Box>
                      <Box className={classes.area2}>
                        <Typography color="#46515F" variant="body2">
                          Ngày tạo
                        </Typography>
                      </Box>
                      <Box className={classes.area3}>
                        <Typography color="#46515F" variant="body2">
                          Ngày điều chỉnh
                        </Typography>
                      </Box>
                      <Box className={classes.area4}>
                        <Typography color="#46515F" variant="body2">
                          Mô tả
                        </Typography>
                      </Box>
                      <Box className={classes.area5}>
                        <TypographyMui noWrap data-tip={product.name}>
                          :{" "}
                          <TypographyMui style={{ paddingLeft: "8px", color: "#0F1824" }} component="span" noWrap>
                            {product.name}
                          </TypographyMui>
                        </TypographyMui>
                      </Box>
                      <Box className={classes.area6}>
                        <TypographyMui noWrap>
                          :{" "}
                          <TypographyMui style={{ paddingLeft: "8px", color: "#0F1824" }} component="span">
                            {moment(product?.created_at).local().format("DD/MM/YYYY HH:mm")}
                          </TypographyMui>
                        </TypographyMui>
                      </Box>
                      <Box className={classes.area7}>
                        <TypographyMui noWrap>
                          :{" "}
                          <TypographyMui style={{ paddingLeft: "8px", color: "#0F1824" }} component="span">
                            {product?.modified_at
                              ? moment(product?.modified_at).local().format("DD/MM/YYYY HH:mm")
                              : "---"}
                          </TypographyMui>
                        </TypographyMui>
                      </Box>
                      <Box className={classes.area8}>
                        <TypographyMui data-tip={product.description} noWrap>
                          :{" "}
                          <TypographyMui style={{ paddingLeft: "8px", color: "#0F1824" }} component="span">
                            {product.description}
                          </TypographyMui>
                        </TypographyMui>
                      </Box>
                    </Box>
                  </Grid>
                </Grid>
                <Grid item style={{width: 24}}></Grid>
                <Grid item container xs={5} style={{backgroundColor: "#fff"}}>
                  <Grid item xs={12}>
                    <TypographyMui style={{ fontWeight: 500, fontSize: 16, paddingBottom: 5, paddingTop: 4 }}>Thông tin bổ sung</TypographyMui>
                    <hr style={{ borderTop: "0px solid #F3F4F5", marginLeft: -24, marginRight: -24, marginBottom: 0 }} />
                  </Grid>
                  <Grid item xs={12}>
                    <Typography pb={2} variant={"subtitle1"}>Loại sản phẩm</Typography>
                    {product?.category_id && category ? (
                      <Typography pb="8px">{category.name}</Typography>
                    ) : (
                      <TypographyMui style={{paddingBottom: 8}} className={classes.emptyText}>Không thuộc loại sản phẩm nào</TypographyMui>
                    )}
                  </Grid>
                  <Grid item xs={12} style={{ marginBottom: "8px" }}>
                    <Typography pb={2} variant={"subtitle1"}>
                      Mã serial đang quản lý
                    </Typography>
                    {serials?.length ? (
                      serials.map((serial) =>
                        <Chip
                          mr={2}
                          mt={2}
                          variant={serial.status === "inactive" ? "warning" : "success"}
                          label={serial.label}
                          onClick={() => handleClickSerial(serial.id || 0)}
                        />)
                    ) : (
                      <TypographyMui className={classes.emptyText}>Chưa có mã serial nào</TypographyMui>
                    )}
                  </Grid>
                </Grid>
              </Grid>
            </Box>
          ) : null}
        </Box>
      </Box>
    </Fragment>
  );
};
const mapStateToProps = (state: AppState) => (
  {
    menuState: state.menu,
    authState: state.auth,
  }
);
const connector = connect(mapStateToProps);
type PropsFromRedux = ConnectedProps<typeof connector>;
export default connect(mapStateToProps, {})(withStyles(styles)(DetailProduct));