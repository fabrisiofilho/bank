package br.com.hiven.bank.dto.profile;

import lombok.*;
import java.util.UUID;

@Getter
@Setter
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class  ProfileDTO { 
	
	private UUID id;
		
	private String name;
		
	private ProfileRoleDTO profilesRoles;
		
}
