package br.com.hiven.bank.service;

import br.com.hiven.bank.dto.address.AddressDTO;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import java.util.UUID;

public interface AddressService { 
	
    AddressDTO create(AddressDTO dto);
    AddressDTO read(UUID id);
    AddressDTO update(AddressDTO dto);
    AddressDTO delete(UUID id);
    Page<AddressDTO> findAllPageable(Pageable pageable);

    Long counts();
    
}
