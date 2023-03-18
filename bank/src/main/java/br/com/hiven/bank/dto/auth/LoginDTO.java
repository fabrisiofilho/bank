package br.com.hiven.bank.dto.auth;

import br.com.hiven.bank.dto.user.UserDTO;
import lombok.*;

@Getter
@Setter
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class LoginDTO {

    private String token;
    private String refreshToken;
    private UserDTO.Login user;

}
