import "./erro.css"

import { Link } from "react-router-dom"

function Erro() {
    return(
        <div className="box-erro">
            <div className="erro">
                <h1>404</h1>
                <h2>Página não encontrada</h2>
                <Link to="/" className="erro-link">Veja todos os filmes!</Link>
            </div>
        </div>
    )
}

export default Erro