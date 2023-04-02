import { createStyles, Theme } from "@material-ui/core";
import { colorInk } from "theme/palette";
const styles = (theme: Theme) =>
  createStyles({
    root: {
      width: "100%",
    },
    boxRootHeader: {
      top: 0,
      zIndex: 2,
      width: "100%",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      position: "sticky",
      backgroundColor: "#FFFFFF",
      "& .sticky-header": {
        maxWidth: "1366px",
        width: "1366px",
      },
    },
    container: {
      margin: "0 auto",
      maxWidth: "1366px",
      "@media (max-width: 1366px)": {
        width: "100%",
      },
    },
    productContainer: {
      padding: "24px 32px",
      paddingBottom: theme.spacing(3),
      "& .MuiGrid-spacing-xs-3": {
        margin: -10,
        "&> .MuiGrid-item": {
          padding: 10,
        },
      },
      "& .icon-tooltip": {
        width: 15,
        height: 15,
        cursor: "pointer",
      },
    },
    toolTipProduct: {
      maxWidth: "275px",
      padding: 12,
    },
    // Khối thông tin chung
    boxProductInfor: {
      minHeight: 374,
      marginBottom: theme.spacing(3),
      width: "100%",
      boxShadow: "0px 2px 4px rgba(168, 168, 168, 0.25)",
      "& .product-content-infor": {
        padding: "20px 24px 24px",
        "& .infor-label": {
          display: "flex",
          alignItems: "center",
          color: colorInk.base80,
        },
      },
      "& .box-subtitle": {
        width: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "flex-start",
        paddingTop: 14,
        "& .link-drive": {
          textDecoration: "none",
          color: theme.palette.primary.main,
          "&:hover": {
            textDecoration: "underline",
          },
        },
      },
      "& .product-content-wrap": {
        paddingLeft: theme.spacing(3),
        paddingRight: theme.spacing(3),
        paddingBottom: theme.spacing(2),
        "& .infor-label": {
          display: "flex",
          alignItems: "center",
          color: colorInk.base80,
        },
      },
    },
    variantWrap: {
      padding: "0 23px 23px 23px",
    },
    gridSpacing: {
      paddingLeft: theme.spacing(3),
      paddingRight: theme.spacing(3),
      margin: 0,
    },
    boxInforHeader: {
      width: "100%",
      height: 48,
      borderBottom: "solid 1px #f0f1f1",
      marginBottom: theme.spacing(2),
      display: "flex",
      alignItems: "center",
      paddingLeft: theme.spacing(3),
    },
    boxInforComponent: {
      paddingTop: theme.spacing(1),
      paddingBottom: theme.spacing(1),
    },
    boxInforMedicine: {
      padding: "10px 24px",
    },
    groupButtonAction: {
      display: "flex",
      justifyContent: "flex-end",
      width: "100%",
      "& button": {
        margin: theme.spacing(1),
        marginLeft: theme.spacing(2),
        marginRight: 0,
      },
    },
    groupTitleBox: {
      width: "100%",
      display: "flex",
      justifyContent: "flex-start",
      alignItems: "center",
      padding: "16px 24px",
    },
    groupTitleBoxButtonRight: {
      display: "flex",
      cursor: "pointer",
    },
    textFieldNumberRight: {
      textAlign: "right",
    },
    textFieldNumber: {
      "& .MuiOutlinedInput-adornedEnd": {
        paddingRight: 0,
        "& .MuiInputBase-formControl": {
          borderRadius: "0 3px 3px 0",
          "& .MuiSelect-select": {
            "&:focus": {
              background: theme.palette.background.paper,
            },
          },
        },
      },
      "& input": {
        "&[type=number]": {
          "-moz-appearance": "textfield",
        },
        "&::-webkit-outer-spin-button": {
          "-webkit-appearance": "none",
          margin: 0,
        },
        "&::-webkit-inner-spin-button": {
          "-webkit-appearance": "none",
          margin: 0,
        },
      },
    },
    buttonBottomLeft: {
      display: "flex",
      alignItems: "center",
    },
    boxSetting: {
      marginBottom: theme.spacing(3),
      "& .item-box": {
        borderTop: "1px solid #E8EAEB",
        padding: "16px 0px",
        "& .box-space-item": {
          display: "flex",
          justifyContent: "space-between",
        },
        "& .tag-selected-wrap": {
          marginBottom: "5px",
        },
      },
      "& .wrapper-autocomplete-tag": {
        "& .MuiAutocomplete-root .MuiFormLabel-root": {
          fontWeight: 500,
          color: colorInk.primary,
        },
      },
      "& .title": {
        marginBottom: theme.spacing(1),
      },
      boxShadow: "0px 2px 4px rgba(168, 168, 168, 0.25)",
    },
    boxSettingOption: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      borderBottom: "1px solid " + theme.palette.grey[300],
      paddingBottom: theme.spacing(2),
    },
    inputAddOption: {
      display: "flex",
      alignItems: "center",
      width: "100%",
    },
    switchRight: {
      marginRight: "-10px",
    },
    gridItem: {
      paddingTop: 10,
      paddingBottom: 10,
    },
    creatable: {
      height: 40,
      fontWeight: 500,
      fontSize: 14,
      cursor: "pointer",
      display: "flex",
      alignItems: "center",
      padding: "0 16px",
      borderBottom: "1px solid #E8EAEB",
      color: theme.palette.primary.main,
      "&:hover, &.focus-key-event": {
        backgroundColor: "#F2F9FF",
      },
      "& svg": {
        color: theme.palette.primary.main,
        marginRight: 6,
      },
    },
    searchAssigneeOption: {
      minHeight: 40,
      padding: "10px 16px",
      boxSizing: "border-box",
      borderBottom: "1px solid #E8EAEB",
      cursor: "pointer",
      "&:hover": {
        color: theme.palette.primary.main,
        backgroundColor: "#F2F9FF",
      },
      "& .search-assignee-content": {
        width: "100%",
        display: "flex",
        flexDirection: "column",
      },
      "& .assignee-name": {
        fontWeight: 400,
        textOverflow: "ellipsis",
        wordBreak: "break-all",
      },
      "&.active": {
        color: "#0088FF",
        backgroundColor: "#F2F9FF",
      },
    },
    iconFontSizeSm: {
      fontSize: "0.7rem",
      color: "#000",
    },
    btnSearchMedicine: {
      minWidth: "100px",
      marginTop: 20,
      textAlign: "right",
      color: theme.palette.primary.main,
      cursor: "pointer",
      "&:hover": {
        textDecoration: "underline",
      },
      "@media (max-width: 1366px)": {
        minWidth: "15%",
      },
    },
    boxProductName: {
      display: "flex",
      alignItems: "center",
    },
    textFieldDisable: {
      "& div.Mui-disabled": {
        backgroundColor: colorInk.base30,
        borderRadius: 3,
      },
    },
    rootSelect: {
      padding: 0,
      width: 65,
      height: 40,
      marginLeft: "-1px",
      "& .MuiInputBase-formControl": {
        borderRadius: "0 3px 3px 0",
      },
    },
    textFieldBorder: {
      "& .MuiOutlinedInput-root": {
        borderRadius: "3px 0 0 3px",
      },
    },

    paperHeader: {
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      borderBottom: "1px solid #E8EAEB",
    },
  });

export default styles;
