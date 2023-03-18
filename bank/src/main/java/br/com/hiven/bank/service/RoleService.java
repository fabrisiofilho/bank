package br.com.hiven.bank.service;

import br.com.hiven.bank.dto.profile.RoleDTO;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import java.util.UUID;

public interface RoleService { 
	
    RoleDTO create(RoleDTO dto);
    RoleDTO read(UUID id);
    RoleDTO update(RoleDTO dto);
    RoleDTO delete(UUID id);
    Page<RoleDTO> findAllPageable(Pageable pageable);
    
}
