import { useEffect, useState } from "react";
import "./info-cep.css"
import { useNavigate, useSearchParams } from "react-router-dom";

interface ICepData {
    cep: string;
    logradouro: string;
    bairro: string;
    localidade: string;
    uf: string;
    regiao: string;
    ibge: string;
    ddd: string;
    complemento: string;
    gia: string;
    siafi: string;
  }

const InfoCep = () => {

  // --- Para Receber o Parâmetro ---
  const [searchParams] = useSearchParams();
  const cepDaURL = searchParams.get('CEP'); // "58415285"
  
  // --- Para o Botão "Voltar" ---
  const navigation = useNavigate();

  // (Sua lógica de state para guardar os dados do CEP)
  const [dadosCep, setDadosCep] = useState<ICepData | null>(null); 
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null); // Estado para erros
  
  useEffect(() => {
    if (!cepDaURL) {
      setError("Nenhum CEP fornecido.");
      setLoading(false);
      return;
    }

    // Função assíncrona para buscar os dados
    const fetchCepData = async () => {
      setLoading(true);
      setError(null);
      
      try {
        // 1. CHAMA A SUA API SPRING BOOT!
        const response = await fetch(`http://localhost:8080/api/cep/${cepDaURL}`);

        // 2. Verifica se o Spring retornou 404 ou outro erro
        if (!response.ok) {
          if (response.status === 404) {
            throw new Error("CEP não encontrado.");
          }
          throw new Error("Falha ao buscar dados do CEP.");
        }

        // 3. Converte a resposta para JSON
        const data: ICepData = await response.json();

        // 4. Salva os dados no estado
        setDadosCep(data);

      } catch (err) {
        if (err instanceof Error) {
          setError(err.message);
        } else {
          setError("Ocorreu um erro desconhecido.");
        }
      } finally {
        // 5. Independente de sucesso ou erro, para de carregar
        setLoading(false);
      }
    };

    fetchCepData();
  }, [cepDaURL]);
  
  if (loading) {
    return<div className="page"><div className="formAlert loading">
        <h2>Carregando...</h2>
          </div></div>
  }

  if (error) {
    return (
        <div className="page">
          <div className="formAlert Erro">
              <h2>Erro</h2>
              <p>{error}</p>
              <button onClick={() => navigation('/')} className="button-voltar">Voltar</button>
          </div>
        </div>
    );
  }

  if (!dadosCep) {
    // Isso não deve acontecer se a lógica estiver correta, mas é bom ter
    return <div>Nenhum dado para exibir.</div>;
  }


  return (

    <div className="page">
      <div className="formInfo">

        <h1 className="title">Info do CEP,<br /><span className="spam">{dadosCep?.cep}</span></h1>

        <div className="info">

          <div className="infos-cep">
            <h2>Logradouro</h2>
            <p>{dadosCep?.logradouro || "N/A"}</p>
          </div>
          <div className="infos-cep">
            <h2>Bairro</h2>
            <p>{dadosCep?.bairro}</p>
          </div>
          <div className="infos-cep">
            <h2>Localidade</h2>
            <p>{dadosCep?.localidade}</p>
          </div>
          <div className="infos-cep">
            <h2>UF</h2>
            <p>{dadosCep?.uf}</p>
          </div>
          <div className="infos-cep">
            <h2>Região</h2>
            <p>{dadosCep?.regiao}</p>
          </div>
          <div className="infos-cep">
            <h2>DDD</h2>
            <p>{dadosCep?.ddd}</p>
          </div>
          <div className="infos-cep">
            <h2>Ibge</h2>
            <p>{dadosCep?.ibge}</p>
          </div>
          <div className="infos-cep">
            <h2>Complemento</h2>
            <p>{dadosCep?.complemento}</p>
          </div>
          <div className="infos-cep">
            <h2>GIA</h2>
            <p>{dadosCep?.gia}</p>
          </div>
          <div className="infos-cep">
            <h2>SIAFI</h2>
            <p>{dadosCep?.siafi}</p>
          </div>
    

        </div>
        <button onClick={() => navigation('/card-cep')} className="button-voltar">Voltar</button>
      </div>

      <iframe
        className="Mapa"
        width="600"
        height="450"
        loading="lazy"
        allowFullScreen 
        src={`https://www.google.com/maps?q=${(dadosCep?.logradouro).replace(/\s/g, '+')},+${(dadosCep?.localidade).replace(/\s/g, '+')},+${(dadosCep?.uf).replace(/\s/g, '+')}&output=embed`}>

</iframe>
    </div>
  )   
}

export default InfoCep;