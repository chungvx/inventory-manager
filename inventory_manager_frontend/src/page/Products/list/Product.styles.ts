
import { createStyles, Theme } from "@material-ui/core";
import defaultPalette, { colorInk } from "theme/palette";
const styles = (theme: Theme) =>
  createStyles({
    container: {
      display: "flex",
      flexDirection: "column",
      padding: "0 32px 40px",
      flex: "1 1 auto",
    },
    header: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      height: "60px",
    },
    listProductBox: {
      boxShadow: "0px 2px 4px rgba(168, 168, 168, 0.25)",
      backgroundColor: "white",
    },
    utilities: {
      display: "flex",
      flexDirection: "column",
      backgroundColor: "white",
    },
    filterAndSearchBox: {
      display: "flex",
      flexDirection: "row",
      alignItems: "center",
      padding: "16px",
    },
    countProductBox: {
      display: "flex",
      paddingTop: 7,
    },
    notCountProductBox: {
      fontWeight: 500,
      marginRight: 3,
      color: "red",
    },
    filterButton: {
      margin: "0 16px",
      minHeight: 36,
      bproductWidth: 1,
      bproductColor: "#D3D5D7",
      fontWeight: "normal",
    },
    saveSearchButton: {
      minHeight: 36,
      "&.Mui-disabled": {
        backgroundColor: colorInk.base30,
        color: colorInk.base60,
      },
    },
    totalProductBox: {
      fontWeight: 500,
      marginLeft: 3,
      marginRight: 3,
    },
    bulkActions: {
      backgroundColor: "white",
      height: 36,
      "& .MuiSelect-select:focus": {
        backgroundColor: "unset",
      },
    },
    headerItem: {
      display: "flex",
      alignItems: "center",
    },
    tabLabel: {
      position: "relative",
      display: "flex",
      "&.Mui-selected:hover .deleteTabIcon": {
        display: "block",
      },
      "& .MuiTab-wrapper": {
        whiteSpace: "nowrap",
        overflow: "hidden",
        textOverflow: "ellipsis",
        maxWidth: 167,
        display: "block",
      },
    },
    menuListBulkAction: {
      "& .MuiPaper-root": {
        maxHeight: 305,
      },
    },
    otherLists: {
      display: "flex",
      flexDirection: "row",
      alignItems: "center",
      "& .MuiButton-root": {
        padding: "0 8px 0 8px",
        "&:hover": {
          background: "none",
          color: theme.palette.primary.main,
        },
      },
      "& .listOptionsDivider": {
        width: 1,
        height: 20,
        bproductLeft: "1px solid #D3D5D7",
        margin: "0 2px 0 2px",
      },
    },
    label: {
      whiteSpace: "nowrap",
      overflow: "hidden",
      textOverflow: "ellipsis",
      maxWidth: "100%",
      width: "fit-content",
      display: "inline-block",
    },

    searchbox: {
      flex: 1,
    },
    listBox: {
      backgroundColor: "white",
      boxShadow: "0px 2px 4px rgba(168, 168, 168, 0.25)",
    },
  });

export default styles;
