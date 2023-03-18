package br.com.hiven.bank.controller;

import br.com.hiven.bank.dto.user.UserDTO;
import br.com.hiven.bank.entity.UserEntity;
import br.com.hiven.bank.rest.SuccessResponse;
import br.com.hiven.bank.security.util.TokenJWTSecurity;
import br.com.hiven.bank.service.UserService;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import static org.springframework.http.HttpStatus.OK;

@CrossOrigin
@RestController
@RequestMapping("/auth")
public class AuthController {

    @Autowired
    private UserService userService;

    @Autowired
    private TokenJWTSecurity tokenJWTSecurity;

    @Autowired
    private ModelMapper modelMapper;

    @PostMapping("/register")
    public ResponseEntity<UserDTO> register(@RequestBody UserDTO user) {
        UserEntity userEntity = userService.create(user);
        UserDTO userDTO = modelMapper.map(userEntity, UserDTO.class);
        return new SuccessResponse<UserDTO>().handle(userDTO, OK);
    }
}
