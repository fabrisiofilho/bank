package br.com.hiven.bank.dto.account;

import br.com.hiven.bank.configuration.PatternsDateTime;
import br.com.hiven.bank.dto.client.ClientDTO;
import br.com.hiven.bank.dto.client.ClientSimpleDTO;
import br.com.hiven.bank.dto.transaction.TransactionDTO;
import br.com.hiven.bank.dto.transaction.TransactionSimpleDTO;
import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.databind.annotation.JsonDeserialize;
import com.fasterxml.jackson.databind.annotation.JsonSerialize;
import com.fasterxml.jackson.datatype.jsr310.deser.LocalDateTimeDeserializer;
import com.fasterxml.jackson.datatype.jsr310.ser.LocalDateTimeSerializer;
import lombok.*;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.List;
import java.util.UUID;

@Getter
@Setter
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class  AccountDTO { 
	
	private UUID id;
		
	private String number;
		
	private ClientSimpleDTO owner;
		
	private List<TransactionSimpleDTO> transactions;
		
	private BigDecimal balance;

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
