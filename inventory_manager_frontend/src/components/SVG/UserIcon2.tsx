import { SvgIcon, SvgIconProps } from "@material-ui/core";
import React from "react";

function UserIcon2(props: SvgIconProps) {
  return (
    <SvgIcon {...props} viewBox="0 0 18 19" fill="none">
      <path
        d="M9 0C6.243 0 4 2.243 4 5C4 7.757 6.243 10 9 10C11.757 10 14 7.757 14 5C14 2.243 11.757 0 9 0ZM9 8C7.346 8 6 6.654 6 5C6 3.346 7.346 2 9 2C10.654 2 12 3.346 12 5C12 6.654 10.654 8 9 8ZM18 19V18C18 14.141 14.859 11 11 11H7C3.14 11 0 14.141 0 18V19H2V18C2 15.243 4.243 13 7 13H11C13.757 13 16 15.243 16 18V19H18Z"
        fill="currentColor"
      />
    </SvgIcon>
  );
}

export default UserIcon2;
