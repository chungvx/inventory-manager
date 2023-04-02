package sapo.team3.inventory_manager_service.configuration.utils;

import java.util.ArrayList;
import java.util.Collections;
import java.util.HashSet;
import java.util.List;
import java.util.stream.Collectors;

public class ListUtils {
    public static <T> boolean isBlank(List<T> list) {
        return list == null || list.size() == 0;
    }

    public static <T> boolean isNotBlank(List<T> list) {
        return list != null && list.size() > 0;
    }

    public static <T> List<T> mergeAndList(List<T> list1, List<T> list2) {
        if (isBlank(list1) && isBlank(list2))
            return Collections.emptyList();
        if (isNotBlank(list1) && isBlank(list2))
            return list1;
        if (isBlank(list1) && isNotBlank(list2))
            return list2;
        var newList1 = new HashSet<>(list1);
        var newList2 = new HashSet<>(list2);
        newList1.retainAll(newList2);
        newList2.retainAll(newList1);
        newList1.addAll(newList2);
        return new ArrayList<>(newList1);
    }

    public static <T> String joinList(List<T> list) {
        return joinList(list, ",");
    }

    public static <T> String joinList(List<T> list, String delimiter) {
        if (isBlank(list))
            return "";
        if (delimiter == null) {
            delimiter = ",";
        }
        return list.stream().map(T::toString).collect(Collectors.joining(delimiter));
    }
}
