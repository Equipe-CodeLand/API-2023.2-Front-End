import ChamadoComponent from "../components/chamado/chamadoComponent"
import Chamado from "../components/chamado/chamado.interface"
import Header from "../components/header/headerComponent"
import axios from "axios";
import { useEffect, useState } from "react";

function ChamadosPage() {

    const [chamados, setChamados] = useState<Chamado[]>([]);

    function buscarChamados() {
        axios.get(`http://localhost:5000/chamados`)
            .then(res => {
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
                        email: c.cliente.usuario.email,
                        hora: new Date(c.inicio).toLocaleDateString() + " - " + new Date(c.inicio).toLocaleTimeString(),
                        fim: c.final,
                        descricao: c.desc
                    }                
                })
                setChamados(chamados);
            });
    }
    
    useEffect(() => {
        buscarChamados();
        }, []);

    let list = chamados.map(chamado => {
            return <ChamadoComponent
                id={chamado.id}
                nome={chamado.nome}
                tema={chamado.tema}
                status={chamado.status}
                hora={chamado.hora}
                email={chamado.email}
                descricao={chamado.descricao}
                tipoUsuario={'ADMIN'}
            ></ChamadoComponent>
    })

    const link = ["/", "/", "/chamados"] // Link para as páginas
    const link_title = ["Iniciar Chamado", "Problemas Comuns", "Meus Chamados"] // titulo para as paginas

    return(
        <div>
            <Header 
                link_0 = {link[0]} // Link para as páginas
                link_1 = {link[1]}
                link_2 = {link[2]}
                link_title_0 = {link_title[0]} // titulo para as paginas
                link_title_1 = {link_title[1]}
                link_title_2 = {link_title[2]}
            />
            {list}
        </div>
    )
}

export default ChamadosPage