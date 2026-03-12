package acc.br.buscaCep.interfaces;

import acc.br.buscaCep.model.Endereco;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;


@Service
public class CepService {

        // O RestTemplate é o cliente HTTP padrão do Spring
        private final RestTemplate restTemplate = new RestTemplate();

        public Endereco buscarCep(String cep) {
        // Formata a URL da API ViaCEP
        String url = "https://viacep.com.br/ws/" + cep + "/json/";

        // Chama a API e já converte o JSON para nossa classe DTO
        Endereco response = restTemplate.getForObject(url, Endereco.class);

        // Se o ViaCEP retornar { "erro": true }, lançamos uma exceção
        // (Isso será tratado no Controller para retornar um 404)
        if (response != null && response.isErro()) {
            throw new RuntimeException("CEP não encontrado: " + cep);
        }

        return response;
    }
}

