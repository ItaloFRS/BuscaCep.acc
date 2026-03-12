package acc.br.buscaCep.controller;

import acc.br.buscaCep.repository.CepRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import acc.br.buscaCep.interfaces.CepService;
import acc.br.buscaCep.model.Endereco;

@RestController
@RequestMapping("/api/cep") // Prefixo para todos os endpoints deste controller
// ❗️ IMPORTANTE: Permite que seu app React (em EX: localhost:5173) acesse este backend
@CrossOrigin(origins = "*")
public class CepRestController {

    @Autowired
    private CepService cepService;

    @Autowired
    private CepRepository cepRepository;

    @GetMapping("/{cep}")
    public ResponseEntity<Endereco> getCep(@PathVariable String cep) {

        String cepLimpo = cep.replaceAll("[^0-9]", "");

        try {

            Endereco endereco = cepService.buscarCep(cepLimpo);

            // Se a API encontrou, verificamos se já temos no banco.
            // Usamos 'endereco.getCep()' pois é o CEP formatado que vem da API
            // (ex: "58400-160"), garantindo consistência.

            if (!cepRepository.findByCep(endereco.getCep()).isPresent()) {

                // 3.Se não existe no banco, nós salvamos.
                cepRepository.save(endereco);
            }
            // 4. Retorna o endereço (vindo da API) para o usuário
            return ResponseEntity.ok().body(endereco);

        } catch (RuntimeException e) {
            // Se o CepService lançou a exceção (CEP não encontrado),
            // o 'catch' a captura e retorna um 404 Not Found.
            return ResponseEntity.notFound().build();
        }
    }

}
