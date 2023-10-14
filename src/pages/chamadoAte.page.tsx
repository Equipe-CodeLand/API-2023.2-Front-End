import ChamadoComponent from "../components/chamado/chamadoComponent"
import Chamado from "../components/chamado/chamado.interface"
import Header from "../components/header/headerComponent"
import { useEffect, useState } from "react"
import axios from "axios"

function ChamadosAte() {
    const [chamados, setChamados] = useState<Chamado[]>([])


    function buscarChamados() {
        axios.get(`http://localhost:5000/ChamadosAtendente`,)
            .then(res => {
                let chamados = res.data.map((c: any) => {
                    return {
                        id: c.cha_id,
                        nome: c.user_nome + ' ' + c.user_sobrenome,
                        tema: c.cha_tema,
                        status: {
                            id: c.sta_id,
                            texto: c.sta_nome
                        },
                        hora: c.cha_inicio,
                        email: c.user_email,
                        descricao: c.cha_desc,
                        conversa: [],
                    }
                })
                setChamados(chamados)
            })
    }

    useEffect(() => {
        buscarChamados()
    }, [])

    const link = ["/", "/", "/chamados"] // Link para as páginas
    const link_title = ["Iniciar Chamado", "Problemas Comuns", "Meus Chamados"] // titulo para as paginas

    return (
        <div>
            <Header
                link_0={link[0]} // Link para as páginas
                link_1={link[1]}
                link_2={link[2]}
                link_title_0={link_title[0]} // titulo para as paginas
                link_title_1={link_title[1]}
                link_title_2={link_title[2]}
            />
            {chamados.length > 0 && (
                <div>
                    {chamados.filter(chamado => chamado.status.texto !== 'Encerrado')
                        .map(chamado => {
                            console.log(chamado)
                            return <ChamadoComponent
                                id={chamado.id}
                                nome={chamado.nome}
                                tema={chamado.tema}
                                status={chamado.status}
                                hora={new Date(chamado.hora).toLocaleDateString() + " - " + new Date(chamado.hora).toLocaleTimeString()}
                                email={chamado.email}
                                conversa={chamado.conversa}
                                descricao={chamado.descricao}
                                key={'chamado' + chamado.id}
                            ></ChamadoComponent>
                        })
                    }
                </div>
            )}
        </div>
    )
}

export default ChamadosAte