import React, { useState } from "react"
import "./login.css"
import logo from "../../static/images/logo.svg"
import LoginInterface from "./login_interface"
import axios from "axios"
import { strict } from "assert"
import { useNavigate } from 'react-router-dom'

export function redirectUser(tipoUser: string, navigate:any) {
  
    switch (tipoUser) {
      case 'Cliente':
        navigate('/home/cliente');
        break;
      case 'Atendente':
        navigate('/home/atendente');
        break;
      case 'Administrador':
        navigate('/home/administrador');
        break;
      default:
        break;
    }
  }

export default function Login(props:LoginInterface){
    const [cargo, setCargo] = useState(props.cargo || '')
    const [email, setEmail] = useState(props.email || '')
    const [senha, setSenha] = useState(props.senha || '')

    const [active, setMode] = useState(true);

    const [errorLogin, setErrorLogin] = useState(false);
    const [errorPassword, setErrorPassword] = useState(false);
    const [errorType, setErrorType] = useState(false)

    var [loginErrorText, setLoginErrorText] = useState("")
    var [passwordErrorText, setPasswordErrorText] = useState("")
    var [typeErrorText, setTypeErrorText] = useState("")

    const navigate = useNavigate()

    function usuarioExistente(email:string, senha:string) {
        
        axios.post('http://localhost:5000/login', {
            email: email,
            senha: senha,
        })
        .then(res => {
            const token = res.data.token; 
            console.log("Token gerado com sucesso", token);            

            localStorage.setItem('token', token);
            axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;

            
            const tipoUser = res.data.tipoUser
            redirectUser(tipoUser, navigate)            
        })
        .catch(error => {
            if (error.response.status === 401) {
                alert('E-mail ou senha incorretos');
            
            } else {
                console.log(error);
                
            }
        });
    }

    function loginError(mensagem:string) { // função para mostrar o erro de login
        setErrorLogin(true)
        setErrorPassword(false)
        setErrorType(false)
        setLoginErrorText(mensagem)
        setPasswordErrorText("")
        setTypeErrorText("")
    }

    function passwordError(mensagem:string) { // função para mostrar erro de senha
        setErrorLogin(false)
        setErrorPassword(true)
        setErrorType(false)
        setLoginErrorText("")
        setPasswordErrorText(mensagem)
        setTypeErrorText("")
    }

    function allSucess() { // função para zerar os erros
        setErrorLogin(false)
        setErrorPassword(false)
        setLoginErrorText("")
        setPasswordErrorText("")
    }

    // Função que envia o formulario

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        
        if (email === "") {
            loginError("Insira um email")
        } else if (senha === "") {
            passwordError("Insira uma senha")
        }
        else {
            allSucess()
            usuarioExistente(email, senha) // perguntar se o usuario existe
        }
    }

    // Função que muda o valor do Tipo de Usuario

    const handleCargo = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const newCargo = e.target.value;
        setCargo(newCargo);
    }

    const handleCargoColor = () => {
        if (cargo !== "") {
            setMode(false)
        } else {
            setMode(true)
        }
    }

    // Função que muda o valor do Usuario

    const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newEmail = e.target.value;
        setEmail(newEmail);
    }

    // Função que muda o valor da Senha

    const handleSenhaChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newSenha = e.target.value;
        setSenha(newSenha);
    }

    // Renderizando o HTML

    return(
        <div id="login">
            <div className="logo" style={{ marginTop: '80px' }}>
                <></>
                <img src={logo} alt="Logo"  />
                <h1 id="textLogo">Callnet</h1>
            </div>
            <form onSubmit={handleSubmit} className="login">
                
                <div className="loginPassword">
                    <input value={email} type="email" id="inputLogin" className={errorLogin ? "inputLogin error" : "inputLogin"} placeholder="Email" onChange={handleEmailChange}/>
                    <div className="errorText">{loginErrorText}</div>

                    <input value={senha} type="password" id="inputPassword" className={errorPassword ? "inputPassword error" : "inputPassword"} placeholder="Senha" onChange={handleSenhaChange}/>
                    <div className="errorText errorPassword">{passwordErrorText}</div>
                </div>
                <div className="links">
                    <a href="#"></a>
                    <a href="/cadastroCliente">Ainda não tem conta?</a>
                </div>
                <div className="button">
                    <input type="submit" id="inputButton" value="Entrar" />
                </div>
            </form>
        </div>
    )
}