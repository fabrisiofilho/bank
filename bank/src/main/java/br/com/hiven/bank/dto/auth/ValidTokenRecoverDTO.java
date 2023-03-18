package br.com.hiven.bank.dto.auth;

import lombok.*;

@Getter
@Setter
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class ValidTokenRecoverDTO {

    private String token;

}
