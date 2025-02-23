package com.erp.management;

import com.erp.management.domain.model.User;
import com.erp.management.domain.repository.UserRespository;
import com.erp.management.enuns.UserRole;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.crypto.password.PasswordEncoder;

import java.util.Optional;

@Configuration
public class CreateInitialUser implements CommandLineRunner {
        @Autowired
		private PasswordEncoder encoder;
		@Autowired
		private UserRespository userRespository;

		@Override
		public void run(String... args) throws Exception {

			User user = User.builder()
					.username("seu_nome")
					.email("seu_email@email.com")
					.password(encoder.encode("crie_uma_senha_forte"))
					.role(UserRole.valueOf("ADMIN"))
					.build();

			Optional<User> userDb = userRespository.findByEmail(user.getEmail());

			if (userDb.isEmpty()){
				userRespository.save(user);
				System.out.println("Usuario criado!");
			}
		}
}
