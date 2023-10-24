import React, { useEffect, useState } from "react";
import axios from "axios";
import Header from "../components/header/headerComponent";
import ChamadoAdmComponent from "../components/chamado/chamadoAdmComponent";
import { ChamadoAdm, ChamadoAdmDetalhes } from "../components/chamado/chamadoAdm.interface";
import ChamadoAdmDropdown from "../components/chamado/chamadoAdmDropdown";

export default function ChamadosAdm() {
  const [chamados, setChamados] = useState<ChamadoAdm[]>([]);

  function buscarChamados() {
    axios.get(`http://localhost:5000/chamados`)
      .then(res => {
        console.log(res);
        let chamados = res.data.map((c: any) => {
          let nomeCliente = c.cliente && c.cliente.usuario && c.cliente.usuario.nome;
          let sobrenomeCliente = c.cliente && c.cliente.usuario && c.cliente.usuario.sobrenome;

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
          {chamados.map(chamado => (
            <div key={'chamado' + chamado.id}>
              <ChamadoAdmComponent
                id={chamado.id}
                nome={chamado.nome}
                tema={chamado.tema}
                status={chamado.status}
                prioridade = {chamado.prioridade}
                hora={new Date(chamado.hora).toLocaleDateString() + " - " + new Date(chamado.hora).toLocaleTimeString()}
                conversa={chamado.conversa ? chamado.conversa : []}
                key={'chamado' + chamado.id}
              />
              {chamado.conversa && chamado.conversa.length > 0 && (
                <ChamadoAdmDropdown open={false} conversa={chamado.conversa} /> 
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}