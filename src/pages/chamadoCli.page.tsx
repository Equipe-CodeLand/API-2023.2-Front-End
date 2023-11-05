import React from "react"
import axios from "axios"
import { useState, useEffect } from "react"
import ChamadoCliDropdown from "../components/chamadoCli/chamadoCliDropdown"
import ChamadoCliComponent from "../components/chamadoCli/chamadoCliComponent"
import { ChamadoCli, ChamadoCliDetalhes } from "../components/chamadoCli/chamadosCli.interface"
import Header from "../components/header/headerComponent"
import ChamadoComponent from "../components/chamado/chamadoComponent"
import Chamado from "../components/chamado/chamado.interface"
import { jwtDecode } from "jwt-decode";
import Token from "../components/login/token.interface"

export default function ChamadosCli() {
    const [chamados, setChamados] = useState<Chamado[]>([])
    const token = jwtDecode<Token>(localStorage.getItem('token') || '')
    function buscarChamados() {
      axios.defaults.headers.common["Authorization"] = `${localStorage.getItem('token') || ' '}`;
      axios.get(`http://localhost:5000/chamadosCli/${token.userId}`)
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
        buscarChamados();
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