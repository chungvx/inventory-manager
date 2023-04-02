import { SvgIcon, SvgIconProps } from "@material-ui/core";
import React from "react";

function FeedbackVeryBadIcon(props: SvgIconProps) {
  return (
    <SvgIcon {...props} viewBox="0 0 50 77">
      <path
        d="M11.8057 69.9736H9.46777V74H8.14844V64.0469H11.4434C12.5645 64.0469 13.4258 64.3021 14.0273 64.8125C14.6335 65.3229 14.9365 66.0658 14.9365 67.041C14.9365 67.6608 14.7679 68.2008 14.4307 68.6611C14.098 69.1214 13.6331 69.4655 13.0361 69.6934L15.374 73.918V74H13.9658L11.8057 69.9736ZM9.46777 68.9004H11.4844C12.1361 68.9004 12.6533 68.7318 13.0361 68.3945C13.4235 68.0573 13.6172 67.6061 13.6172 67.041C13.6172 66.4258 13.4326 65.9541 13.0635 65.626C12.6989 65.2979 12.1702 65.1315 11.4775 65.127H9.46777V68.9004ZM21.1504 74C21.0775 73.8542 21.0182 73.5944 20.9727 73.2207C20.3848 73.8314 19.6829 74.1367 18.8672 74.1367C18.138 74.1367 17.5387 73.9316 17.0693 73.5215C16.6045 73.1068 16.3721 72.5827 16.3721 71.9492C16.3721 71.179 16.6637 70.582 17.2471 70.1582C17.835 69.7298 18.6598 69.5156 19.7217 69.5156H20.9521V68.9346C20.9521 68.4925 20.82 68.1416 20.5557 67.8818C20.2913 67.6175 19.9017 67.4854 19.3867 67.4854C18.9355 67.4854 18.5573 67.5993 18.252 67.8271C17.9466 68.055 17.7939 68.3307 17.7939 68.6543H16.5225C16.5225 68.2852 16.6523 67.9297 16.9121 67.5879C17.1764 67.2415 17.5319 66.9681 17.9785 66.7676C18.4297 66.5671 18.9242 66.4668 19.4619 66.4668C20.3141 66.4668 20.9818 66.681 21.4648 67.1094C21.9479 67.5332 22.1986 68.1188 22.2168 68.8662V72.2705C22.2168 72.9495 22.3034 73.4896 22.4766 73.8906V74H21.1504ZM19.0518 73.0361C19.4482 73.0361 19.8242 72.9336 20.1797 72.7285C20.5352 72.5234 20.7926 72.2568 20.9521 71.9287V70.4111H19.9609C18.4115 70.4111 17.6367 70.8646 17.6367 71.7715C17.6367 72.168 17.7689 72.4779 18.0332 72.7012C18.2975 72.9245 18.637 73.0361 19.0518 73.0361ZM19.0859 63.7119H20.125L22.1074 65.5098H20.7607L19.6055 64.4229L18.4434 65.5098H17.0898L19.0859 63.7119ZM22.5723 62.5293H23.9395L22.5654 64.2998H21.6016L22.5723 62.5293ZM25.915 64.8125V66.6035H27.2959V67.5811H25.915V72.168C25.915 72.4642 25.9766 72.6875 26.0996 72.8379C26.2227 72.9837 26.4323 73.0566 26.7285 73.0566C26.8743 73.0566 27.0749 73.0293 27.3301 72.9746V74C26.9974 74.0911 26.6738 74.1367 26.3594 74.1367C25.7943 74.1367 25.3682 73.9658 25.0811 73.624C24.7939 73.2822 24.6504 72.7969 24.6504 72.168V67.5811H23.3037V66.6035H24.6504V64.8125H25.915ZM33.9678 64.8125V66.6035H35.3486V67.5811H33.9678V72.168C33.9678 72.4642 34.0293 72.6875 34.1523 72.8379C34.2754 72.9837 34.485 73.0566 34.7812 73.0566C34.9271 73.0566 35.1276 73.0293 35.3828 72.9746V74C35.0501 74.0911 34.7266 74.1367 34.4121 74.1367C33.847 74.1367 33.4209 73.9658 33.1338 73.624C32.8467 73.2822 32.7031 72.7969 32.7031 72.168V67.5811H31.3564V66.6035H32.7031V64.8125H33.9678ZM39.9014 74.1367C38.8988 74.1367 38.083 73.8086 37.4541 73.1523C36.8252 72.4915 36.5107 71.6097 36.5107 70.5068V70.2744C36.5107 69.5407 36.6497 68.8867 36.9277 68.3125C37.2103 67.7337 37.6022 67.2826 38.1035 66.959C38.6094 66.6309 39.1562 66.4668 39.7441 66.4668C40.7057 66.4668 41.4531 66.7835 41.9863 67.417C42.5195 68.0505 42.7861 68.9574 42.7861 70.1377V70.6641H37.7754C37.7936 71.3932 38.0055 71.9834 38.4111 72.4346C38.8213 72.8812 39.3408 73.1045 39.9697 73.1045C40.4163 73.1045 40.7946 73.0133 41.1045 72.8311C41.4144 72.6488 41.6855 72.4072 41.918 72.1064L42.6904 72.708C42.0706 73.6605 41.141 74.1367 39.9014 74.1367ZM39.7441 67.5059C39.2337 67.5059 38.8053 67.6927 38.459 68.0664C38.1126 68.4355 37.8984 68.9551 37.8164 69.625H41.5215V69.5293C41.485 68.8867 41.3118 68.39 41.002 68.0391C40.6921 67.6836 40.2728 67.5059 39.7441 67.5059ZM41.8086 65.373V65.4414H40.7627L39.7373 64.2793L38.7188 65.4414H37.6729V65.3594L39.3545 63.5H40.1201L41.8086 65.373ZM38.9648 75.6748C38.9648 75.4697 39.0264 75.2965 39.1494 75.1553C39.277 75.014 39.4639 74.9434 39.71 74.9434C39.9561 74.9434 40.1429 75.014 40.2705 75.1553C40.3981 75.2965 40.4619 75.4697 40.4619 75.6748C40.4619 75.8799 40.3981 76.0508 40.2705 76.1875C40.1429 76.3242 39.9561 76.3926 39.71 76.3926C39.4639 76.3926 39.277 76.3242 39.1494 76.1875C39.0264 76.0508 38.9648 75.8799 38.9648 75.6748Z"
        fill="black"
      />
      <path
        d="M50 25C50 38.8069 38.8069 50 25 50C11.1944 50 0 38.8069 0 25C0 11.1944 11.1944 0 25 0C38.8069 0 50 11.1944 50 25Z"
        fill="#FFCC4D"
      />
      <path
        d="M34.7222 36.1111H15.2778C14.5111 36.1111 13.8889 35.4903 13.8889 34.7222C13.8889 33.9542 14.5111 33.3333 15.2778 33.3333H34.7222C35.4903 33.3333 36.1111 33.9542 36.1111 34.7222C36.1111 35.4903 35.4903 36.1111 34.7222 36.1111ZM20.8333 25H11.1111C10.3445 25 9.72223 24.3778 9.72223 23.6111C9.72223 22.8444 10.3445 22.2222 11.1111 22.2222H20.8333C21.6 22.2222 22.2222 22.8444 22.2222 23.6111C22.2222 24.3778 21.6 25 20.8333 25ZM38.8889 25H29.1667C28.3986 25 27.7778 24.3778 27.7778 23.6111C27.7778 22.8444 28.3986 22.2222 29.1667 22.2222H38.8889C39.6569 22.2222 40.2778 22.8444 40.2778 23.6111C40.2778 24.3778 39.6569 25 38.8889 25Z"
        fill="#664500"
      />
    </SvgIcon>
  );
}

export default FeedbackVeryBadIcon;
