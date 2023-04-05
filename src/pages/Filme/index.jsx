import "./filme.css"

import { useState, useEffect } from "react"
import { useParams, useNavigate } from "react-router-dom"

import api from "../../services/api"

import { toast } from "react-toastify"

function Filme() {

    const { id } = useParams()
    const [filme, setFilme] = useState({})
    const [loading, setLoading] = useState(true)
    const navigate = useNavigate()
    
    useEffect(() => {
        async function loadFilme() {
            await api.get(`/movie/${id}`, {
                params: {
                    api_key: "b677b6ea5e02d15416587c22edf1c24d",
                    language: "pt-BR",
                }
            })
            .then((response) => {
                console.log(response.data)
                setFilme(response.data)
                setLoading(false)
            })
            .catch(() => {
                console.log("ops aconteceu algum erro na requisição")
                navigate("/" , { replace: true })
            })
        }

        loadFilme()

    },[])

    
        if(loading) {
            return(
                <div className="loading">
                    <h3>Carregando os detalhes do filme...</h3>
                </div>
            )
        }

        function salvarFilme() {
            const minhaLista = localStorage.getItem("@primeflix")
            console.log(minhaLista)

            let filmesSalvos = JSON.parse(minhaLista) || []
            console.log(minhaLista)

            const hasFilmes = filmesSalvos.some((filmesSalvo) => filmesSalvo.id === filme.id)
            console.log(hasFilmes)

            if(hasFilmes) {
                toast.warn("Esse filme já está na lista")
                return
            }

            filmesSalvos.push(filme)
            localStorage.setItem("@primeflix", JSON.stringify(filmesSalvos))
            toast.success("Filme foi salvo com sucesso")
        }

    return(
        <div className="box-detalhes-filme">
            <h1>{filme.title}</h1>
            <img src={`https://image.tmdb.org/t/p/original/${filme.backdrop_path}`} alt={filme.title} />
            <div className="box-itens">
                <h3>Sinopse:</h3>
                <br />
                <p>{filme.overview}</p>
                <br />
                <p><strong>Data de lançamento: </strong>{filme.release_date}</p>
                <br />
                <p><strong>Total de avaliações: </strong>{filme.vote_count}</p>
                <br />
                <p><strong>Avaliação: {filme.vote_average} / 10 </strong></p>
                <br />
                <span><button onClick={salvarFilme}><strong>Adicionar aos favoritos</strong></button>
                <button>
                    <strong><a target="blank" href={`https://www.youtube.com/results?search_query=${filme.title} trailer`}>Ver o trailer</a></strong>
                </button></span>
            </div>
        </div>
    )
}

export default Filme