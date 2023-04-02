import { SvgIcon, SvgIconProps } from "@material-ui/core";
import React from "react";

function QuestionIcon(props: SvgIconProps) {
  return (
    <SvgIcon {...props} viewBox="0 0 20 20">
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M0 10C0 4.48 4.48 0 10 0C15.52 0 20 4.48 20 10C20 15.52 15.52 20 10 20C4.48 20 0 15.52 0 10ZM11 14V16H9V14H11ZM10 18C5.59 18 2 14.41 2 10C2 5.59 5.59 2 10 2C14.41 2 18 5.59 18 10C18 14.41 14.41 18 10 18ZM6 8C6 5.79 7.79 4 10 4C12.21 4 14 5.79 14 8C14 9.28292 13.21 9.97332 12.4408 10.6455C11.711 11.2833 11 11.9046 11 13H9C9 11.1787 9.94212 10.4566 10.7704 9.82168C11.4202 9.32361 12 8.87922 12 8C12 6.9 11.1 6 10 6C8.9 6 8 6.9 8 8H6Z"
        fill="currentColor"
      />
    </SvgIcon>
  );
}

export default QuestionIcon;
