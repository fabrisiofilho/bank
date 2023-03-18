package br.com.hiven.bank.service.impl;

import br.com.hiven.bank.dto.profile.RoleDTO;
import br.com.hiven.bank.entity.RoleEntity;
import br.com.hiven.bank.repository.RoleRepository;
import br.com.hiven.bank.service.RoleService;
import org.modelmapper.ModelMapper;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.transaction.annotation.Transactional;

import java.util.UUID;

@Service
public class RoleServiceImpl implements RoleService {
	
    @Autowired
    private RoleRepository repository;
    
	@Autowired
	private ModelMapper modelMapper;

    @Override
    @Transactional
    public RoleDTO create(RoleDTO dto) {
        return modelMapper.map(repository.save(modelMapper.map(dto, RoleEntity.class)), RoleDTO.class);
    }

    @Override
    public RoleDTO read(UUID id) {
        return modelMapper.map(repository.findById(id).orElse(null), RoleDTO.class);
    }

    @Override
    public RoleDTO update(RoleDTO dto) {
        return  modelMapper.map(repository.save(modelMapper.map(dto, RoleEntity.class)), RoleDTO.class);
    }

    @Override
    public RoleDTO delete(UUID id) {
        RoleDTO dto = read(id);
        repository.deleteById(id);
        return dto;
    }
    
	@Override
	public Page<RoleDTO> findAllPageable(Pageable pageable) {
		return repository.findAll(pageable).map(roleEntity -> modelMapper.map(roleEntity, RoleDTO.class));
	}
}
