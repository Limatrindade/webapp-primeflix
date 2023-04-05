import { useState, useEffect } from "react"
import api from "../../services/api"
import { Link } from "react-router-dom"

import "./home.css"

function Home(){

    const [filmes, setFilmes] = useState([])

    useEffect(() => {

        async function loadFilmes(){
            const response = await api.get("movie/now_playing", {
                params: {
                    api_key: "b677b6ea5e02d15416587c22edf1c24d",
                    language: "pt-BR",
                    page: 1,
                }
            })

            console.log(response.data.results)
            setFilmes(response.data.results)

        }

        loadFilmes()

    },[])

    return(
        <div className="box-container">
            <div className="box-filmes">
                {filmes.map((filme) => {
                    return(
                        <article key={filme.id} className="box-secaofilmes">
                            <h2>{filme.title}</h2>
                            <img src={`https://image.tmdb.org/t/p/original/${filme.poster_path}`} alt={filme.title} />
                            <Link to={`/filme/${filme.id}`} className="box-link">Acessar</Link>
                        </article>
                    )
                })}
            </div>
        </div>
    )
}

export default Home