import { FormControlProps, PopoverOrigin, PopperPlacementType, WithStyles } from "@material-ui/core";
import styles from "./DatePicker.styles";
import { TextFieldProps } from "@material-ui/core/TextField";

export interface DatePickerProps extends WithStyles<typeof styles> {
  dateRange?: boolean;
  timePicker?: boolean;
  label?: string;
  value: string | Date | null | undefined;
  defaultValue?: string | Date | null | undefined;
  format?: string;
  onChange: (date: Date | null) => void;
  lastValue?: Date | null;
  onChangeLastValue?: (date: Date | null) => void;
  anchorOrigin?: PopoverOrigin;
  transformOrigin?: PopoverOrigin;
  textFieldProps?: TextFieldProps & FormControlProps & { helperText?: string };
  disableToolbar?: boolean;
  selectMonth?: boolean;
  onMonthChange?: (date: Date) => void;
  inputDateRange?: boolean;
  maxDate?: Date | null;
  minDate?: Date | null;
  variant?: "dialog" | "inline" | "static";
  leftArrowIcon?: boolean;
  rightArrowIcon?: boolean;
  hiddenDayOutMonth?: boolean;
  required?: boolean;
  onChangeRange?: (firstDate: Date | null | undefined, lastDate: Date | null | undefined) => void;
  appendDefaultOnClick?: boolean;
  minWidthPopper?: number | string;
  anchorPositionSelectMonth?: { top: number; left: number };
  anchorPositionSelectYear?: { top: number; left: number };
  placement?: PopperPlacementType;
  onOpen?: () => void;
  onClose?: () => void;
  focusInputOnClose?: boolean;
  style?: React.CSSProperties;
  className?: string;
  disablePortal?: boolean;
  disableChangeText?: boolean;
  onChangeTime?: (dateTime: DateTimeType) => void;
  timeFrom?: string | null;
  timeTo?: string | null;
  periodPicker?: boolean;
  autoComplete?: string;
  times?: any[];
  isDisabled?: boolean;
  isChangeMonthAndTime?: boolean;
  error?: boolean;
  helperText?: string,
}
export type DateTimeType = {
  date: Date | null | undefined;
  timeFrom: string | null | undefined;
  timeTo: string | null | undefined;
};
export type TimeType = {
  timeFrom: string | null | undefined;
  timeTo: string | null | undefined;
};