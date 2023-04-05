import "./favoritos.css"
import { Link } from "react-router-dom"
import { useState, useEffect } from "react"
import { toast } from "react-toastify"

function Favoritos() {

    const [filmes, setFilmes] = useState([])

    useEffect(() => {

        const minhaLista = localStorage.getItem("@primeflix")
        setFilmes(JSON.parse(minhaLista) || [])

    },[])

    function excluirFilme(id) {
        toast.success("Filme removido com sucesso")
        let filtrandoFilmes = filmes.filter((filme) => {
            return (filme.id !== id)
        })

        setFilmes(filtrandoFilmes)
        localStorage.setItem("@primeflix", JSON.stringify(filtrandoFilmes))

    }

    return(
        <div className="box__favoritos">
            <h1>Meus filmes</h1>

            {filmes.length === 0 && <p className="nenhum__filme">Ops!!! Você não adicionou nenhum filme : ( </p>}
                
        
            <ul className="box__lista">
                    {filmes.map((filme) => {
                        return(
                            <li key={filme.id}>
                                <h3>{filme.title}</h3>
                                <div className="box__btns">
                                    <Link className="link" to={`/filme/${filme.id}`}>Ver detalhes</Link>
                                    <button onClick={() => excluirFilme(filme.id)}>Excluir filme</button>
                                </div>
                            </li>
                        )
                    })}
                </ul>
            
        </div>
    )
}

export default Favoritos
