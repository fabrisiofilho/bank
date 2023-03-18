package br.com.hiven.bank.service.impl;

import br.com.hiven.bank.dto.profile.ProfileDTO;
import br.com.hiven.bank.entity.ProfileEntity;
import br.com.hiven.bank.repository.ProfileRepository;
import br.com.hiven.bank.service.ProfileService;
import org.modelmapper.ModelMapper;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.transaction.annotation.Transactional;

import java.util.UUID;

@Service
public class ProfileServiceImpl implements ProfileService {
	
    @Autowired
    private ProfileRepository repository;
    
	@Autowired
	private ModelMapper modelMapper;

    @Override
    @Transactional
    public ProfileDTO create(ProfileDTO dto) {
        return modelMapper.map(repository.save(modelMapper.map(dto, ProfileEntity.class)), ProfileDTO.class);
    }

    @Override
    public ProfileDTO read(UUID id) {
        return modelMapper.map(repository.findById(id).orElse(null), ProfileDTO.class);
    }

    @Override
    public ProfileDTO update(ProfileDTO dto) {
        return  modelMapper.map(repository.save(modelMapper.map(dto, ProfileEntity.class)), ProfileDTO.class);
    }

    @Override
    public ProfileDTO delete(UUID id) {
        ProfileDTO dto = read(id);
        repository.deleteById(id);
        return dto;
    }
    
	@Override
	public Page<ProfileDTO> findAllPageable(Pageable pageable) {
		return repository.findAll(pageable).map(profileEntity -> modelMapper.map(profileEntity, ProfileDTO.class));
	}
}
