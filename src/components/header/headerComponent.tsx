import "./style.css"
import { useState } from "react";

export default function Header() {
    const [active, setMode] = useState(false);
    const ToggleMode = () => {
        setMode(!active)
    }
    return (
        <header>
            <div className={active ? "menu menuOpen" : "menu menuClose"}>
                <ul id="navText">
                    <hr />
                    <li>
                        <a href="">Lorem</a>
                    </li>
                    <li>
                        <a href="">Lorem</a>
                    </li>
                    <li>
                        <a href="">Lorem</a>
                    </li>
                </ul>
                <div className="exit">
                    <a href="#">Sair</a>
                </div>
            </div>

            <div className="logotype">
                <div className={active ? "icon iconActive" : "icon"} onClick={ToggleMode}>
                    <div className="hamburguer hamburguerIcon"></div>
                </div>
                <a href="/">Callnet</a>
            </div>
        </header>
    );
}