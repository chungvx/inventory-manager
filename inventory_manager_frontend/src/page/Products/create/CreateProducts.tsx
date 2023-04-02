import {withStyles, WithStyles} from "@material-ui/core";
import styles from "./CreateProducts.styles";
import {AppState} from "store/store";
import {connect, ConnectedProps} from "react-redux";
import React, {Fragment, useEffect, useState} from "react";
import HeaderAction from "../../../components/HeaderAction";
import {Box, Grid, Typography} from "@material-ui/core";
import {useHistory, useParams} from "react-router-dom";
import {useLocation} from "react-router";
import {
  Button,
  DataSource,
  DropdownSearch,
  Textarea,
} from "@sapo-presentation/sapo-ui-components";
import Paper from "components/Paper";
import TextField from "components/TextField";
import CategoryService, {CategoryResponse} from "services/CategoryService";
import {removeAscent, SnackbarErrorProp, SnackbarSuccessProp} from "utilities";
import ProductService, {ProductRequest} from "../../../services/ProductService";
import AutocompleteTagComponent from "../../../components/Autocomplete/Tags";
import {isNil} from "lodash";
import {useSnackbar} from "notistack";
import SerialService, {SerialFilterRequest} from "../../../services/SerialService";


export interface ProductsProps extends WithStyles<typeof styles> {
  history: any;
}

const CreateProduct = (props: ProductsProps & PropsFromRedux) => {
  const {classes, menuState} = props;
  const history = useHistory();
  const location = useLocation();
  const {id} = useParams<{ id: string }>();
  const { enqueueSnackbar } = useSnackbar();
  const [isLoadingPage, setIsLoadingPage] = useState<boolean>(false);
  const [categories, setCategories] = useState<CategoryResponse[]>([]);
  const [product, setProduct] = useState<ProductRequest>({});
  const [serials, setSerials] = useState<string[]>([]); // khi nào gọi request thì sẽ set lại vào product.serials

  const handleChangeFieldValue = (field: string, value: any) => {
      setProduct({...product, [field]: value});
  };

  useEffect(() => {
    init().then();
  }, [id]);

  const init = async () => {
    let cate = await CategoryService.filter({} as any);
    if (cate) {
      setCategories(cate.data.data);
    }
    if (!isNil(id)){
      let serialFilter: SerialFilterRequest = {
        limit: 100,
        page: 1,
        product_ids: [Number(id)],
      }
      let [productTask, serialTask] = await Promise.all([
        ProductService.getById(Number(id)),
        SerialService.filter(serialFilter)
        ]);
      if (productTask?.data) {
        let productResponse = productTask?.data;
        let newProduct: ProductRequest = {
          id: productResponse.id,
          name: productResponse.name,
          description: productResponse.description || "",
          category_id: productResponse.category_id || 0,
        }
        setProduct(newProduct);
      }
      if (serialTask?.data?.data) {
        let serialsRes = serialTask?.data?.data;
        setSerials(serialsRes.map(s => s.label));
      }
    }
  }

  const handleCreateProduct = async () => {
    setIsLoadingPage(true);
    try {
      if (isNil(id)){
        const response = await ProductService.create({...product, serials: serials});
        if (response.data.id && response.data.id > 0) {
          if (response.data.id && response.data.id > 0) {
            enqueueSnackbar("Tạo thiết bị thành công", SnackbarSuccessProp);
            history.push( `/admin/products/${response.data.id}`);
          }
        }
      } else {
        const response = await ProductService.update(Number(id), {...product, serials: serials});
        if (response.data.id && response.data.id > 0) {
          if (response.data.id && response.data.id > 0) {
            enqueueSnackbar("Cập nhật thiết bị thành công", SnackbarSuccessProp);
            history.push( `/admin/products/${response.data.id}`);
          }
        }
      }

    } catch (error) {
      if (isNil(id)) enqueueSnackbar("Tạo thiết bị thất bại", SnackbarErrorProp);
      else enqueueSnackbar("Cập nhật thiết bị thất bại", SnackbarErrorProp);
    } finally {
      setIsLoadingPage(false);
    }
  }

  return (
    <Fragment>
      <HeaderAction
        maxWidthContent={"1366px"}
        title={"Quay lại trang danh sách sản phẩm"}
        linkTo={"/admin/products"}
        groupAction={
          <Box className={classes.groupButtonAction}>
            <Button
              variant="outlined"
              onClick={() => {
                window.location.href = `/admin/products`
              }}
            >
              {"Thoát"}
            </Button>
            <Button
              isLoading={isLoadingPage}
              onClick={() => {
                setIsLoadingPage(true);
                handleCreateProduct().then();
              }}
              variant="contained"
            >
              {"Lưu"}
            </Button>
          </Box>
        }
      />
      <Box className={classes.root}>
        <Box className={classes.container}>
          <Box className={classes.productContainer}>
            <Grid container>
              <Grid item xs={8} style={{padding: 0}}>
                <Paper
                  borderHeader
                  className={classes.boxProductInfor}
                  renderHeadLeft={() => (
                    <Box>
                      <Typography style={{padding: "16px 24px"}} variant="h6">
                        Thông tin thiết bị
                      </Typography>
                    </Box>
                  )}
                >
                  <Box className="product-content-infor">
                    <Grid container spacing={3}>
                      <Grid item xs={12}>
                        <Box className={classes.boxProductName}>
                          <TextField
                            fullWidth
                            label={<span style={{fontSize: 20}}>Tên thiết bị</span>}
                            required
                            inputProps={{
                              maxLength: 500,
                            }}
                            placeholder={
                              "Vui lòng nhập tên thiết bị"
                            }
                            name={"name"}
                            value={product.name}
                            onChange={(evt: any) => {
                              handleChangeFieldValue("name", evt.target.value);
                            }}
                          />
                        </Box>
                      </Grid>
                      <Grid item xs={12}>
                        <Textarea
                          value={product.description}
                          onChange={(value) => {
                            handleChangeFieldValue("description", value);
                          }}
                          maxLength={250}
                          rows={3}
                          label="Mô tả thiết bị"
                          placeholder="VD: Sản phẩm còn mới"
                        />
                      </Grid>
                    </Grid>
                  </Box>
                </Paper>
              </Grid>
              <Grid item xs={4} style={{padding: 0, paddingLeft: 12}}>
                <Paper
                  borderHeader
                  className={classes.boxProductInfor}
                  renderHeadLeft={() => (
                    <Box>
                      <Typography style={{padding: "16px 24px"}} variant="h6">
                        Thông tin bổ sung
                      </Typography>
                    </Box>
                  )}
                >
                  <Box className="product-content-infor">
                    <Grid container spacing={3}>
                      <Grid item xs={12}>
                        <Box className={classes.boxProductName}>
                          <DropdownSearch
                            label={"Loại thiết bị"}
                            placeholder="Chọn loại thiết bị"
                            popperWidth={"376px"}
                            placement="bottom-end"
                            onChange={(value) => {
                              handleChangeFieldValue("category_id", value.id);
                            }}
                            value={categories.filter(i => i.id === product.category_id)}
                            renderOption={(value) => value.name}
                            fetchOptions={(query, page) => {
                              let _cate = categories || [];
                              if (query) {
                                _cate = categories.filter((item) =>
                                  removeAscent(item.name.toLocaleLowerCase()).includes(
                                    removeAscent(query?.toLocaleLowerCase() || "")
                                  )
                                );
                              }
                              const dataSource: DataSource = {
                                data: _cate,
                                limit: 250,
                                total: _cate.length,
                              };
                              return Promise.resolve(dataSource);
                            }}
                          />
                        </Box>
                      </Grid>
                      <Grid item xs={12} style={{marginBottom: 16}}>
                        <AutocompleteTagComponent
                          options={serials}
                          getOptionLabel={(option: any) => (isNil(option) ? "" : option)}
                          label="Mã serial cho riêng từng thiết bị"
                          inputChange={async (query?: string) => {
                          }}
                          inputStyle={
                            {
                              // minWidth: 156,
                            }
                          }
                          placeholder={"Nhập mã serial"}
                          defaultValue={serials || []}
                          onChange={(value) => {
                            setSerials(value);
                          }}
                          withoutMinHeight
                          key={`AutocompleteTag-stock-transfer}`}
                        />
                      </Grid>
                    </Grid>
                  </Box>
                </Paper>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Box>
    </Fragment>
  )
}

const mapStateToProps = (state: AppState) => (
  {
    menuState: state.menu,
    authState: state.auth,
  }
);
const connector = connect(mapStateToProps);
type PropsFromRedux = ConnectedProps<typeof connector>;
export default connect(mapStateToProps, {})(withStyles(styles)(CreateProduct));