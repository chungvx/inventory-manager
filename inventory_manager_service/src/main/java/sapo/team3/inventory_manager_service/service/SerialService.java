package sapo.team3.inventory_manager_service.service;

import sapo.team3.inventory_manager_service.model.response.PagingListResponse;
import sapo.team3.inventory_manager_service.model.response.serial.SerialFilterRequest;
import sapo.team3.inventory_manager_service.model.response.serial.SerialRequest;
import sapo.team3.inventory_manager_service.model.response.serial.SerialResponse;
import sapo.team3.inventory_manager_service.model.response.serial.SerialResponseWithOrder;

public interface SerialService {
    SerialResponse getById(long id);

    SerialResponse create(SerialRequest input);

    SerialResponse update(long id, SerialRequest input);

    SerialResponse delete(long id);

    PagingListResponse<SerialResponse> filter(SerialFilterRequest filter);
}
