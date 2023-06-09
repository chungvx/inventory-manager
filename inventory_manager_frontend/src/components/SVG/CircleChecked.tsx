import { SvgIcon, SvgIconProps } from "@material-ui/core";
import React from "react";

function CircleChecked(props: SvgIconProps) {
  return (
    <SvgIcon {...props} viewBox="0 0 20 20">
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M0 10C0 15.5228 4.47715 20 10 20C15.5228 20 20 15.5228 20 10C20 4.47715 15.5228 0 10 0C4.47715 0 0 4.47715 0 10ZM18.1818 10C18.1818 14.5187 14.5187 18.1818 10 18.1818C5.48131 18.1818 1.81818 14.5187 1.81818 10C1.81818 5.48131 5.48131 1.81818 10 1.81818C14.5187 1.81818 18.1818 5.48131 18.1818 10Z"
        fill="currentColor"
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M8.5 11.2322L13.7929 5.93934L15.2071 7.35355L8.5 14.0607L4.79289 10.3536L6.20711 8.93934L8.5 11.2322Z"
        fill="currentColor"
      />
    </SvgIcon>
  );
}

export default CircleChecked;
