import ChamadoComponent from "../components/chamado/chamadoComponent"
import Chamado from "../components/chamado/chamado.interface"
import Header from "../components/header/headerComponent"
import { useEffect, useState } from "react"
import axios from "axios"
import { jwtDecode } from "jwt-decode";
import Token from "../components/login/token.interface"

function MeusChamados() {

    const [chamados, setChamados] = useState<Chamado[]>([])
    let token = jwtDecode<Token>(localStorage.getItem('token'))

    function buscarChamados() {
        axios.get(`http://localhost:5000/atendenteChamados/${token.userId}`)
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
                      hora: new Date(c.inicio).toLocaleDateString() + " - " + new Date(c.inicio).toLocaleTimeString(),
                      fim: c.final
                    }                
                  })
                  setChamados(chamados);
                });
    }

    useEffect(() => {
        buscarChamados()
    }, [])

    const link = ["/home/atendente", "/chamadosAte"] // Link para as páginas
    const link_title = ["Home", "Ver todos os chamados"] // titulo para as paginas

    return(
        <div>
            <Header 
                link_0 = {link[0]} // Link para as páginas
                link_1 = {link[1]}
                link_title_0 = {link_title[0]} // titulo para as paginas
                link_title_1 = {link_title[1]}
            />
            {chamados.length > 0 && (
                <div>
                    {   chamados.filter(chamado => chamado.status.texto !== 'Encerrado')
                        .map(chamado => {
                            console.log(chamado)
                            return <ChamadoComponent
                                id={chamado.id}
                                nome={chamado.nome}
                                tema={chamado.tema}
                                status={chamado.status}
                                prioridade={chamado.prioridade}
                                hora={chamado.hora}
                                email={chamado.email}
                                descricao={chamado.descricao}
                                tipoUsuario={token.cargo}
                                key={'chamado'+chamado.id}
                            ></ChamadoComponent>
                        })
                    }
                </div>
            )}
        </div>
    )
}

export default MeusChamados