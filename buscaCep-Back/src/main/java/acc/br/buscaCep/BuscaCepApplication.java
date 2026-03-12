package acc.br.buscaCep;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cloud.openfeign.EnableFeignClients;

@SpringBootApplication
@EnableFeignClients
public class BuscaCepApplication {

	public static void main(String[] args) {
		SpringApplication.run(BuscaCepApplication.class, args);
	}

}
// localhost:8080/01523040