package br.com.hiven.bank.service.impl;

import br.com.hiven.bank.dto.profile.ProfileRoleDTO;
import br.com.hiven.bank.entity.ProfileRoleEntity;
import br.com.hiven.bank.repository.ProfileRoleRepository;
import br.com.hiven.bank.service.ProfileRoleService;
import org.modelmapper.ModelMapper;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.transaction.annotation.Transactional;

import java.util.UUID;

@Service
public class ProfileRoleServiceImpl implements ProfileRoleService {
	
    @Autowired
    private ProfileRoleRepository repository;
    
	@Autowired
	private ModelMapper modelMapper;

    @Override
    @Transactional
    public ProfileRoleDTO create(ProfileRoleDTO dto) {
        return modelMapper.map(repository.save(modelMapper.map(dto, ProfileRoleEntity.class)), ProfileRoleDTO.class);
    }

    @Override
    public ProfileRoleDTO read(UUID id) {
        return modelMapper.map(repository.findById(id).orElse(null), ProfileRoleDTO.class);
    }

    @Override
    public ProfileRoleDTO update(ProfileRoleDTO dto) {
        return  modelMapper.map(repository.save(modelMapper.map(dto, ProfileRoleEntity.class)), ProfileRoleDTO.class);
    }

    @Override
    public ProfileRoleDTO delete(UUID id) {
        ProfileRoleDTO dto = read(id);
        repository.deleteById(id);
        return dto;
    }
    
	@Override
	public Page<ProfileRoleDTO> findAllPageable(Pageable pageable) {
		return repository.findAll(pageable).map(profileRoleEntity -> modelMapper.map(profileRoleEntity, ProfileRoleDTO.class));
	}
}
