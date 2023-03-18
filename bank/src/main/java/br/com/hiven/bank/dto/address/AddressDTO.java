package br.com.hiven.bank.dto.address;

import lombok.*;
import java.util.UUID;

@Getter
@Setter
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class  AddressDTO { 
	
	private UUID id;
		
	private String cep;
		
	private String logradouro;
		
	private String complemento;
		
	private Integer numero;
		
	private String bairro;
		
	private String localidade;
		
	private String uf;
		
}
