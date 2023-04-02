import {Box, Link, Typography} from "@material-ui/core";
import { withStyles } from "@material-ui/styles";
import { useModal } from "@sapo-presentation/sapo-ui-components";
import { BackIcon } from "components/SVG";
import React, { Fragment, useState } from "react";
import { connect } from "react-redux";
import { useHistory } from "react-router";
import { Link as RouteLink } from "react-router-dom";
import { ApplicationState } from "store/App/types";
import { AppState } from "store/store";
import styles from "./Header.styles";
import { HeaderProps } from "./Header.types";

function Header(props: HeaderProps) {
  const { classes, authState, application } = props;
  const history = useHistory();
  const [atTop, setAtTop] = useState(true);
  const { openModal } = useModal();

  const handleBack = (e: React.MouseEvent, app: ApplicationState) => {
    if (app.header) {
      const linkTo = typeof app.header === "string" ? "" : app.header.linkTo;
      if ((app.header as any).externalLink) {
        window.location.href = linkTo;
      } else {
        history.push(linkTo);
      }
    }
  };
  
  return (
    <Fragment>
      {application  && application.header && (
        <Box id="header" className={`${classes.root} ${atTop ? "" : classes.shadowHeader}`}>
          {typeof application.header === "string" ? (
            <Typography variant="h3">{application.header}</Typography>
          ) : application.header?.linkTo && application.header?.linkTo !== "" ? (
            <Link
              component={RouteLink}
              onClick={(e: any) => handleBack(e, application)}
              to={application.header?.linkTo}
              underline="none"
              color={application.header?.withSubtitle ? "secondary" : "textPrimary"}
              className={classes.link}
            >
              <BackIcon />
              <Typography
                variant={application.header?.withSubtitle ? "subtitle1" : "h6"}
                color={application.header?.withSubtitle ? "secondary" : undefined}
                style={{ color: application.header?.withSubtitle ? "" : "#182537" }}
              >
                {application.header?.title}
              </Typography>
            </Link>
          ) : (
            <Typography
              variant={application.header?.withSubtitle ? "subtitle1" : "h3"}
              color={application.header?.withSubtitle ? "secondary" : undefined}
            >
              {application.header?.title}
            </Typography>
          )}
        </Box>
      )}
    </Fragment>
  );
}

const mapStateToProps = (state: AppState) => ({
  authState: state.auth,
  application: state.application,
});
export default connect(mapStateToProps, { })(withStyles(styles)(Header));
