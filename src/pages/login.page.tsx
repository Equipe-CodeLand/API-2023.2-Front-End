import "../static/styles/login.css"
import logo from "../static/images/logo.svg"

export default function Login(){
    return(
        <div id="login">
            <div className="logo">
                <img src={logo} alt="Logo" />
                <h1 id="textLogo">Callnet</h1>
            </div>
            <form action="" className="login">
                <div className="loginPassword">
                    <input type="text" id="inputLogin" className="inputLogin" placeholder="Usuário" />
                    <input type="password" id="inputPassword" className="inputPassword input" placeholder="Senha"/>
                </div>
                <div className="button">
                    <input type="button" id="inputButton" value="Entrar" />
                </div>
            </form>
        </div>
    )
}