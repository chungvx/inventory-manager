import { Box, MenuItem, Typography } from "@material-ui/core";
import { Grid } from "@sapo-presentation/sapo-ui-components";
import Paper from "components/Paper";
import SearchSuggestInfinite from "components/Select/SearchSuggestInfinite";
import { DataSource } from "components/Select/types";
import { isArray, isNil } from "lodash";
import React from "react";
import { Fragment, memo } from "react";
import { connect, ConnectedProps } from "react-redux";
import OrderService from "services/OrderService";
import { AppState } from "store/store";
import { colorInk } from "theme/palette";
import { formatStringLength } from "utilities";
import { useCreateOrderStore } from "../../stores";
import useStyles from "./BoxInfo.styles";
interface BoxInfoProps extends PropsFromRedux {}

const BoxInfo = memo((props: BoxInfoProps) => {
  const classes = useStyles();
  const { set, account } = useCreateOrderStore();
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
              <SearchSuggestInfinite
                width="100%"
                type="select-search"
                getOptionLabel={(e) => e.name}
                uniqKey="id"
                placement="bottom"
                renderOption={(option) => (
                  <MenuItem className={classes.customOptionShipper}>
                    <Box display={"flex"} width={"calc(100% - 20px)"}>
                      <Box width="45%">
                        <Typography noWrap>{formatStringLength(option.name, 20)}</Typography>
                        {option ? (
                          <Typography variant={"subtitle1"} noWrap>
                            {option.email}
                          </Typography>
                        ) : (
                          ""
                        )}
                      </Box>
                    </Box>
                  </MenuItem>
                )}
                fetchDataSource={async (filter) => {
                  let dataSource = {} as DataSource;
                  let res = await OrderService.filterUser(filter);
                  dataSource.data = res.data.accounts.filter(
                    (item) =>
                      isNil(filter.query) ||
                      filter.query === "" ||
                      (filter.query &&
                        (item.name?.toLowerCase()?.includes(filter.query?.toLowerCase()) ||
                          item.email?.toLowerCase()?.includes(filter.query?.toLowerCase()) ||
                          item.username?.toLowerCase()?.includes(filter.query?.toLowerCase())))
                  );
                  dataSource.metaData = {
                    totalPage: 1,
                    totalItems: res.data.metadata.total,
                  };
                  return Promise.resolve(dataSource);
                }}
                onQueryChange={(filter) => {
                  let dataSourceFilter = {} as any;
                  dataSourceFilter.query = isNil(filter.query) ? "" : filter.query;
                  dataSourceFilter.page = filter.page ?? 1;
                  dataSourceFilter.limit = 10;
                  return dataSourceFilter;
                }}
                value={account}
                onChange={(value) => {
                  if (!isArray(value) && value) {
                    set((prev) => ({
                      ...prev,
                      account: value,
                    }));
                  }
                }}
                renderValueElement={(e) => e.name}
                label="Nhân viên mượn"
              />
              {account && account.id && (
                <Grid xs={12} mt={"10px"}>
                  <Grid xs={12} container mt={"10px"}>
                    <Grid xs={2} item>
                      <Typography style={{ fontWeight: 400 }}>Tên Nv</Typography>
                    </Grid>
                    <Grid xs={1} item>
                      <Typography style={{ fontWeight: 400 }}>:</Typography>
                    </Grid>
                    <Grid xs={3} item>
                      {account.name}
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
                      {account.email}
                    </Grid>
                  </Grid>
                </Grid>
              )}
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
