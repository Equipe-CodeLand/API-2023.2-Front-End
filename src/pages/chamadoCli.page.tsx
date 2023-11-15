import React from "react"
import axios from "axios"
import { useState, useEffect } from "react"
import Header from "../components/header/headerComponent"
import ChamadoComponent from "../components/chamado/chamadoComponent"
import Chamado from "../components/chamado/chamado.interface"
import { jwtDecode } from "jwt-decode";
import Token from "../components/login/token.interface"
import { BsFilter } from "react-icons/bs"
import FiltroChamadosCli from "../components/filtros/filtroCli"


export default function ChamadosCli() {
    const [chamados, setChamados] = useState<Chamado[]>([])
    const token = jwtDecode<Token>(localStorage.getItem('token') || '')

    const [isFilterVisible, setIsFilterVisible] = useState(false);

    const toggleFilter = () => {
      setIsFilterVisible(!isFilterVisible);
    };
  
    const handleFilter = (params) => {
      let tema = params.tema
      let status = params.status
      let prioridade = params.prioridade
      //toggleFilter()
      
      buscarChamados(tema, status,prioridade);
    };

    function buscarChamados(tema: number[], status: number[],prioridade: number[]) {
      axios.defaults.headers.common["Authorization"] = `${localStorage.getItem('token') || ' '}`;
      axios.get(`http://localhost:5000/chamadosCli/${token.userId}/tema=${tema}/status=${status}/prioridade=${prioridade}`)
      .then(res => {
        console.log(res);
        let chamados = res.data.map((c: any) => {
          let nomeAtendente = c.atendente && c.atendente.usuario && c.atendente.usuario.nome;
          let sobrenomeAtendente = c.atendente && c.atendente.usuario && c.atendente.usuario.sobrenome;

          return {
            id: c.id,
            nome: (nomeAtendente && sobrenomeAtendente) ? nomeAtendente + ' ' + sobrenomeAtendente : '',
            tema: {
              id: c.tema.id,
              texto: c.tema.nome
            },
            status: {
              id: c.status.id,
              texto: c.status.nome
            },
            hora: c.inicio,
            fim: c.final
          }        
        })
        console.log(chamados);
        setChamados(chamados);
      })
    }

    useEffect(() => {
      let tema = [1,2,3,4]
      let status = [1,2,3,4]
      let prioridade = [1,2,3]
    buscarChamados(tema, status,prioridade);
}, [])

      const link = ["/home/cliente", "/cadastroChamados"]
  const link_title = ["Home","Criar novo chamado"]

    return (
        <div>
            <Header
                link_0 = {link[0]} 
                link_1 = {link[1]}
                link_title_0 = {link_title[0]}
                link_title_1 = {link_title[1]}

            />
            {chamados.length > 0 && (
                <div>
                <div className="cabecalho"> 
                  <div> ID: </div>
                  <div> Nome do Atendente: </div>
                  <div> Tema da chamada: </div>
                  <div> Status da chamada: </div>
                  <div> Prazo de resposta: </div>

                  <BsFilter size={30} onClick={toggleFilter}/>
                </div>
                {isFilterVisible && <FiltroChamadosCli onFiltroSubmit={handleFilter}/>}
                {chamados.map(chamado => (
                    <ChamadoComponent
                    id={chamado.id}
                    nome={chamado.nome}
                    tema={chamado.tema}
                    status={chamado.status}
                    hora={new Date(chamado.hora).toLocaleDateString() + " - " + new Date(chamado.hora).toLocaleTimeString()}
                    descricao={chamado.descricao}
                />
                ))}
                </div>
            )}
        </div>
    )
}