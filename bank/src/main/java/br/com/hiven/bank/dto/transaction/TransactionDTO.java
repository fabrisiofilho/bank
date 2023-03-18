package br.com.hiven.bank.dto.transaction;

import br.com.hiven.bank.configuration.PatternsDateTime;
import br.com.hiven.bank.dto.account.AccountSimpleDTO;
import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.databind.annotation.JsonDeserialize;
import com.fasterxml.jackson.databind.annotation.JsonSerialize;
import com.fasterxml.jackson.datatype.jsr310.deser.LocalDateTimeDeserializer;
import com.fasterxml.jackson.datatype.jsr310.ser.LocalDateTimeSerializer;
import lombok.*;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.UUID;

@Getter
@Setter
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class  TransactionDTO { 
	
	private UUID id;
		
	private AccountSimpleDTO account;
		
	private AccountSimpleDTO receiverAccount;
		
	private BigDecimal mount;
		
	private String type;

	@JsonDeserialize(using = LocalDateTimeDeserializer.class)
	@JsonSerialize(using = LocalDateTimeSerializer.class)
	@JsonFormat(pattern = PatternsDateTime.ISO)
	private LocalDateTime data;
		
}
