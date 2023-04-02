package sapo.team3.inventory_manager_service.configuration.exception;

import sapo.team3.inventory_manager_service.model.response.MessageError;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindException;
import org.springframework.validation.ObjectError;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestControllerAdvice;

import javax.persistence.EntityNotFoundException;
import java.util.ArrayList;
import java.util.List;


@RestControllerAdvice
public class ApiHandlerException extends Exception{

    @ResponseStatus(HttpStatus.BAD_REQUEST)
    @ExceptionHandler(value = {BindException.class, MethodArgumentNotValidException.class})
    public ResponseEntity<MessageError> bindExceptionHandler(BindException ex){
        String error = "Incorrect validate";
        List<String> messages = new ArrayList<>();
        for(ObjectError objectError : ex.getAllErrors()) {
            messages.add(objectError.getDefaultMessage());
        }
        int code = HttpStatus.BAD_REQUEST.value();
        return new ResponseEntity<>(new MessageError(error, messages, code), HttpStatus.BAD_REQUEST);
    }

    @ResponseStatus(HttpStatus.NOT_FOUND)
    @ExceptionHandler(EntityNotFoundException.class)
    public ResponseEntity<MessageError> resourceNotFoundException(EntityNotFoundException ex) {
        String error = "Not found entity";
        List<String> messages = new ArrayList<>();
        messages.add(ex.getLocalizedMessage());
        int code = HttpStatus.NOT_FOUND.value();
        return new ResponseEntity<>(new MessageError(error, messages, code), HttpStatus.NOT_FOUND);
    }

    @ExceptionHandler(Exception.class)
    public ResponseEntity<MessageError> globalExceptionHandler(Exception ex) {
        String error = "Exception";
        List<String> messages = new ArrayList<>();
        messages.add(ex.getLocalizedMessage());
        int code = HttpStatus.INTERNAL_SERVER_ERROR.value();
        return new ResponseEntity<>(new MessageError(error, messages, code), HttpStatus.INTERNAL_SERVER_ERROR);
    }
}
