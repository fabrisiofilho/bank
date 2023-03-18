package br.com.hiven.bank.controller;

import br.com.hiven.bank.dto.client.ClientDTO;
import br.com.hiven.bank.dto.client.FindByNameClientDTO;
import br.com.hiven.bank.service.ClientService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("client")
public class ClientController { 
	
    @Autowired
    private ClientService service;

    @GetMapping("/page/{page}")
    public ResponseEntity<Page<ClientDTO>> findAllPageable(@PathVariable String page){
        return ResponseEntity.ok(service.findAllPageable(PageRequest.of(Integer.parseInt(page), 8)));
    }

    @GetMapping("/{id}")
    public ResponseEntity<ClientDTO> read(@PathVariable UUID id){
        return ResponseEntity.ok(service.read(id));
    }

    @PutMapping
    public ResponseEntity<ClientDTO> update(@RequestBody ClientDTO updated){
        return ResponseEntity.ok(service.update(updated));
    }

    @PostMapping
    public ResponseEntity<ClientDTO> create(@RequestBody ClientDTO created){
        return ResponseEntity.ok(service.create(created));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<ClientDTO> delete(@PathVariable UUID id){
        return ResponseEntity.ok(service.delete(id));
    }

    @PostMapping("/byName")
    public ResponseEntity<List<ClientDTO>> read(@RequestBody FindByNameClientDTO dto){
        return ResponseEntity.ok(service.read(dto.getName()));
    }

    @GetMapping("/counts")
    public ResponseEntity<Long> counts() {
        return ResponseEntity.ok(service.counts());
    }
}
