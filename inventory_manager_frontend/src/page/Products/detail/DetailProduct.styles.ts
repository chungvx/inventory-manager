import { createStyles, makeStyles } from "@material-ui/styles";
import { colorInk } from "theme/palette";

const useStyles = makeStyles(() =>
  createStyles({
    root: {
      maxWidth: 1366,
      margin: "0 auto",
    },
    container: {
      padding: "14px 32px 32px",
    },
    boxCode: {
      display: "flex",
      alignItems: "flex-end",
      justifyContent: "flex-start",
    },
    buttonHeaderBox: {
      "& span": {
        color: "#182537",
      },
      "& svg": {
        color: "#A3A8AF",
      },
      "& button": {
        border: "1px solid #D3D5D7",
        backgroundColor: "#FFFFFF",
        borderRadius: "3px",
      },
      "& button:hover": {
        backgroundColor: "unset",
      },
      "& div.ripple": {
        backgroundColor: "#D3D5D7",
      },
    },
    generalInfoContainer: {
      display: "grid",
      gridTemplateRows: "auto",
      gridTemplateAreas: `
              "area1 area5"
              "area2 area6"            
              "area3 area7"
              "area4 area8"            
          `,
      columnGap: 20,
      rowGap: "5px",
      margin: "12px 0",
    },
    area1: {
      gridArea: "area1",
      minWidth: "90px",
    },
    area2: {
      gridArea: "area2",
      minWidth: "90px",
    },
    area3: {
      gridArea: "area3",
      minWidth: "90px",
    },
    area4: {
      gridArea: "area4",
      minWidth: "90px",
    },
    area5: {
      gridArea: "area5",
      minWidth: "380px",
      maxWidth: "420px",
    },
    area6: {
      gridArea: "area6",
      minWidth: "380px",
      maxWidth: "420px",
    },
    area7: {
      gridArea: "area7",
      minWidth: "380px",
      maxWidth: "420px",
    },
    area8: {
      gridArea: "area8",
      minWidth: "380px",
      maxWidth: "420px",
    },
    emptyText: {
      color: colorInk.base60,
    },
  })
);

export default useStyles;
