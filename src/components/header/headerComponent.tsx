import "./style.css"

export default function Header() {
    return (
        <header>
            <div id="navBar" className="menu">
                <ul id="navText">
                    <li>
                        <a href="">pedro augusto</a>
                    </li>
                    <li>
                        <a href="">pedro augusto</a>
                    </li>
                    <li>
                        <a href="">pedro augusto</a>
                    </li>
                </ul>
                <div className="exit">
                    <a href="#">Sair</a>
                </div>
            </div>

            <div className="logotype">
                <a href="/">Callnet</a>
            </div>
        </header>
    );
}