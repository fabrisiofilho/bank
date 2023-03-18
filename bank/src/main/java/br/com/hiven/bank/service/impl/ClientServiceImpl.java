package br.com.hiven.bank.service.impl;

import br.com.hiven.bank.dto.client.ClientDTO;
import br.com.hiven.bank.entity.ClientEntity;
import br.com.hiven.bank.repository.ClientRepository;
import br.com.hiven.bank.service.ClientService;
import org.apache.juli.logging.Log;
import org.modelmapper.ModelMapper;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

@Service
public class ClientServiceImpl implements ClientService {
	
    @Autowired
    private ClientRepository repository;
    
	@Autowired
	private ModelMapper modelMapper;

    @Override
    @Transactional
    public ClientDTO create(ClientDTO dto) {
        dto.setCreateAt(LocalDateTime.now());
        dto.setUpdateAt(LocalDateTime.now());
        dto.setActive(true);
        return modelMapper.map(repository.save(modelMapper.map(dto, ClientEntity.class)), ClientDTO.class);
    }

    @Override
    public ClientDTO read(UUID id) {
        return modelMapper.map(repository.findById(id).orElse(null), ClientDTO.class);
    }

    @Override
    public List<ClientDTO> read(String name) {
        return repository.findByName(name).stream().map(client -> modelMapper.map(client, ClientDTO.class)).collect(Collectors.toList());
    }

    @Override
    public ClientDTO update(ClientDTO dto) {
        dto.setUpdateAt(LocalDateTime.now());
        return  modelMapper.map(repository.save(modelMapper.map(dto, ClientEntity.class)), ClientDTO.class);
    }

    @Override
    public ClientDTO delete(UUID id) {
        ClientDTO dto = read(id);
        repository.deleteById(id);
        return dto;
    }
    
	@Override
	public Page<ClientDTO> findAllPageable(Pageable pageable) {
		return repository.findAll(pageable).map(clientEntity -> modelMapper.map(clientEntity, ClientDTO.class));
	}

    @Override
    public Long counts() {
        return repository.counts();
    }
}
