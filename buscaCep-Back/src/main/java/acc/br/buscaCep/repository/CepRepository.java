package acc.br.buscaCep.repository;

import acc.br.buscaCep.model.Endereco;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface CepRepository extends JpaRepository<Endereco, Long> {

    Optional<Endereco> findByCep(String cep);
}