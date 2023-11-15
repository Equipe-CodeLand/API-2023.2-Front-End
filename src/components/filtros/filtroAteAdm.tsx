import axios from 'axios';
import React, { useState } from 'react';
import './filtros.css'

const FiltroChamadosAteAdm = ({ onFiltroSubmit }) => {
  const [tema, setTema] = useState([]);
  const [status, setStatus] = useState([]);
  const [prioridade, setPrioridade] = useState([]);

  const handleFiltroSubmit = () => {
    console.log("Opções selecionadas" + tema + ' ' + status +' ' + prioridade);
    
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
          <label htmlFor="Sem acesso a internet"> Sem acesso a internet </label>
          <input id='Sem acesso a internet' type="checkbox" value="1" onChange={() => handleCheckboxChange(1, tema, setTema)} /> 
        </div>
        <div>
        <label htmlFor="Modem"> Modem </label>
          <input id='Modem' type="checkbox" value="2" onChange={() => handleCheckboxChange(2, tema, setTema)} />
        </div>
        <div>
          <label htmlFor="Outros"> Outros </label>
          <input id='Outros' type="checkbox" value="3" onChange={() => handleCheckboxChange(3, tema, setTema)} />
        </div>
        <div>
          <label htmlFor="Velocidade da internet"> Velocidade da internet </label>
          <input id='Velocidade da internet' type="checkbox" value="4" onChange={() => handleCheckboxChange(4, tema, setTema)} />
        </div>
        </fieldset>
        <fieldset className='prioridades'>
          <legend className='prioridades'>Prioridades </legend>
          <div>
          <label htmlFor="Alta"> Alta </label>
          <input id='Alta' type="checkbox" value="1" onChange={() => handleCheckboxChange(1, prioridade, setPrioridade)} />
          </div>
          <div>
          <label htmlFor="Média"> Média </label>
          <input id='Média' type="checkbox" value="2" onChange={() => handleCheckboxChange(2, prioridade, setPrioridade)} />
          </div>
          <div>
          <label htmlFor="Baixa"> Baixa </label>
          <input id='Baixa' type="checkbox" value="3" onChange={() => handleCheckboxChange(3, prioridade, setPrioridade)} />
          </div>
        </fieldset>
        <fieldset>
        <legend>Status </legend>
          <div>
          <label htmlFor="Em aberto"> Em aberto </label>
          <input id='Em aberto' type="checkbox" value="1" onChange={() => handleCheckboxChange(1, status, setStatus)} />
          </div>
          <div>
          <label htmlFor="Em andamento"> Em andamento </label>
          <input id='Em andamento' type="checkbox" value="2" onChange={() => handleCheckboxChange(2, status, setStatus)} />
          </div>
          <div>
          <label htmlFor="Cancelada"> Cancelado </label>
          <input id='Cancelada' type="checkbox" value="3" onChange={() => handleCheckboxChange(3, status, setStatus)} />
          </div>
          <div>
          <label htmlFor="Concluido"> Concluído </label>
          <input id='Concluido' type="checkbox" value="4" onChange={() => handleCheckboxChange(4, status, setStatus)} />
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

export default FiltroChamadosAteAdm;
