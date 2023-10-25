import React, { useEffect, useState } from "react"
import "./login.css"
import logo from "../../static/images/logo.svg"
import LoginInterface from "./login_interface"
import { act } from "react-dom/test-utils"
import axios from "axios"

export default function Login(props:LoginInterface){
    const [tipoUsuario, setTipoUsuario] = useState(props.tipo_usuario || '')
    const [usuario, setUsuario] = useState(props.usuario || '')
    const [senha, setSenha] = useState(props.senha || '')

    const [active, setMode] = useState(true);

    const [errorLogin, setErrorLogin] = useState(false);
    const [errorPassword, setErrorPassword] = useState(false);
    const [errorType, setErrorType] = useState(false)

    var [loginErrorText, setLoginErrorText] = useState("")
    var [passwordErrorText, setPasswordErrorText] = useState("")
    var [typeErrorText, setTypeErrorText] = useState("")

    function authentificarUser() {
        // authentificar usuario
        alert(tipoUsuario)
    }

    function usuarioExistente(type: string, user_email:string, user_senha:string) {
        axios.get (`http://localhost:5000/login/${user_email}/${user_senha}/${type}`,).then(res => {
            console.log(res.data)
            if (!res.data.validUser) {
                loginError("Usuário não encontrado")
            } else {
                if (!res.data.validPassword) {
                    passwordError("Senha incorreta")

                } else {
                    if (!res.data.validType) {
                        loginError("Usuário não encontrado")
                    } else {
                        allSucess()
                        authentificarUser()
                    }
                }
            }
        })
    }

    function loginError(mensagem:string) {
        setErrorLogin(true)
        setErrorPassword(false)
        setErrorType(false)
        setLoginErrorText(mensagem)
        setPasswordErrorText("")
        setTypeErrorText("")
    }

    function passwordError(mensagem:string) {
        setErrorLogin(false)
        setErrorPassword(true)
        setErrorType(false)
        setLoginErrorText("")
        setPasswordErrorText(mensagem)
        setTypeErrorText("")
    }

    function typeError(mensagem:string) {
        setErrorLogin(false)
        setErrorPassword(false)
        setErrorType(true)
        setLoginErrorText("")
        setPasswordErrorText("")
        setTypeErrorText(mensagem)
    }

    function allSucess() {
        setErrorLogin(false)
        setErrorPassword(false)
        setErrorType(false)
        setLoginErrorText("")
        setPasswordErrorText("")
        setTypeErrorText("")
    }

    // Função que envia o formulario

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        // adicione aqui o código para enviar para o backend
        
        if (usuario == "") {
            loginError("Insira um usuário")
        } else if (senha == "") {
            passwordError("Insira uma senha")
        } else if (tipoUsuario == "") {
            typeError("Selecione um tipo de usuário")
        } else {
            allSucess()
            usuarioExistente(tipoUsuario, usuario, senha)
        }
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
                    <input value={usuario} type="email" id="inputLogin" className={errorLogin ? "inputLogin error" : "inputLogin"} placeholder="Usuário" onChange={handleUsuarioChange}/>
                    <div className="errorText">{loginErrorText}</div>

                    <input value={senha} type="password" id="inputPassword" className={errorPassword ? "inputPassword error" : "inputPassword"} placeholder="Senha" onChange={handleSenhaChange}/>
                    <div className="errorText">{passwordErrorText}</div>
                </div>
                <div className="tipoUsuario">
                    <div className={errorType ? "select error" : "select"}>
                        <select className={active ? "inputTipoUsuarioColor inputTipoUsuario browser-default" : "inputTipoUsuario browser-default"} value={tipoUsuario} onChange={handleTipoUsuario} onClick={handleTipoUsuarioColor}>
                            <option value="" className="nullValue">- Selecione uma opção -</option>
                            <option value="cliente">Cliente</option>
                            <option value="atendente">Atendente</option>
                            <option value="administrador">Administrador</option>
                        </select>
                    </div>
                    <div className="errorText">{typeErrorText}</div>
                </div>
                <div className="button">
                    <input type="submit" id="inputButton" value="Entrar" />
                </div>
            </form>
        </div>
    )
}