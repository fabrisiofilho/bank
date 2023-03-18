package br.com.hiven.bank.entity;
	
import br.com.hiven.bank.enuns.StatusClientEnum;
import br.com.hiven.bank.enuns.StatusTransactionEnum;
import br.com.hiven.bank.enuns.TypeTransactionEnum;
import lombok.*;
import jakarta.persistence.*;

import java.io.Serializable;
import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.UUID;

	
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Builder
@Table(name = "transaction")
public class TransactionEntity implements Serializable {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name = "id", columnDefinition = "uuid", unique = true, nullable = false, updatable = false)
    private UUID id;
    	
    @ManyToOne
    @JoinColumn(name="owner_id", nullable=false)
    private AccountEntity account;
    	
    @ManyToOne
    @JoinColumn(name="receiver_id", nullable=false)
    private AccountEntity receiverAccount;

    @Enumerated(EnumType.STRING)
    private StatusTransactionEnum status;
    	
    @Column(name = "mount")
    private BigDecimal mount;

    @Enumerated(EnumType.STRING)
    private TypeTransactionEnum type;
    	
    @Column(name = "data")
    private LocalDateTime data;
    	
}
