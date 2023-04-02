import { Box, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from "@material-ui/core";
import { Chip, Grid } from "@sapo-presentation/sapo-ui-components";
import Paper from "components/Paper";
import ViewTagsV2 from "components/ViewTagsV2";
import React from "react";
import { Fragment, memo } from "react";
import { connect, ConnectedProps } from "react-redux";
import { OrderResponse } from "services/OrderService";
import { AppState } from "store/store";
import { formatStringLength } from "utilities";
import useStyles from "./BoxProduct.styles";
interface BoxProductProps extends PropsFromRedux {
  order?: OrderResponse;
}

const BoxProduct = memo((props: BoxProductProps) => {
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
                      {order &&
                        order?.line_item &&
                        order?.line_item.map((item, index) => {
                          return (
                            <>
                              <TableRow key={index}>
                                <TableCell align="center" style={{ width: 55, borderBottom: 0 }}>
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
                                <TableCell align="center" style={{ width: 20 }}></TableCell>
                              </TableRow>
                              <TableRow>
                                <TableCell></TableCell>
                                <TableCell colSpan={4}>
                                  {item.serials &&
                                    item.serials.map((sr, index) => (
                                      <Chip variant="success" label={sr.label} key={index} size="small"/>
                                    ))}
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
