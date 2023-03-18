package br.com.hiven.bank.entity;

import jakarta.persistence.*;
import lombok.*;

import java.io.Serializable;
import java.util.UUID;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Embeddable
public class ProfileRoleEmbeddedId implements Serializable {

    @Column(name = "id_profile")
    UUID idProfile;

    @Column(name = "id_role")
    UUID idRole;


}
