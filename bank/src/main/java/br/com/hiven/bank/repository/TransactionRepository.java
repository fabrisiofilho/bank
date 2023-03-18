package br.com.hiven.bank.repository;

import br.com.hiven.bank.entity.TransactionEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.UUID;

@Repository
public interface TransactionRepository extends JpaRepository<TransactionEntity, UUID>  {

    @Query("SELECT COUNT(a) FROM TransactionEntity a")
    Long counts();

}
