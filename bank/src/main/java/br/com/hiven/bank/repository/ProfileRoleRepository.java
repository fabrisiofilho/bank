package br.com.hiven.bank.repository;

import br.com.hiven.bank.entity.ProfileRoleEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.UUID;

@Repository
public interface ProfileRoleRepository extends JpaRepository<ProfileRoleEntity, UUID>  {
	
}
