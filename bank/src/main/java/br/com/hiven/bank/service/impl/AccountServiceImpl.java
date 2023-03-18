package br.com.hiven.bank.service.impl;

import br.com.hiven.bank.dto.account.AccountDTO;
import br.com.hiven.bank.entity.AccountEntity;
import br.com.hiven.bank.exception.BuninessException;
import br.com.hiven.bank.repository.AccountRepository;
import br.com.hiven.bank.service.AccountService;
import br.com.hiven.bank.service.ReportService;
import org.modelmapper.ModelMapper;
import org.springframework.core.io.InputStreamResource;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.transaction.annotation.Transactional;

import java.util.Objects;
import java.util.Optional;
import java.util.UUID;

@Service
public class AccountServiceImpl implements AccountService {
	
    @Autowired
    private AccountRepository repository;
    
	@Autowired
	private ModelMapper modelMapper;

    @Autowired
    private ReportService reportService;

    @Override
    @Transactional
    public AccountDTO create(AccountDTO dto) {
        if (findByNumero(dto.getNumber()).isPresent()) {
            throw new BuninessException("Já existe uma conta com este numero.");
        }
        return modelMapper.map(repository.save(modelMapper.map(dto, AccountEntity.class)), AccountDTO.class);
    }

    private Optional<AccountEntity> findByNumero(String numero) {
        return repository.findByNumber(numero);
    }

    @Override
    public AccountDTO read(UUID id) {
        return modelMapper.map(repository.findById(id).orElse(null), AccountDTO.class);
    }

    @Override
    public AccountDTO update(AccountDTO dto) {
        return  modelMapper.map(repository.save(modelMapper.map(dto, AccountEntity.class)), AccountDTO.class);
    }

    @Override
    public AccountDTO delete(UUID id) {
        AccountDTO dto = read(id);
        if (Objects.isNull(dto.getTransactions()) || !dto.getTransactions().isEmpty()) {
            throw new BuninessException("Está conta já contém movimentacações.");
        }
        repository.deleteById(id);
        return dto;
    }
    
	@Override
	public Page<AccountDTO> findAllPageable(Pageable pageable) {
		return repository.findAll(pageable).map(accountEntity -> modelMapper.map(accountEntity, AccountDTO.class));
	}

    @Override
    public InputStreamResource getExtract(UUID id) {
        AccountEntity entity = repository.findById(id).orElse(null);
        if (Objects.nonNull(entity)) {
            return new InputStreamResource(reportService.createPDF(entity));
        }
        throw new BuninessException("Não possivel possivel encontrar a conta");
    }

    @Override
    public Long counts() {
        return repository.counts();
    }
}
