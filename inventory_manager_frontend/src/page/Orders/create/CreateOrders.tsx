import { Box, Grid } from "@material-ui/core";
import Button from "components/Button";
import HeaderAction from "components/HeaderAction";
import Paper from "components/Paper";
import { isNil } from "lodash";
import React, { useState } from "react";
import { Fragment, memo } from "react";
import { connect, ConnectedProps } from "react-redux";
import { useHistory } from "react-router-dom";
import OrderService from "services/OrderService";
import { AppState } from "store/store";
import { getMessageError } from "utilities";
import SnackbarUtils from "utilities/SnackbarUtilsConfigurator";
import BoxAdditional from "./component/BoxAdditional/BoxAdditional";
import BoxInfo from "./component/BoxInfo/BoxInfo";
import BoxProduct from "./component/BoxProduct/BoxProduct";
import useStyles from "./CreateOrders.styles";
import { CreateOrderRequest } from "./CreateOrders.types";
import { useCreateOrderStore } from "./stores";

const CreateOrder = memo((props: PropsFromRedux) => {
  const classes = useStyles();
  const [loading, setLoading] = useState<boolean>(false);
  const { order, lineItems, account, deleteEverything } = useCreateOrderStore();
  const history = useHistory();
  const createOrder = async () => {
    if(isNil(account)){
      SnackbarUtils.error("Không có thông tin người mượn!");
      return;
    }
    if(isNil(lineItems) || lineItems.length === 0){
      SnackbarUtils.error("Không có thông tin thiết bị mượn!");
      return;
    }
    let orders: CreateOrderRequest =  {
      ...order,
      account_id: account.id,
      line_items: lineItems,
    }
    try {
      let res = await OrderService.create(orders);
      if(res){
        SnackbarUtils.success("Tạo đơn thành công!");
        history.push(`/admin/orders/${res.data.id}`);
        deleteEverything();
      }
    } catch (error) {
      SnackbarUtils.error(getMessageError(error))
    }
    
  }
  const GroupAction = (isBottom = false) => (
    <Fragment>
      <Button
        variant="outlined"
        color="primary"
        style={{ marginRight: 16 }}
        onClick={() => {
          window.location.href = `/admin/orders`;
        }}
      >
        Thoát
      </Button>
      <Button isLoading={loading} variant="contained" color="primary" onClick={() => {createOrder()}}>
        Lưu
      </Button>
    </Fragment>
  );
  return (
    <Fragment>
      <HeaderAction
        maxWidthContent={"1366px"}
        title={"Tạo phiếu mượn"}
        linkTo={"/admin/orders"}
        groupAction={GroupAction()}
      />
      <Box className={classes.root}>
        <Box className={classes.container}>
          <Box className={classes.formOrder}>
            <Grid container spacing={3}>
              <Grid item xs={12}>
                <Grid container spacing={3}>
                  <Grid item style={{ flex: "1 0 0" }} xs={8}>
                    <BoxInfo />
                  </Grid>
                  <Grid item xs={4}>
                    <BoxAdditional />
                  </Grid>
                </Grid>
              </Grid>
              <Grid xs={12} item>
                <Grid container spacing={3}>
                  <Grid item xs={12}>
                    <BoxProduct />
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Box>
    </Fragment>
  );
});
const mapStateToProps = ({ auth: { user } }: AppState) => ({
  user,
});
const mapDispatchToProps = {};

const connector = connect(mapStateToProps, mapDispatchToProps);
type PropsFromRedux = ConnectedProps<typeof connector>;

export default connector(CreateOrder);
