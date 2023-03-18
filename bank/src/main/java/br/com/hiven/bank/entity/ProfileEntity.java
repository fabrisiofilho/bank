package br.com.hiven.bank.entity;
	
import lombok.*;
import jakarta.persistence.*;

import java.io.Serializable;
import java.util.List;
import java.util.UUID;

	
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Builder
@Table(name = "profile")
public class ProfileEntity implements Serializable {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name = "id", columnDefinition = "uuid", unique = true, nullable = false, updatable = false)
    private UUID id;
    	
    @Column(name = "name")
    private String name;
    	
    @OneToMany(mappedBy = "profile", cascade = CascadeType.ALL)
    @Column(name = "profiles_roles")
    private List<ProfileRoleEntity> profilesRoles;
    	
}
