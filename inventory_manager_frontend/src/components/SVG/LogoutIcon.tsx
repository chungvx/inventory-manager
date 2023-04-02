import { SvgIcon, SvgIconProps } from "@material-ui/core";
import React from "react";

function LogoutIcon(props: SvgIconProps) {
  return (
    <SvgIcon {...props} viewBox="0 0 14 15">
      <g clipPath="url(#clip0)">
        <path
          d="M8.75 7.76699C8.42734 7.76699 8.16758 8.02949 8.16758 8.34941V10.6846C8.16758 11.0072 7.90508 11.267 7.58516 11.267H5.83516V2.51699C5.83516 2.01934 5.51797 1.57363 5.03945 1.40684L4.86719 1.34941H7.58516C7.90781 1.34941 8.16758 1.61191 8.16758 1.93184V3.68184C8.16758 4.00449 8.42734 4.26426 8.75 4.26426C9.07266 4.26426 9.33242 4.00176 9.33242 3.68184V1.93457C9.33242 0.969336 8.54766 0.18457 7.58242 0.18457H1.3125C1.29062 0.18457 1.27148 0.195508 1.24961 0.198242C1.22227 0.195508 1.19492 0.18457 1.16484 0.18457C0.522266 0.18457 0 0.706836 0 1.35215V11.8521C0 12.3498 0.317188 12.7955 0.795703 12.9623L4.30391 14.1299C4.42422 14.1654 4.5418 14.1846 4.66484 14.1846C5.30742 14.1846 5.83242 13.6623 5.83242 13.017V12.4346H7.58242C8.54766 12.4346 9.33242 11.6498 9.33242 10.6846V8.35215C9.33242 8.02949 9.07266 7.76699 8.75 7.76699Z"
          fill="currentColor"
        />
        <path
          d="M13.8273 5.60409L11.4949 3.27166C11.3281 3.10486 11.0765 3.05564 10.8605 3.14588C10.6417 3.23611 10.4996 3.4494 10.4996 3.68455V5.43456H8.16714C7.84448 5.43456 7.58472 5.69706 7.58472 6.01698C7.58472 6.3369 7.84722 6.5994 8.16714 6.5994H10.4996V8.34941C10.4996 8.58457 10.6417 8.79785 10.8605 8.88808C11.0792 8.97832 11.3308 8.9291 11.4949 8.7623L13.8273 6.42987C14.057 6.20292 14.057 5.83378 13.8273 5.60409Z"
          fill="currentColor"
        />
      </g>
      <defs>
        <clipPath id="clip0">
          <rect width="14" height="14" fill="white" transform="translate(0 0.18457)" />
        </clipPath>
      </defs>
    </SvgIcon>
  );
}

export default LogoutIcon;