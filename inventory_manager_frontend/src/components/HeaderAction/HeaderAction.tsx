import { Box, Link, Typography, withStyles } from "@material-ui/core";
import { ArrowChevronLeftIcon } from "@sapo-presentation/sapo-ui-components";
import React, { useEffect, useState } from "react";
import { Link as RouteLink } from "react-router-dom";
import styles from "./HeaderAction.styles";
import HeaderActionProps from "./HeaderAction.types";

const HeaderAction = (props: HeaderActionProps) => {
  const { classes, groupAction, title, linkTo, onClick, maxWidthContent } = props;
  const [atTop, setAtTop] = useState(true);
  let root = document.getElementById("root");
  useEffect(() => {
    function handleScroll() {
      if (root) {
        if (root.scrollTop === 0) {
          setAtTop(true);
        }
        if (root.scrollTop > 0) {
          setAtTop(false);
        }
      }
    }

    if (root) {
      root.addEventListener("scroll", handleScroll);
    }

    return function cleanupListener() {
      if (root) {
        root.removeEventListener("scroll", handleScroll);
      }
    };
  }, []);
  return (
    <Box className={`${classes.root} ${atTop ? "" : classes.shadowHeader}`}>
      <Box className={classes.contentHeader} style={{ maxWidth: maxWidthContent ? maxWidthContent : "" }}>
        <Box display="inline-flex" alignItems="center">
          {title &&
            title !== "" &&
            (linkTo && linkTo !== "" ? (
              <Link
                component={RouteLink}
                onClick={() => {
                  if (onClick) onClick();
                }}
                to={linkTo}
                underline="none"
                color="secondary"
                className={classes.link}
              >
                <ArrowChevronLeftIcon style={{ width: 24, height: 24, marginLeft: -9, marginRight: 6 }} />
                <Typography variant="subtitle1">{title}</Typography>
              </Link>
            ) : onClick ? (
              <Link
                onClick={() => {
                  if (onClick) onClick();
                }}
                underline="none"
                color="secondary"
                className={classes.link}
              >
                <ArrowChevronLeftIcon style={{ width: 24, height: 24, marginLeft: -9, marginRight: 6 }} />
                <Typography variant="subtitle1">{title}</Typography>
              </Link>
            ) : (
              <Typography variant="subtitle1" color="secondary">
                {title}
              </Typography>
            ))}
        </Box>
        <Box display="inline-flex">{groupAction}</Box>
      </Box>
    </Box>
  );
};
export default withStyles(styles)(HeaderAction);
