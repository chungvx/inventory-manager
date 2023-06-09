import { SvgIcon, SvgIconProps } from "@material-ui/core";
import React from "react";

function CirclePlus(props: SvgIconProps) {
  return (
    <SvgIcon {...props} viewBox="0 0 20 20">
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M10 0C4.48 0 0 4.48 0 10C0 15.52 4.48 20 10 20C15.52 20 20 15.52 20 10C20 4.48 15.52 0 10 0ZM9 5V9H5V11H9V15H11V11H15V9H11V5H9ZM2 10C2 14.41 5.59 18 10 18C14.41 18 18 14.41 18 10C18 5.59 14.41 2 10 2C5.59 2 2 5.59 2 10Z"
        fill="currentColor"
      />
    </SvgIcon>
  );
}
export default CirclePlus;
