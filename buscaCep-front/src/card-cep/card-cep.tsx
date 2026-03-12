import { useState } from "react";
import "./card-cep.css";
import { useNavigate } from "react-router-dom";

const CardCep = () => {

  const [cep, setCep] = useState('');
  const navigation = useNavigate(); // 2. Inicialize o hook

  const handleBuscarCep = (e:any) => {
    e.preventDefault(); // Previne que o formulário recarregue a página
    
    if (cep.trim()) { // Verifica se o CEP não está vazio
      // 3. Navega para a rota /info-cep, passando o CEP como parâmetro de busca
      navigation(`/info-cep?CEP=${cep}`);
    }
  }

  return (

      <div className="page">
      <form className="form" onSubmit={handleBuscarCep}>
        <div className="title">Bem vindo ao BuscaCep.acc,<br />
          <span>Digite o CEP</span></div>
        <input value={cep} onChange={(e) => setCep(e.target.value)} className="input" name="CEP" placeholder="CEP" type="text" required />
        <button className="button-confirm" type="submit">Pesquisar</button>
      </form>
      </div> 
   
  );
  
}

export default CardCep;
