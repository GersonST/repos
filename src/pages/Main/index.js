import React, { useState, useCallback } from 'react';
import { FaGithub, FaPlus, FaSpinner} from 'react-icons/fa';

import { Container, Form, SubmitButton } from './styles';
import api from '../../services/api';

export default function Main(){

  const [newRepo, setNewRepo] = useState('');
  const [repositorios, setRepositorios] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleSubmit = useCallback((e)=>{
    // Previne de atualizar a página
    e.preventDefault();

    // Faz a requisição com a api
    async function submit(){
      setLoading(true);
      try {
        const response = await api.get(`repos/${newRepo}`);
        // Pega o valor de full_name dentro do objeto da api
          const data = {
            name: response.data.full_name,
          }
    
          setRepositorios([...repositorios, data]);
          setNewRepo('');
      }catch(error){
        console.log(error);
      }finally{
        setLoading(false);
      }
   

    }

    submit();

    
  },[newRepo, repositorios]);

  

  function handleinputChange(e){
    setNewRepo(e.target.value);
  }


  return(
    <Container>

      <h1>
        <FaGithub size={25}/>
        Meus repositórios
      </h1>

      <Form onSubmit={handleSubmit}>

        <input 
        type="text" 
        placeholder="Adicionar Repositórios" 
        value={newRepo}
        onChange={handleinputChange}
        />

        <SubmitButton loading={loading ? 1 : 0}>
          {loading ? (
            <FaSpinner color="#FFF" size={14}/>
          ): (
            <FaPlus color="#FFF" size={14}/>
          )}  
        </SubmitButton>

      </Form>

    </Container>
  );
}