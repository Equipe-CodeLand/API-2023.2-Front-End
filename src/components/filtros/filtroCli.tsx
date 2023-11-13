import axios from 'axios';
import React, { useState } from 'react';
import './filtros.css'

const FiltroChamadosCli = ({ onFiltroSubmit }) => {
  const [tema, setTema] = useState([]);
  const [status, setStatus] = useState([]);

  const handleFiltroSubmit = () => {
    let prioridade = [1,2,3]    
    onFiltroSubmit({ tema, status, prioridade });
  };

  const handleCheckboxChange = (value, category, setCategory) => {
    if (category.includes(value)) {
      setCategory(category.filter(item => item !== value));
    } else {
      setCategory([...category, value]);
    }
  };

  return (
      <div className='filtro'>
        <section className='opcoes'>

        <fieldset>
        <legend>Temas </legend>
        <div>
          <label htmlFor="Velocidade da internet"> Velocidade da internet </label>
          <input id='Velocidade da internet' type="checkbox" value="1" onChange={() => handleCheckboxChange(1, tema, setTema)} /> 
        </div>
        <div>
        <label htmlFor="Modem"> Modem </label>
          <input id='Modem' type="checkbox" value="2" onChange={() => handleCheckboxChange(2, tema, setTema)} />
        </div>
        <div>
          <label htmlFor="Problemas com conexão"> Problemas com conexão </label>
          <input id='Problemas com conexão' type="checkbox" value="4" onChange={() => handleCheckboxChange(4, tema, setTema)} />
        </div>
        <div>
          <label htmlFor="Outros"> Outros </label>
          <input id='Outros' type="checkbox" value="3" onChange={() => handleCheckboxChange(3, tema, setTema)} />
        </div>
        </fieldset>
        
        <fieldset>
          <legend>Status </legend>
          <div>
          <label htmlFor="Não iniciada"> Não iniciada </label>
          <input id='Concluída' type="checkbox" value="1" onChange={() => handleCheckboxChange(1, status, setStatus)} />
          </div>
          <div>
          <label htmlFor="Em Andamento"> Em Andamento </label>
          <input id='Em Andamento' type="checkbox" value="2" onChange={() => handleCheckboxChange(2, status, setStatus)} />
          </div>
          <div>
          <label htmlFor="Cancelada"> Cancelada </label>
          <input id='Cancelada' type="checkbox" value="3" onChange={() => handleCheckboxChange(3, status, setStatus)} />
          </div>
          <div>
          <label htmlFor="Concluída"> Concluída </label>
          <input id='Concluída' type="checkbox" value="4" onChange={() => handleCheckboxChange(4, status, setStatus)} />
          </div>
        </fieldset>
        </section>
        <section>
          <div className='botao'>
          <button onClick={handleFiltroSubmit}>Aplicar Filtro</button>
          </div>
        </section>
      </div>
  );
};

export default FiltroChamadosCli
