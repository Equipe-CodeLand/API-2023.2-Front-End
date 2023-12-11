import React, { useEffect, useState } from "react";
import axios from "axios";
import Header from "../components/header/headerComponent";
import { ChamadoAte } from "../components/chamadoAte/chamadoAte.interface";
import ChamadoComponent from "../components/chamado/chamadoComponent";
import ChamadoDropdown from "../components/chamado/chamadoDropdown";
import Chamado from "../components/chamado/chamado.interface";
import { BsChevronDown, BsFillFilterSquareFill, BsFilter, BsFilterRight } from "react-icons/bs";
import './styles.css'
import FiltroChamadosAteAdm from "../components/filtros/filtroAteAdm";

export default function ChamadosAdm() {
  const [chamados, setChamados] = useState<Chamado[]>([]);

  const [isFilterVisible, setIsFilterVisible] = useState(false);

  const toggleFilter = () => {
    setIsFilterVisible(!isFilterVisible);
  };

  const handleFilter = (params) => {
    let tema = params.tema
    let status = params.status
    let prioridade = params.prioridade
    buscarChamados(tema, status, prioridade);
    toggleFilter()
  };

  function buscarChamados(tema: number[], status: number[], prioridade: number[]) {
    const token = localStorage.getItem('token');
    axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    
    axios.get(`http://localhost:5000/chamadosAte/tema=${tema}/status=${status}/prioridade=${prioridade}`)
      .then(res => {
        let chamados = res.data.map((c: any) => {
          let nomeCliente = c.cliente && c.cliente.usuario && c.cliente.usuario.nome;
          let sobrenomeCliente = c.cliente && c.cliente.usuario && c.cliente.usuario.sobrenome;

          return {
            id: c.id,
            nome: (nomeCliente && sobrenomeCliente) ? nomeCliente + ' ' + sobrenomeCliente : '',
            tema:{
              id: c.tema.id,
              texto: c.tema.nome
            },
            status: {
              id: c.status.id,
              texto: c.status.nome
            },
            prioridade:{
              id: c.prioridade.id,
              value: c.prioridade.nome
            },
            hora: c.inicio,
            fim: c.final
          }                
        })
        setChamados(chamados);
      });
  }

  useEffect(() => {
    let tema = [1,2,3,4]
    let status = [1,2,3,4]
    let prioridade =  [1,2,3]
    buscarChamados(tema, status, prioridade);
  }, []);

  const link = ["/home/atendente", "/meusChamados/atendente"]; // Link para as páginas
  const link_title = ["Home", "Meus chamados"]; // titulo para as paginas

  return (
    <div>
      <Header
        link_0={link[0]} 
        link_1={link[1]}
        link_title_0={link_title[0]} 
        link_title_1={link_title[1]}
      />
      
      <div className="cabecalho"> 
            <div> ID: </div>
            <div> Nome do Cliente: </div>
            <div> Tema da chamada: </div>
            <div> Status da chamada: </div>
            <div> Prioridade da chamada: </div>
            <div> Horário de início: </div>

            <BsFilter size={30} onClick={toggleFilter}/>
          </div>
          {isFilterVisible && <FiltroChamadosAteAdm onFiltroSubmit={handleFilter}/>}
      {chamados.length > 0 && (
        <div>
          {chamados.map(chamado => {
            return (
                <ChamadoComponent
                  id={chamado.id}
                  nome={chamado.nome}
                  tema={chamado.tema}
                  status={chamado.status}
                  prioridade = {chamado.prioridade}
                  hora={new Date(chamado.hora).toLocaleDateString() + " - " + new Date(chamado.hora).toLocaleTimeString()}
                  descricao={chamado.descricao}
                  key={'chamado' + chamado.id}
                />
            )
        })}
        </div>
      )}
    </div>
  );
}