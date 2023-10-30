import React, { useState } from "react"
import "./login.css"
import logo from "../../static/images/logo.svg"
import LoginInterface from "./login_interface"
import axios from "axios"
import { decodeJWT } from "../../utils/utils"
//import { decodeJWT } from "../../utils/utils"

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

    /* Função para redirecionar após o login
    function redirectUser(tipo:string) {
        switch (tipo) {
            case 'Cliente':
                window.location.href = '/chamados';
                break;
            case 'Atendente':
                window.location.href = '/chamados/Ate';
                break;
            case 'Administrador':
                window.location.href = '/chamados/Adm';
                break;
        
            default:
                break;
        }        
    }*/

    function usuarioExistente(email:string, senha:string) {
        console.log(`Estes são os argumentos passados para o back:${email},${senha}`);
        
        axios.post('http://localhost:5000/login', {
            email: email,
            senha: senha,
        })
        .then(res => {
            const token = res.data.token; 
            //console.log("Token gerado com sucesso");
            //console.log(token);
            

            //Isso aqui tá dando tudo errado
            const decodedToken = decodeJWT(token);
            localStorage.setItem('token', token);

            //redirectUser(decodedToken);

        })
        .catch(error => {
            if (error.response.status === 401) {
                alert('E-mail ou senha incorretos');
                
            } else {
                console.log(error);
                
            }
        });
        /*
        axios.get (`http://localhost:5000/login/${user_email}/${user_senha}/${type}`,).then(res => {
            if (!res.data.validUser) { // se o usuario não for valido
                loginError("Usuário não encontrado")
                return(false)
            } else {
                if (!res.data.validType) { // se o tipo não for valido
                    loginError("Usuário não encontrado")
                    return(false)
                } else {
                    if (!res.data.validPassword) { // se a senha não for valida
                        passwordError("Senha incorreta")
                        return(false)
                    } else { // se tudo estiver certo
                        allSucess()
                        authentificarUser()
                    }
                }
            }
        })*/
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

    /*
    function typeError(mensagem:string) { // função para mostrar erro de tipo
        setErrorLogin(false)
        setErrorPassword(false)
        setErrorType(true)
        setLoginErrorText("")
        setPasswordErrorText("")
        setTypeErrorText(mensagem)
    }*/

    function allSucess() { // função para zerar os erros
        setErrorLogin(false)
        setErrorPassword(false)
        //setErrorType(false)
        setLoginErrorText("")
        setPasswordErrorText("")
        //setTypeErrorText("")
    }

    // Função que envia o formulario

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        
        if (email === "") {
            loginError("Insira um email")
        } else if (senha === "") {
            passwordError("Insira uma senha")
        } 
        /*else if (cargo === "") {
            typeError("Selecione um cargo")
        }*/
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
            <div className="logo">
                <img src={logo} alt="Logo" />
                <h1 id="textLogo">Callnet</h1>
            </div>
            <form onSubmit={handleSubmit} className="login">
                
                <div className="loginPassword">
                    <input value={email} type="email" id="inputLogin" className={errorLogin ? "inputLogin error" : "inputLogin"} placeholder="Email" onChange={handleEmailChange}/>
                    <div className="errorText">{loginErrorText}</div>

                    <input value={senha} type="password" id="inputPassword" className={errorPassword ? "inputPassword error" : "inputPassword"} placeholder="Senha" onChange={handleSenhaChange}/>
                    <div className="errorText">{passwordErrorText}</div>
                </div>
                <div className="button">
                    <input type="submit" id="inputButton" value="Entrar" />
                </div>
            </form>
        </div>
    )
}