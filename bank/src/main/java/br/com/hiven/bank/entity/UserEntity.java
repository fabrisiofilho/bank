package br.com.hiven.bank.entity;

import br.com.hiven.bank.dto.user.UserDTO;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.io.Serializable;
import java.util.List;
import java.util.UUID;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Builder
@Table(name = "sys_user")
public class UserEntity implements Serializable {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name = "id", columnDefinition = "uuid", unique = true, nullable = false, updatable = false)
    private UUID id;

    @Column(name = "full_name")
    private String fullName;

    @Column(unique = true)
    private String username;

    @Column(unique = true)
    private String email;

    private String password;

    @Column(name = "token_recover")
    private String tokenRecover;

    @ManyToMany(fetch = FetchType.EAGER, cascade = CascadeType.PERSIST)
    @JoinTable(name="user_profiles", joinColumns=
            {@JoinColumn(name="user_id")}, inverseJoinColumns=
            {@JoinColumn(name="profiles_id")})
    private List<ProfileEntity> profiles;

    public UserEntity update(UserDTO userDto){
        this.fullName = userDto.getFullName();
        this.username = userDto.getUsername();
        this.email = userDto.getEmail();
        return this;
    }

}
