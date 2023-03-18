package br.com.hiven.bank.service;

import br.com.hiven.bank.dto.profile.ProfileRoleDTO;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import java.util.UUID;

public interface ProfileRoleService { 
	
    ProfileRoleDTO create(ProfileRoleDTO dto);
    ProfileRoleDTO read(UUID id);
    ProfileRoleDTO update(ProfileRoleDTO dto);
    ProfileRoleDTO delete(UUID id);
    Page<ProfileRoleDTO> findAllPageable(Pageable pageable);
    
}
