package br.com.hiven.bank.service.impl;

import br.com.hiven.bank.dto.address.AddressDTO;
import br.com.hiven.bank.entity.AddressEntity;
import br.com.hiven.bank.repository.AddressRepository;
import br.com.hiven.bank.service.AddressService;
import org.modelmapper.ModelMapper;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.transaction.annotation.Transactional;

import java.util.UUID;

@Service
public class AddressServiceImpl implements AddressService {
	
    @Autowired
    private AddressRepository repository;
    
	@Autowired
	private ModelMapper modelMapper;

    @Override
    @Transactional
    public AddressDTO create(AddressDTO dto) {
        return modelMapper.map(repository.save(modelMapper.map(dto, AddressEntity.class)), AddressDTO.class);
    }

    @Override
    public AddressDTO read(UUID id) {
        return modelMapper.map(repository.findById(id).orElse(null), AddressDTO.class);
    }

    @Override
    public AddressDTO update(AddressDTO dto) {
        return  modelMapper.map(repository.save(modelMapper.map(dto, AddressEntity.class)), AddressDTO.class);
    }

    @Override
    public AddressDTO delete(UUID id) {
        AddressDTO dto = read(id);
        repository.deleteById(id);
        return dto;
    }
    
	@Override
	public Page<AddressDTO> findAllPageable(Pageable pageable) {
		return repository.findAll(pageable).map(AddressEntity -> modelMapper.map(AddressEntity, AddressDTO.class));
	}

    @Override
    public Long counts() {
        return repository.counts();
    }
}
