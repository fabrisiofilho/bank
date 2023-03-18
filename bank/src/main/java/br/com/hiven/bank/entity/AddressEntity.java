package br.com.hiven.bank.entity;
	
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
@Table(name = "address")
public class AddressEntity implements Serializable {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name = "id", columnDefinition = "uuid", unique = true, nullable = false, updatable = false)
    private UUID id;
    	
    @Column(name = "cep")
    private String cep;
    	
    @Column(name = "logradouro")
    private String logradouro;
    	
    @Column(name = "complemento")
    private String complemento;
    	
    @Column(name = "numero")
    private Integer numero;
    	
    @Column(name = "bairro")
    private String bairro;
    	
    @Column(name = "localidade")
    private String localidade;
    	
    @Column(name = "uf")
    private String uf;
    	
}
