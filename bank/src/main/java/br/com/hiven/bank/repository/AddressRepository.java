package br.com.hiven.bank.repository;

import br.com.hiven.bank.entity.AddressEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.UUID;

@Repository
public interface AddressRepository extends JpaRepository<AddressEntity, UUID>  {

    @Query("SELECT COUNT(a) FROM AddressEntity a")
    Long counts();

}
