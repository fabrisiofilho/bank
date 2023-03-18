package br.com.hiven.bank.entity;
	
import br.com.hiven.bank.enuns.StatusClientEnum;
import lombok.*;
import jakarta.persistence.*;

import java.io.Serializable;
import java.time.LocalDateTime;
import java.util.List;
import java.util.UUID;

	
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Builder
@Table(name = "client")
public class ClientEntity implements Serializable {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name = "id", columnDefinition = "uuid", unique = true, nullable = false, updatable = false)
    private UUID id;
    	
    @Column(name = "name")
    private String name;
    	
    @Column(name = "last_name")
    private String lastName;
    	
    @Column(name = "cpf")
    private String cpf;

    @Enumerated(EnumType.STRING)
    private StatusClientEnum status;

//    @OneToOne(cascade = CascadeType.ALL)
//    @JoinColumn(name = "address_id", referencedColumnName = "id")
//    private AddressEntity address;

    private String address;

    @OneToMany(mappedBy = "owner", cascade = CascadeType.ALL)
    private List<AccountEntity> account;
    	
    @Column(name = "create_at")
    private LocalDateTime createAt;
    	
    @Column(name = "update_at")
    private LocalDateTime updateAt;
    	
    @Column(name = "active")
    private boolean active;
    	
}
