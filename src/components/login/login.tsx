import React, { useState } from "react"
import "./login.css"
import logo from "../../static/images/logo.svg"
import LoginInterface from "./login_interface"
import { act } from "react-dom/test-utils"

export default function Login(props:LoginInterface){
    const [tipoUsuario, setTipoUsuario] = useState(props.tipo_usuario || '')
    const [usuario, setUsuario] = useState(props.usuario || '')
    const [senha, setSenha] = useState(props.senha || '')

    const [active, setMode] = useState(true);

    // Função que envia o formulario

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        // adicione aqui o código para enviar para o backend

        console.log(usuario);
        console.log(senha);
        console.log(tipoUsuario);
    }

    // Função que muda o valor do Tipo de Usuario

    const handleTipoUsuario = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const newTipoUsuario = e.target.value;
        setTipoUsuario(newTipoUsuario);
    }

    const handleTipoUsuarioColor = () => {
        if (tipoUsuario != "") {
            setMode(false)
        } else {
            setMode(true)
        }
    }

    // Função que muda o valor do Usuario

    const handleUsuarioChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newUsuario = e.target.value;
        setUsuario(newUsuario);
    }

    // Função que muda o valor da Senha

    const handleSenhaChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newSenha = e.target.value;
        setSenha(newSenha);
    }

    // Renderizando o HTML

    return(
        <div id="login">
            <div className="logo">
                <img src={logo} alt="Logo" />
                <h1 id="textLogo">Callnet</h1>
            </div>
            <form onSubmit={handleSubmit} className="login">
                
                <div className="loginPassword">
                    <input value={usuario} type="text" id="inputLogin" className="inputLogin" placeholder="Usuário" onChange={handleUsuarioChange}/>
                    <input value={senha} type="password" id="inputPassword" className="inputPassword input" placeholder="Senha" onChange={handleSenhaChange}/>
                </div>
                <div className="tipoUsuario">
                    <select className={active ? "inputTipoUsuarioColor inputTipoUsuario browser-default" : "inputTipoUsuario browser-default"} value={tipoUsuario} onChange={handleTipoUsuario} onClick={handleTipoUsuarioColor}>
                        <option value="" className="nullValue">- Selecione uma opção -</option>
                        <option value="cliente">Cliente</option>
                        <option value="tecnico">Técnico</option>
                        <option value="administrador">Administrador</option>
                    </select>
                </div>
                <div className="button">
                    <input type="submit" id="inputButton" value="Entrar" />
                </div>
            </form>
        </div>
    )
}