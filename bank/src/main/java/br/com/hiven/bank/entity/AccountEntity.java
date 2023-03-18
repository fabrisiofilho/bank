package br.com.hiven.bank.entity;
	
import br.com.hiven.bank.enuns.StatusClientEnum;
import lombok.*;
import jakarta.persistence.*;

import java.io.Serializable;
import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.List;
import java.util.UUID;

	
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Builder
@Table(name = "account")
public class AccountEntity  implements Serializable {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name = "id", columnDefinition = "uuid", unique = true, nullable = false, updatable = false)
    private UUID id;
    	
    @Column(name = "number")
    private String number;

    @ManyToOne
    @JoinColumn(name="owner_id", nullable=false)
    private ClientEntity owner;

    @Enumerated(EnumType.STRING)
    private StatusClientEnum status;

    @OneToMany(mappedBy = "account", cascade = CascadeType.ALL)
    private List<TransactionEntity> transactions;
    	
    @Column(name = "balance")
    private BigDecimal balance;
    	
    @Column(name = "create_at")
    private LocalDateTime createAt;
    	
    @Column(name = "update_at")
    private LocalDateTime updateAt;
    	
    @Column(name = "active")
    private boolean active;
    	
}
