package br.com.hiven.bank.controller;

import br.com.hiven.bank.dto.account.AccountDTO;
import br.com.hiven.bank.service.AccountService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.InputStreamResource;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.UUID;

@RestController
@RequestMapping("account")
public class AccountController { 
	
    @Autowired
    private AccountService service;

    @GetMapping("/page/{page}")
    public ResponseEntity<Page<AccountDTO>> findAllPageable(@PathVariable String page){
        return ResponseEntity.ok(service.findAllPageable(PageRequest.of(Integer.parseInt(page), 8)));
    }

    @GetMapping("/{id}")
    public ResponseEntity<AccountDTO> read(@PathVariable UUID id){
        return ResponseEntity.ok(service.read(id));
    }

    @PutMapping
    public ResponseEntity<AccountDTO> update(@RequestBody AccountDTO updated){
        updated.setUpdateAt(LocalDateTime.now());
        return ResponseEntity.ok(service.update(updated));
    }

    @PostMapping
    public ResponseEntity<AccountDTO> create(@RequestBody AccountDTO created){
        created.setBalance(BigDecimal.ZERO);
        created.setCreateAt(LocalDateTime.now());
        created.setUpdateAt(LocalDateTime.now());
        return ResponseEntity.ok(service.create(created));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<AccountDTO> delete(@PathVariable UUID id){
        return ResponseEntity.ok(service.delete(id));
    }

    @GetMapping("/getExtract/{id}")
    public ResponseEntity<InputStreamResource> getExtract(@PathVariable UUID id){
        HttpHeaders headers = new HttpHeaders();
        headers.add("Content-Disposition", "inline; filename=extract_"+ LocalDate.now().toString().toLowerCase().replace("-", ""));
        return ResponseEntity.ok()
                .headers(headers)
                .contentType(MediaType.APPLICATION_PDF)
                .body(service.getExtract(id));
    }

    @GetMapping("/counts")
    public ResponseEntity<Long> counts() {
        return ResponseEntity.ok(service.counts());
    }

}


