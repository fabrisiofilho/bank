package br.com.hiven.bank.service.impl;

import br.com.hiven.bank.dto.transaction.TransactionDTO;
import br.com.hiven.bank.entity.AccountEntity;
import br.com.hiven.bank.entity.TransactionEntity;
import br.com.hiven.bank.exception.BuninessException;
import br.com.hiven.bank.repository.AccountRepository;
import br.com.hiven.bank.repository.TransactionRepository;
import br.com.hiven.bank.service.AccountService;
import br.com.hiven.bank.service.TransactionService;
import org.modelmapper.ModelMapper;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.Objects;
import java.util.UUID;

@Service
public class TransactionServiceImpl implements TransactionService {
	
    @Autowired
    private TransactionRepository repository;
    
	@Autowired
	private ModelMapper modelMapper;

    @Autowired
    private AccountRepository accountRepository;

    @Override
    @Transactional
    public TransactionDTO create(TransactionDTO dto) {
        dto.setData(LocalDateTime.now());
        dto.setReceiverAccount(dto.getAccount());

        AccountEntity conta = accountRepository.findById(dto.getAccount().getId()).orElse(null);
        if (Objects.isNull(conta)) {
            throw new BuninessException("Conta não encontrada");
        }
        if (dto.getType().equalsIgnoreCase("DEPOSIT")) {
            conta.setBalance(conta.getBalance().add(dto.getMount()));
            accountRepository.save(conta);
        } else {
            if (conta.getBalance().compareTo(dto.getMount()) >= 0) {
                conta.setBalance(conta.getBalance().subtract(dto.getMount()));
                accountRepository.save(conta);
            } else {
                throw new BuninessException("Não há saldo suficiente");
            }
        }

        return modelMapper.map(repository.save(modelMapper.map(dto, TransactionEntity.class)), TransactionDTO.class);
    }

    @Override
    public TransactionDTO read(UUID id) {
        return modelMapper.map(repository.findById(id).orElse(null), TransactionDTO.class);
    }

    @Override
    public TransactionDTO update(TransactionDTO dto) {
        return  modelMapper.map(repository.save(modelMapper.map(dto, TransactionEntity.class)), TransactionDTO.class);
    }

    @Override
    public TransactionDTO delete(UUID id) {
        TransactionDTO dto = read(id);
        repository.deleteById(id);
        return dto;
    }
    
	@Override
	public Page<TransactionDTO> findAllPageable(Pageable pageable) {
		return repository.findAll(pageable).map(transactionEntity -> modelMapper.map(transactionEntity, TransactionDTO.class));
	}

    @Override
    public Long counts() {
        return repository.counts();
    }
}
