import { Box, MenuItem, Typography } from "@material-ui/core";
import { Grid } from "@sapo-presentation/sapo-ui-components";
import Paper from "components/Paper";
import SearchSuggestInfinite from "components/Select/SearchSuggestInfinite";
import { DataSource } from "components/Select/types";
import { isArray, isNil } from "lodash";
import React from "react";
import { Fragment, memo } from "react";
import { connect, ConnectedProps } from "react-redux";
import OrderService, { OrderResponse } from "services/OrderService";
import { AppState } from "store/store";
import { colorInk } from "theme/palette";
import { formatDateTime, formatDateUTCToLocalDateString, formatStringLength } from "utilities";
import useStyles from "./BoxInfo.styles";
interface BoxInfoProps extends PropsFromRedux {
  order?: OrderResponse;
}

const BoxInfo = memo((props: BoxInfoProps) => {
  const classes = useStyles();
  const { order } = props;
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
              <Typography style={{ fontWeight: 500, fontSize: 16, paddingBottom: 5 }}>Thông tin phiếu</Typography>
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
              <Grid xs={12} mt={"10px"}>
                <Grid xs={12} container mt={"10px"}>
                  <Grid xs={2} item>
                    <Typography style={{ fontWeight: 400 }}>Tên Nv</Typography>
                  </Grid>
                  <Grid xs={1} item>
                    <Typography style={{ fontWeight: 400 }}>:</Typography>
                  </Grid>
                  <Grid xs={3} item>
                    {order?.account?.name}
                  </Grid>
                  <Grid xs={2} item>
                    <Typography style={{ fontWeight: 400 }}>Ngày tạo</Typography>
                  </Grid>
                  <Grid xs={1} item>
                    <Typography style={{ fontWeight: 400 }}>:</Typography>
                  </Grid>
                  <Grid xs={3} item>
                    {formatDateTime(order?.created_at || new Date())}
                  </Grid>
                </Grid>
                <Grid xs={12} container mt={"10px"}>
                  <Grid xs={2} item>
                    <Typography style={{ fontWeight: 400 }}>Email:</Typography>
                  </Grid>
                  <Grid xs={1} item>
                    <Typography style={{ fontWeight: 400 }}>:</Typography>
                  </Grid>
                  <Grid xs={3} item>
                    {order?.account?.email}
                  </Grid>
                  <Grid xs={2} item>
                    <Typography style={{ fontWeight: 400 }}>Ngày trả</Typography>
                  </Grid>
                  <Grid xs={1} item>
                    <Typography style={{ fontWeight: 400 }}>:</Typography>
                  </Grid>
                  <Grid xs={3} item>
                    {order?.returned_at ? formatDateTime(order?.returned_at) : "---"}
                  </Grid>
                </Grid>
              </Grid>
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

export default connector(BoxInfo);
