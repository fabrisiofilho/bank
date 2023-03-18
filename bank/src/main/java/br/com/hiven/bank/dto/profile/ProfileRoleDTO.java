package br.com.hiven.bank.dto.profile;

import lombok.*;
import java.util.UUID;

@Getter
@Setter
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class  ProfileRoleDTO { 
	
	private ProfileRoleDTO profiles;
		
	private RoleDTO roles;
		
	private boolean active;
		
}
