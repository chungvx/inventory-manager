package sapo.team3.inventory_manager_service.model.response;

import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
public class ListResponse<T> {

    private final List<T> data;

    public ListResponse(List<T> data) {
        this.data = data;
    }
}
