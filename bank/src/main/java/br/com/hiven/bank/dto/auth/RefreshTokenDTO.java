package br.com.hiven.bank.dto.auth;

import lombok.*;

@Getter
@Setter
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class RefreshTokenDTO {

    private String token;
    private String refreshToken;
    private String email;

}
