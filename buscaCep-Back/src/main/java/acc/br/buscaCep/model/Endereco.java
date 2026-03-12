package acc.br.buscaCep.model;


import jakarta.persistence.*;

@Entity // 1. Anotação para o JPA saber que esta classe é uma tabela
@Table(name = "enderecos") // 2. Define o nome da tabela no H2

public class Endereco {

    @Id // 3. Define que este campo é a Chave Primária (ID)
    @GeneratedValue(strategy = GenerationType.IDENTITY) // 4. Faz o ID ser autoincrementável
    private Long id;

    @Column(unique = true) // Garante que não salvaremos o mesmo CEP duas vezes
    private String cep;
    private String logradouro;
    private String complemento;
    private String bairro;
    private String localidade;
    private String uf;
    private String ibge;
    private String gia;
    private String ddd;
    private String siafi;
    private String regiao;

    //Construtor
    public void Endereco() {

    }
    //Gets e Sets

    public String getCep() {
        return cep;
    }
    public void setCep(String cep) {
        this.cep = cep;
    }
    public String getLogradouro() {
        return logradouro;
    }
    public void setLogradouro(String logradouro) {
        this.logradouro = logradouro;
    }
    public String getComplemento() {

        return complemento;
    }
    public void setComplemento(String complemento) {

        this.complemento = complemento;
    }
    public String getBairro() {

        return bairro;
    }
    public void setBairro(String bairro) {

        this.bairro = bairro;
    }
    public String getLocalidade() {

        return localidade;
    }
    public void setLocalidade(String localidade) {

        this.localidade = localidade;
    }
    public String getUf() {

        return uf;
    }
    public void setUf(String uf) {

        this.uf = uf;
    }
    public String getIbge() {
        return ibge;
    }
    public void setIbge(String ibge) {

        this.ibge = ibge;
    }
    public String getGia() {

        return gia;
    }
    public void setGia(String gia) {

        this.gia = gia;
    }
    public String getDdd() {

        return ddd;
    }
    public void setDdd(String ddd) {

        this.ddd = ddd;
    }
    public String getSiafi() {

        return siafi;
    }
    public void setSiafi(String siafi) {

        this.siafi = siafi;
    }
    public String getRegiao() {

        return regiao;
    }
    public void setRegiao(String regiao) {

        this.regiao = regiao;
    }

    @Override
    public String toString() {
        return "Endereco{" +
                "cep='" + cep + '\'' +
                ", logradouro='" + logradouro + '\'' +
                ", complemento='" + complemento + '\'' +
                ", bairro=" + bairro +
                ", localidade='" + localidade + '\'' +
                ", uf='" + uf + '\'' +
                ", ibge='" + ibge + '\'' +
                ", gia='" + gia + '\'' +
                ", ddd='" + ddd + '\'' +
                ", siafi='" + siafi + '\'' +
                ", regiao='" + regiao + '\'' +
                '}';
    }

    public boolean isErro() {
        return false;
    }
}
