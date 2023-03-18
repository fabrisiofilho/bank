package br.com.hiven.bank.dto.profile;

import lombok.*;
import java.util.UUID;

@Getter
@Setter
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class  RoleDTO { 
	
	private UUID id;
	private String name;
		
}
