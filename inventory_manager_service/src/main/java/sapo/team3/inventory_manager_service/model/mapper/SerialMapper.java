package sapo.team3.inventory_manager_service.model.mapper;

import org.mapstruct.Mapper;
import sapo.team3.inventory_manager_service.model.entity.Serial;
import sapo.team3.inventory_manager_service.model.response.serial.SerialResponse;

@Mapper(componentModel = "spring")
public interface SerialMapper {
    SerialResponse entityToResponse(Serial serial);
}