import axios from 'axios';
import { useState, useEffect } from 'react';
import './style.css'
import { ChamadoAte, ChamadoAteDetalhes } from './chamadoAte.interface'

function ChamadoAteDropdown(props:any){
    const [dropdownData, setDropdownData] = useState<ChamadoAteDetalhes[] | null>(null);
    
    useEffect(() => {
        if (props.open) {
            axios.post('http://localhost:5000/dropdownChamados', props.detalhes)
                .then(res => {
                    let chamados = res.data.map((c: any) => {
                        let nomeCliente = c.cliente && c.cliente.usuario && c.cliente.usuario.nome;
                        let sobrenomeCliente = c.cliente && c.cliente.usuario && c.cliente.usuario.sobrenome;
                        let emailCliente = c.cliente && c.cliente.usuario && c.cliente.usuario.email;
                        let ultimaMensagem = c.mensagens[c.mensagens.length - 1].texto;
              
                        return {
                          id: c.id,
                          nome: (nomeCliente && sobrenomeCliente) ? nomeCliente + ' ' + sobrenomeCliente : '',
                          email: emailCliente,
                          tema:{
                            id: c.tema.id,
                            texto: c.tema.nome
                          },
                          mensagem:{
                            desc: ultimaMensagem
                          }
                        }                
                      })
                      console.log(chamados);
                    setDropdownData(chamados);
                })
                .catch(error => {
                    console.error(error);
                });
        }
    }, [props.conversa, props.open]);    

    let conversa = dropdownData ? dropdownData : [];
    return (
        <div className='chamado-dropdown'>
        {conversa.map((desc: ChamadoAteDetalhes) => (
            <div className='conteudo'>
                <p className='email-cliente'>{desc.email}</p>
                <h2>{desc.nome}</h2>
                <p className='texto-adm'>{desc.desc}</p>
                <a href={`mailto:${desc.email}`} className='btn'> Iniciar chamado </a>
            </div>
        ))}
    </div>
    );
}

export default ChamadoAteDropdown