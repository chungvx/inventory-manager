package sapo.team3.inventory_manager_service.model.response;

import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.List;

@Data
@Setter
@NoArgsConstructor
public class MessageError {
    private String error;
    private List<String> messages;
    private int code;

    public MessageError(String error, List<String> messages, int code) {
        this.error = error;
        this.messages = messages;
        this.code = code;
    }
}
