package br.com.hiven.bank.repository;

import br.com.hiven.bank.entity.AccountEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.Optional;
import java.util.UUID;

@Repository
public interface AccountRepository extends JpaRepository<AccountEntity, UUID>  {

    @Query("SELECT COUNT(a) FROM AccountEntity a")
    Long counts();

    Optional<AccountEntity> findByNumber(String number);

}
