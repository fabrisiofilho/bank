package br.com.hiven.bank.controller;

import br.com.hiven.bank.dto.transaction.TransactionDTO;
import br.com.hiven.bank.service.TransactionService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.UUID;

@RestController
@RequestMapping("transaction")
public class TransactionController { 
	
    @Autowired
    private TransactionService service;

    @GetMapping("/page/{page}")
    public ResponseEntity<Page<TransactionDTO>> findAllPageable(@PathVariable String page){
        return ResponseEntity.ok(service.findAllPageable(PageRequest.of(Integer.parseInt(page), 8)));
    }

    @GetMapping("/{id}")
    public ResponseEntity<TransactionDTO> read(@PathVariable UUID id){
        return ResponseEntity.ok(service.read(id));
    }

    @PutMapping
    public ResponseEntity<TransactionDTO> update(@RequestBody TransactionDTO updated){
        return ResponseEntity.ok(service.update(updated));
    }

    @PostMapping
    public ResponseEntity<TransactionDTO> create(@RequestBody TransactionDTO created){
        return ResponseEntity.ok(service.create(created));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<TransactionDTO> delete(@PathVariable UUID id){
        return ResponseEntity.ok(service.delete(id));
    }

    @GetMapping("/counts")
    public ResponseEntity<Long> counts() {
        return ResponseEntity.ok(service.counts());
    }

}
