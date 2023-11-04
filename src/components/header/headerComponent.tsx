import { redirectUser } from "../login/login";
import "./style.css"
import jwt from 'jsonwebtoken';
import { useState } from "react";


export default function Header(props: any, navigate: any) {
    const [active, setMode] = useState(false);
    const ToggleMode = () => {
        setMode(!active)
    }

    const link = [props.link_0, props.link_1, props.link_2, props.link_3, props.link_4, props.link_5, props.link_6, props.link_7, props.link_8, props.link_9]

    return (
        <header id="navbar">
            <div className={active ? "menu menuOpen" : "menu menuClose"}>
                <ul id="navText">
                    <hr />
                    <li><a href={link[0]}>{props.link_title_0}</a></li>
                    <li><a href={link[1]}>{props.link_title_1}</a></li>
                    <li><a href={link[2]}>{props.link_title_2}</a></li>
                    <li><a href={link[3]}>{props.link_title_3}</a></li>
                    <li><a href={link[4]}>{props.link_title_4}</a></li>
                    <li><a href={link[5]}>{props.link_title_5}</a></li>
                    <li><a href={link[6]}>{props.link_title_6}</a></li>
                    <li><a href={link[7]}>{props.link_title_7}</a></li>
                    <li><a href={link[8]}>{props.link_title_8}</a></li>
                    <li><a href={link[9]}>{props.link_title_9}</a></li>
                </ul>
                <div className="exit">
                    <a href="/login">Sair</a>
                </div>
            </div>

            <div className="logotype">
                <div className={active ? "icon iconActive" : "icon"} onClick={ToggleMode}>
                    <div className="hamburguer hamburguerIcon"></div>
                </div>
                <p>Callnet</p>
            </div>
        </header>
    );
}