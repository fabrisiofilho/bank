package br.com.hiven.bank.service;

import br.com.hiven.bank.dto.client.ClientDTO;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.List;
import java.util.UUID;

public interface ClientService { 
	
    ClientDTO create(ClientDTO dto);
    ClientDTO read(UUID id);
    List<ClientDTO> read(String name);
    ClientDTO update(ClientDTO dto);
    ClientDTO delete(UUID id);
    Page<ClientDTO> findAllPageable(Pageable pageable);
    Long counts();
    
}
