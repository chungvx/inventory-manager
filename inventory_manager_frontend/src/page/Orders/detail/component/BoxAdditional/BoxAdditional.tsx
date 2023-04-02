import { Box, Typography } from "@material-ui/core";
import { Grid, Textarea } from "@sapo-presentation/sapo-ui-components";
import Paper from "components/Paper";
import React from "react";
import { Fragment, memo } from "react";
import { connect, ConnectedProps } from "react-redux";
import { OrderResponse } from "services/OrderService";
import { AppState } from "store/store";
import { formatStringLength } from "utilities";
import useStyles from "./BoxAdditional.styles";
interface BoxAdditionalProps extends PropsFromRedux {
  order?: OrderResponse;
}

const BoxAdditional = memo((props: BoxAdditionalProps) => {
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
              <Typography style={{ fontWeight: 500, fontSize: 16, paddingBottom: 5 }}>Thông tin bổ sung</Typography>
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
              <Typography>Ghi chú: </Typography>
              <Typography >{formatStringLength(order?.note || "---", 100)}</Typography>
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

export default connector(BoxAdditional);
