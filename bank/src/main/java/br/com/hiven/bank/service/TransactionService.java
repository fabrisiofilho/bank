package br.com.hiven.bank.service;

import br.com.hiven.bank.dto.transaction.TransactionDTO;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import java.util.UUID;

public interface TransactionService { 
	
    TransactionDTO create(TransactionDTO dto);
    TransactionDTO read(UUID id);
    TransactionDTO update(TransactionDTO dto);
    TransactionDTO delete(UUID id);
    Page<TransactionDTO> findAllPageable(Pageable pageable);

    Long counts();
    
}
