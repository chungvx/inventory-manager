import { createStyles, makeStyles, Theme } from "@material-ui/core";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      width: "100%",
    },
    menuCreateOrder: {
      marginTop: "4px",
    },
    container: {
      margin: "0 auto",
      // width: "1366px",
      // "@media (max-width: 1366px)": {
      maxWidth: "1366px",
      width: "100%",
      // },
    },
    formOrder: {
      padding: "24px 32px",
      width: "100%",
    },
    dialogSettingsBoxAdditional: {
      "& .MuiDialogTitle-root": {
        "& .searchbox": {
          display: "none",
        },
      },
    },
  })
);
export default useStyles;
