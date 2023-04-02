import i18n from "i18n";

export const DateRangeType = {
  YESTERDAY: "yesterday",
  TODAY: "today",
  THIS_WEEK: "this_week",
  THIS_MONTH: "this_month",
  LAST_MONTH: "last_month",
  DAY_LAST_7: "day_last_7",
  DAY_LAST_30: "day_last_30",
  DAY_LAST_60: "day_last_60",
  DAY_LAST_90: "day_last_90",
  THIS_YEAR: "this_year",
  LAST_YEAR: "last_year",
};
export const GetListDateRange: string[] = [
  DateRangeType.TODAY,
  DateRangeType.YESTERDAY,
  DateRangeType.DAY_LAST_7,
  DateRangeType.THIS_MONTH,
  DateRangeType.LAST_MONTH,
  DateRangeType.THIS_YEAR,
  DateRangeType.LAST_YEAR,
];
export const GetListDateDashboardRange: string[] = [
  DateRangeType.TODAY,
  DateRangeType.YESTERDAY,
  DateRangeType.DAY_LAST_7,
  DateRangeType.THIS_MONTH,
  DateRangeType.LAST_MONTH,
  DateRangeType.THIS_YEAR,
  DateRangeType.LAST_YEAR,
];
export const GetListDateRangeOrderHandle: string[] = [
  DateRangeType.TODAY,
  DateRangeType.YESTERDAY,
  DateRangeType.DAY_LAST_7,
  DateRangeType.DAY_LAST_30,
];
export const GetNameDateRangeType = (type: string) => {
  switch (type) {
    case DateRangeType.YESTERDAY: {
      return `${i18n.t(`utilities:dateRangeType.yesterdayText`)}`;
    }
    case DateRangeType.TODAY: {
      return `${i18n.t(`utilities:dateRangeType.todayText`)}`;
    }
    case DateRangeType.THIS_WEEK: {
      return `${i18n.t(`utilities:dateRangeType.thisWeekText`)}`;
    }
    case DateRangeType.THIS_MONTH: {
      return `${i18n.t(`utilities:dateRangeType.thisMonthText`)}`;
    }
    case DateRangeType.LAST_MONTH: {
      return `${i18n.t(`utilities:dateRangeType.lastMonthText`)}`;
    }
    case DateRangeType.DAY_LAST_7: {
      return `${i18n.t(`utilities:dateRangeType.dayLast7Text`)}`;
    }
    case DateRangeType.DAY_LAST_30: {
      return `${i18n.t(`utilities:dateRangeType.dayLast30Text`)}`;
    }
    case DateRangeType.DAY_LAST_60: {
      return `${i18n.t(`utilities:dateRangeType.dayLast60Text`)}`;
    }
    case DateRangeType.DAY_LAST_90: {
      return `${i18n.t(`utilities:dateRangeType.dayLast90Text`)}`;
    }
    case DateRangeType.THIS_YEAR: {
      return "Năm nay";
    }
    case DateRangeType.LAST_YEAR: {
      return "Năm ngoái";
    }
    default:
      return "";
  }
};
