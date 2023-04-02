import { SvgIcon, SvgIconProps } from "@material-ui/core";
import React from "react";

function MenuReportIcon(props: SvgIconProps) {
  return (
    <SvgIcon {...props} viewBox="0 0 24 24">
      <path d="M3 3V20C3 20.553 3.447 21 4 21H21V19H5V3H3Z" fill="currentColor" />
      <path
        d="M14.7702 14.0984C15.15 14.4702 15.7638 14.4702 16.1436 14.0984L21 9.34443L19.6266 8L15.4569 12.0818L13.2298 9.90159C12.85 9.52983 12.2362 9.52983 11.8564 9.90159L7 14.6556L8.37339 16L12.5431 11.9182L14.7702 14.0984Z"
        fill="currentColor"
      />
    </SvgIcon>
  );
}

export default MenuReportIcon;
