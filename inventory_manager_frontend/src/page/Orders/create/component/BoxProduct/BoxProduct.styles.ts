import { createStyles, makeStyles, Theme } from "@material-ui/core";
import { colorInk } from "theme/palette";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      padding: "16px 24px 0",
      boxShadow: "0px 2px 4px rgba(168, 168, 168, 0.25)",
      height: "100%",
      minHeight: 120,
      paddingBottom: 30,
    },
    content: {
      display: "flex",
      flexDirection: "column",
    },
    viewTag: {
      "&.disabled": {
        "& .MuiChip-root": {
          backgroundColor: colorInk.base20,
        },
      },
      "& .MuiChip-root": {
        color: colorInk.primary,
        backgroundColor: "#E6F4FF",
      },
    },
    searchSuggest: {
      minWidth: 243,
      maxWidth: 465,
      "&.disabled": {
        backgroundColor: colorInk.base5,
        "& >.label-select": {
          color: colorInk.base60,
        },
      },
    },
    boxNoResult: {
      width: "100%",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      height: 110,
      flexFlow: "column",
    },
    lineItem: {
      display: "flex",
      margin: 0,
      padding: "10px 24px 10px",
      position: "relative",
      borderRadius: 0,
      "&:after": {
        content: "''",
        position: "absolute",
        backgroundColor: colorInk.base30,
        height: 1,
        bottom: 0,
        left: 24,
        right: 24,
      },
      "&>.icon": {
        fontSize: 32,
        marginRight: 10,
        color: "#4BA7F3",
      },
    },
    closeIcon: {
      marginLeft: 8,
      height: 20,
    },
    infiniteList: {
      "&>.InfiniteScroll-BoxCreate": {
        padding: "0 42px",
      },
    },
  })
);
export default useStyles;
