import { Box, Grid } from "@material-ui/core";
import { Chip } from "@sapo-presentation/sapo-ui-components";
import Button from "components/Button";
import HeaderAction from "components/HeaderAction";
import Paper from "components/Paper";
import React, { useEffect, useState } from "react";
import { Fragment, memo } from "react";
import { connect, ConnectedProps } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import OrderService, { OrderResponse } from "services/OrderService";
import { AppState } from "store/store";
import { getMessageError } from "utilities";
import SnackbarUtils from "utilities/SnackbarUtilsConfigurator";
import { getOrderStatusName, OrderStatus } from "../list/OrdersFilter/OrdersQuickFilter.consant";
import BoxAdditional from "./component/BoxAdditional/BoxAdditional";
import BoxInfo from "./component/BoxInfo/BoxInfo";
import BoxProduct from "./component/BoxProduct/BoxProduct";
import useStyles from "./DetailOrder.styles";

const DetailOrder = memo((props: PropsFromRedux) => {
  const classes = useStyles();
  const [loading, setLoading] = useState<boolean>(false);
  const { id } = useParams<{ id: string }>();
  const [orders, setOrders] = useState<OrderResponse>();
  const history = useHistory();
  useEffect(() => {
    initData();
  }, [id]);
  const initData = async () => {
    try {
      let res = await OrderService.getById(id);
      if (res) {
        setOrders(res.data);
      }
    } catch (error) {
      SnackbarUtils.error(getMessageError(error));
    }
  };
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
      <Button
        isLoading={loading}
        variant="outlined"
        color="primary"
        btnType="destruction"
        onClick={async () => {
          try {
            OrderService.delete(id);
            SnackbarUtils.success("Xóa phiếu thành công!");
            history.push(`/admin/orders`);
          } catch (error) {
            SnackbarUtils.error(getMessageError(error));
          }
        }}
        style={{ marginRight: 16 }}
      >
        Hủy phiếu
      </Button>
      <Button
        isLoading={loading}
        variant="contained"
        color="primary"
        onClick={async () => {
          setLoading(true);
          try {
            let res = await OrderService.return(id);
            setOrders(res.data);
            SnackbarUtils.success("Trả thiết bị thành công!");
            setLoading(false);
          } catch (error) {
            SnackbarUtils.error(getMessageError(error));
            setLoading(false);
          }
        }}
        style={{ marginRight: 16 }}
      >
        Trả thiết bị
      </Button>
    </Fragment>
  );
  return (
    <Fragment>
      <HeaderAction
        maxWidthContent={"1366px"}
        title={"Chi tiết phiếu mượn"}
        linkTo={"/admin/orders"}
        groupAction={GroupAction()}
      />
      <Box className={classes.root}>
        {orders && (
          <Box className={classes.container}>
            <Box className={classes.formOrder}>
              <Chip
                label={getOrderStatusName(orders.status)}
                variant={orders.status === OrderStatus.BORROWING ? "warning" : "success"}
              />
              <Grid container spacing={3} style={{ marginTop: 10 }}>
                <Grid item xs={12}>
                  <Grid container spacing={3}>
                    <Grid item style={{ flex: "1 0 0" }} xs={8}>
                      <BoxInfo order={orders} />
                    </Grid>
                    <Grid item xs={4}>
                      <BoxAdditional order={orders} />
                    </Grid>
                  </Grid>
                </Grid>
                <Grid xs={12} item>
                  <Grid container spacing={3}>
                    <Grid item xs={12}>
                      <BoxProduct order={orders} />
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
            </Box>
          </Box>
        )}
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

export default connector(DetailOrder);
