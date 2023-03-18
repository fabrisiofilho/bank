package br.com.hiven.bank.entity;
	
import com.fasterxml.jackson.annotation.JsonBackReference;
import lombok.*;
import jakarta.persistence.*;

import java.io.Serializable;
import java.util.UUID;

	
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Builder
@Table(name = "profile_role")
public class ProfileRoleEntity implements Serializable {

    @EmbeddedId
    @JsonBackReference()
    ProfileRoleEmbeddedId id;

    @ManyToOne
    @MapsId("idProfile")
    @JoinColumn(name="profiles_id", nullable=false)
    private ProfileEntity profile;
    	
    @ManyToOne
    @MapsId("idRole")
    @JoinColumn(name="roles_id", nullable=false)
    private RoleEntity role;
    	
    @Column(name = "active")
    private boolean active;
    	
}
