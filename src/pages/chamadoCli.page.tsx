import React from "react"
import axios from "axios"
import { useState, useEffect } from "react"
import ChamadoCliDropdown from "../components/chamadoCli/chamadoCliDropdown"
import ChamadoCliComponent from "../components/chamadoCli/chamadoCliComponent"
import { ChamadoCli, ChamadoCliDetalhes } from "../components/chamadoCli/chamadosCli.interface"
import Header from "../components/header/headerComponent"

export default function ChamadosCli() {
    const [chamados, setChamados] = useState<ChamadoCli[]>([])

    function buscarChamados() {
        axios.get(`http://localhost:5000/chamadosCli`)
      .then(res => {
        console.log(res);
        let chamados = res.data.map((c: any) => {
          let nomeCliente = c.atendente && c.atendente.usuario && c.atendente.usuario.nome;
          let sobrenomeCliente = c.atendente && c.atendente.usuario && c.cliente.atendente.sobrenome;

          return {
            id: c.id,
            nome: (nomeCliente && sobrenomeCliente) ? nomeCliente + ' ' + sobrenomeCliente : '',
            tema: c.tema,
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
        console.log(chamados);
        setChamados(chamados);
      })
    }

    useEffect(() => {
        buscarChamados();
      }, [])

      const link = ["/", "/", "/cadastroUser"]
  const link_title = ["Chamadas em Aberto"]

    return (
        <div>
            <Header
                link_0 = {link[0]} 
                link_1 = {link[1]}
                link_2 = {link[2]}
                link_title_0 = {link_title[0]}
            />
            {chamados.length > 0 && (
                <div>
                {chamados.map(chamado => (
                    <ChamadoCliComponent
                    nome={chamado.nome}
                    tema={chamado.tema}
                    status={chamado.status}
                    hora={new Date(chamado.hora).toLocaleDateString() + " - " + new Date(chamado.hora).toLocaleTimeString()}
                    descricao={chamado.descricao ? chamado.descricao : []}
                />
                ))}
                </div>
            )}
        </div>
    )
}
