package br.com.hiven.bank.repository;

import br.com.hiven.bank.entity.UserEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.Optional;
import java.util.UUID;

@Repository
public interface UserRepository extends JpaRepository<UserEntity, UUID> {

    @Query("SELECT p FROM UserEntity p WHERE UPPER(p.username) LIKE UPPER(:username)")
    Optional<UserEntity> findByUsername(String username);

    @Query("SELECT p FROM UserEntity p WHERE UPPER(p.email) LIKE UPPER(:email)")
    Optional<UserEntity> findByEmail(String email);

    Optional<UserEntity> findByTokenRecover(String email);

    @Query("SELECT COUNT(a) FROM UserEntity a")
    Long counts();

}
