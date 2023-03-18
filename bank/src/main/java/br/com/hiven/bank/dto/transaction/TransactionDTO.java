package br.com.hiven.bank.dto.transaction;

import br.com.hiven.bank.dto.account.AccountSimpleDTO;
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
		
	private LocalDateTime data;
		
}
