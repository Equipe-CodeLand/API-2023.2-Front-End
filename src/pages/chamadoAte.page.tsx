import React, { useEffect, useState } from "react";
import axios from "axios";
import Header from "../components/header/headerComponent";
import { ChamadoAte } from "../components/chamadoAte/chamadoAte.interface";
import ChamadoComponent from "../components/chamado/chamadoComponent";
import ChamadoDropdown from "../components/chamado/chamadoDropdown";
import Chamado from "../components/chamado/chamado.interface";

export default function ChamadosAdm() {
  const [chamados, setChamados] = useState<Chamado[]>([]);

  function buscarChamados() {
    const inicio = new Date();
    const token = localStorage.getItem('token');
    axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    axios.get(`http://localhost:5000/chamadosAte`)
      .then(res => {
        console.log(res);
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
            hora: inicio,
            fim: c.final
          }                
        })
        console.log(chamados);
        setChamados(chamados);
      });
  }

  useEffect(() => {
    buscarChamados();
  }, []);

  const link = ["/", "/", "/cadastroUser"]; // Link para as páginas
  const link_title = ["Relatórios", "Chamadas em Aberto", "Cadastrar Usuário"]; // titulo para as paginas

  return (
    <div>
      <Header
        link_0={link[0]} 
        link_1={link[1]}
        link_2={link[2]}
        link_title_0={link_title[0]} 
        link_title_1={link_title[1]}
        link_title_2={link_title[2]}
      />
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