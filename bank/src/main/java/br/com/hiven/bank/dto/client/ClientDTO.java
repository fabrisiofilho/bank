package br.com.hiven.bank.dto.client;

import br.com.hiven.bank.configuration.PatternsDateTime;
import br.com.hiven.bank.dto.account.AccountDTO;
import br.com.hiven.bank.dto.account.AccountSimpleDTO;
import br.com.hiven.bank.dto.address.AddressDTO;
import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.databind.annotation.JsonDeserialize;
import com.fasterxml.jackson.databind.annotation.JsonSerialize;
import com.fasterxml.jackson.datatype.jsr310.deser.LocalDateTimeDeserializer;
import com.fasterxml.jackson.datatype.jsr310.ser.LocalDateTimeSerializer;
import lombok.*;

import java.time.LocalDateTime;
import java.util.List;
import java.util.UUID;

@Getter
@Setter
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class  ClientDTO { 
	
	private UUID id;
		
	private String name;
		
	private String lastName;
		
	private String cpf;
		
	private String address;
		
	private List<AccountSimpleDTO> account;

	@JsonDeserialize(using = LocalDateTimeDeserializer.class)
	@JsonSerialize(using = LocalDateTimeSerializer.class)
	@JsonFormat(pattern = PatternsDateTime.ISO)
	private LocalDateTime createAt;

	@JsonDeserialize(using = LocalDateTimeDeserializer.class)
	@JsonSerialize(using = LocalDateTimeSerializer.class)
	@JsonFormat(pattern = PatternsDateTime.ISO)
	private LocalDateTime updateAt;
		
	private boolean active;
		
}
