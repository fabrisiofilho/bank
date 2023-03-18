package br.com.hiven.bank.repository;

import br.com.hiven.bank.entity.ClientEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.UUID;

@Repository
public interface ClientRepository extends JpaRepository<ClientEntity, UUID>  {

    @Query("SELECT COUNT(a) FROM ClientEntity a")
    Long counts();

    @Query(value = "SELECT * FROM client u WHERE UPPER(u.name) LIKE ('%' || UPPER(?1) || '%') LIMIT 6", nativeQuery = true)
    List<ClientEntity> findByName(String name);

}
