package br.com.hiven.bank.service;

import br.com.hiven.bank.dto.profile.ProfileDTO;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import java.util.UUID;

public interface ProfileService { 
	
    ProfileDTO create(ProfileDTO dto);
    ProfileDTO read(UUID id);
    ProfileDTO update(ProfileDTO dto);
    ProfileDTO delete(UUID id);
    Page<ProfileDTO> findAllPageable(Pageable pageable);
    
}
