package br.com.hiven.bank.controller.profile;

import br.com.hiven.bank.dto.profile.ProfileRoleDTO;
import br.com.hiven.bank.service.ProfileRoleService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.UUID;

@RestController
@RequestMapping("profile_role")
public class ProfileRoleController { 
	
    @Autowired
    private ProfileRoleService service;

    @GetMapping("/page/{page}")
    public ResponseEntity<Page<ProfileRoleDTO>> findAllPageable(@PathVariable String page){
        return ResponseEntity.ok(service.findAllPageable(PageRequest.of(Integer.parseInt(page), 8)));
    }

    @GetMapping("/{id}")
    public ResponseEntity<ProfileRoleDTO> read(@PathVariable UUID id){
        return ResponseEntity.ok(service.read(id));
    }

    @PutMapping
    public ResponseEntity<ProfileRoleDTO> update(@RequestBody ProfileRoleDTO updated){
        return ResponseEntity.ok(service.update(updated));
    }

    @PostMapping
    public ResponseEntity<ProfileRoleDTO> create(@RequestBody ProfileRoleDTO created){
        return ResponseEntity.ok(service.create(created));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<ProfileRoleDTO> delete(@PathVariable UUID id){
        return ResponseEntity.ok(service.delete(id));
    }
}
