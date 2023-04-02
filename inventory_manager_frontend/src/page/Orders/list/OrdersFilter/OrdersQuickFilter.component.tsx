import React, { useEffect, useState } from "react";
import moment from "moment";
import {
  OrderQuickFilterOptions,
  OrderStatus,
  getOrderQuickFilterLabel,
  getOrderStatusName,
} from "./OrdersQuickFilter.consant";
import { filter, isArray } from "lodash";
import QuickFilter from "components/QuickFilter/QuickFilter";
import QuickFilterFixed from "components/QuickFilterFixed/QuickFilterFixed";
import QuickFilterDatePredefined from "components/QuickFilterFixed/QuickFilterDatePredefined/QuickFilterDatePredefined";
import { DateRangesPredefineType, getNamePredefinedDate } from "utilities/DateRangesPredefine";
import { formatDateUTC } from "utilities";
import { OrdersFilterRequest } from "services/OrderService";

interface OrderQuickFilterProps {
  filters: OrdersFilterRequest;
  onSubmit: (newFilter: OrdersFilterRequest) => void;
}

const OrderQuickFilter = (props: OrderQuickFilterProps) => {
  const { filters, onSubmit } = props;
  const [createdAtMax, setCreatedAtMax] = useState<Date | undefined>();
  const [createdAtMin, setCreatedAtMin] = useState<Date | undefined>();
  const [modifiedAtMax, setModifiedAtMax] = useState<Date | undefined>();
  const [modifiedAtMin, setModifiedAtMin] = useState<Date | undefined>();
  const [returnedAtMax, setReturnedAtMax] = useState<Date | undefined>();
  const [returnedAtMin, setReturnedAtMin] = useState<Date | undefined>();
  const optionStatusOrder = () => {
    const result = [
      { value: OrderStatus.BORROWING, label: getOrderStatusName(OrderStatus.BORROWING) },
      { value: OrderStatus.RETURNED, label: getOrderStatusName(OrderStatus.RETURNED) },
    ];
    return result;
  };
  useEffect(() => {
    setCreatedAtMax(filters.created_at_max ? moment(filters.created_at_max).toDate() : undefined);
    setCreatedAtMin(filters.created_at_min ? moment(filters.created_at_min).toDate() : undefined);
    setModifiedAtMax(filters.modified_at_max ? moment(filters.modified_at_max).toDate() : undefined);
    setModifiedAtMin(filters.modified_at_min ? moment(filters.modified_at_min).toDate() : undefined);
    setReturnedAtMax(filters.returned_at_max ? moment(filters.returned_at_max).toDate() : undefined);
    setReturnedAtMin(filters.returned_at_min ? moment(filters.returned_at_min).toDate() : undefined);
  }, [filters]);

  return (
    <QuickFilter>
      <QuickFilterDatePredefined
        label={getOrderQuickFilterLabel(OrderQuickFilterOptions.CREATED_AT)}
        endDate={createdAtMax}
        startDate={createdAtMin}
        predefinedDate={filters?.created_at_predefined}
        ranges={[
          {
            key: DateRangesPredefineType.YESTERDAY,
            label: getNamePredefinedDate(DateRangesPredefineType.YESTERDAY),
          },
          {
            key: DateRangesPredefineType.TODAY,
            label: getNamePredefinedDate(DateRangesPredefineType.TODAY),
          },
          {
            key: DateRangesPredefineType.THIS_WEEK,
            label: getNamePredefinedDate(DateRangesPredefineType.THIS_WEEK),
          },
          {
            key: DateRangesPredefineType.LAST_WEEK,
            label: getNamePredefinedDate(DateRangesPredefineType.LAST_WEEK),
          },
          {
            key: DateRangesPredefineType.THIS_MONTH,
            label: getNamePredefinedDate(DateRangesPredefineType.THIS_MONTH),
          },
          {
            key: DateRangesPredefineType.LAST_MONTH,
            label: getNamePredefinedDate(DateRangesPredefineType.LAST_MONTH),
          },
        ]}
        onSubmit={(predefinedDate, dateRanges) => {
          let _startDate: any = null;
          let _endDate: any = null;
          let _predefinedDate = "";
          if (predefinedDate) {
            _predefinedDate = predefinedDate;
          } else if (dateRanges) {
            _startDate = dateRanges.startDate;
            _endDate = dateRanges.endDate;
          }
          let newFilters = {
            ...filters,
            page: 1,
            created_at_min: formatDateUTC(_startDate, false) || undefined,
            created_at_max: formatDateUTC(_endDate, true) || undefined,
            created_at_predefined: _predefinedDate || undefined,
          };
          onSubmit(newFilters);
        }}
      />
      <QuickFilterFixed
        widthPopper={200}
        options={optionStatusOrder()}
        label={getOrderQuickFilterLabel(OrderQuickFilterOptions.STATUS)}
        getOptionLabel={(item) => item.label as string}
        value={filters?.statuses?.split(",").map((sl) => {
          return { value: sl, label: getOrderStatusName(sl) };
        })}
        uniqKey="value"
        handleSubmit={(value) => {
          if (value && isArray(value)) {
            let statuses = value.map((item: any) => item.value).join(",");
            let newFilters: OrdersFilterRequest = { ...filters, statuses: statuses };
            onSubmit(newFilters);
          }
        }}
      />
    </QuickFilter>
  );
};

export default OrderQuickFilter;
