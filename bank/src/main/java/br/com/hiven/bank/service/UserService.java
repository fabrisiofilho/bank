package br.com.hiven.bank.service;

import br.com.hiven.bank.dto.user.UserDTO;
import br.com.hiven.bank.entity.UserEntity;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.List;
import java.util.UUID;

public interface UserService {

    UserEntity create(UserDTO userDto);
    UserEntity read(UUID id);
    UserEntity update(UserDTO userDto);
    UserEntity delete(UUID id);
    List<UserEntity> list();
    Page<UserEntity> pageable(Pageable pageable);
    UserEntity resetPassword(UserEntity userDto);
    Boolean isEmailInUse(String email);
    UserEntity findByEmail(String email);
    UserEntity findByUsername(String email);
    UserEntity updateName(UserDTO.UpdateName dto);
    UserEntity updateUser(UserDTO.UpdateUser dto);
    UserEntity updateRecoverToken(String token, UserEntity userEntity);
    UserEntity findByTokenRecover(String token);
    Long counts();

}
