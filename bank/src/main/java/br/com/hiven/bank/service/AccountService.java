package br.com.hiven.bank.service;

import br.com.hiven.bank.dto.account.AccountDTO;
import org.springframework.core.io.InputStreamResource;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import java.util.UUID;

public interface AccountService { 
	
    AccountDTO create(AccountDTO dto);
    AccountDTO read(UUID id);

    AccountDTO update(AccountDTO dto);
    AccountDTO delete(UUID id);

    Page<AccountDTO> findAllPageable(Pageable pageable);

    InputStreamResource getExtract(UUID id);

    Long counts();
    
}
