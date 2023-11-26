import React, { useEffect, useState } from 'react';
import Header from '../components/header/headerComponent';
import axios from 'axios';
import HomeAdministrador from '../components/homes/homeAdministrador';
import HomeAdministradorComponent from '../components/homes/homeAdmComponent';

interface Problema {
    id: number;
    tema: {
        nome: string
    };
    desc: string;
    solucao: {
        desc: string
    };
}

const HomeAdministradorPage: React.FC = () => {
    const [problemas, setProblemas] = useState<Problema[]>([]);

    const buscarProblemas = async () => {
        try {
          const response = await fetch('http://localhost:5000/buscarProblemas');
          if (!response.ok) {
            throw new Error('Erro ao buscar problemas');
          }
      
          const data = await response.json();

          console.log(data)
      
          let problemas = data.problemas.map((p) => {
            console.log("desc ",p.desc)
            console.log(p)
            return {
              id: p.id,
              desc: p.desc,
              solucao: p.solucao.desc,
              tema: p.tema ? p.tema : "Tema não especificado"
            };
          });
      
          setProblemas(problemas);
        } catch (error) {
          console.error('Erro ao buscar problemas:', error.message);
        }
      };
      
      useEffect(() => {
        buscarProblemas();
      }, []);          

    async function atualizarProblemas(id, desc, tema_id, solucao) {
        const response = await axios.put(`http://localhost:5000/atualizarProblemas/${id}`, { desc, tema_id, solucao });
        return response.data;
    }

    async function editarProblema(id) {
        const desc = prompt('Digite a nova descrição do problema:');
        const tema_id = prompt('Digite o novo ID do tema:');
        const solucao = prompt('Digite a nova solução:');
        await atualizarProblemas(id, desc, tema_id, solucao);
        // Atualizar a lista de problemas após a edição
        const response = await axios.get('http://localhost:5000/buscarProblemas');
        setProblemas(response.data);
    }

    async function deletarProblema(id) {
        await axios.delete(`http://localhost:5000/deletarProblemas/${id}`);
        // Atualizar a lista de problemas após a exclusão
        const response = await axios.get('http://localhost:5000/buscarProblemas');
        setProblemas(response.data);
    }

    return (
        <div>
            <Header />
            <div className="homeAdm2">
            <HomeAdministrador buscarProblemas={buscarProblemas}/>
            {Array.isArray(problemas) && problemas.map(problema => (
                <HomeAdministradorComponent
                    key={problema.id}
                    id={problema.id}
                    tema={problema.tema.nome}
                    desc={problema.desc}
                    solucao={problema.solucao}
                    todosProblemas={problemas}
                    editarProblema={editarProblema}
                    deletarProblema={deletarProblema}
                />
            ))}

            </div>
        </div>
    );
}

export default HomeAdministradorPage;