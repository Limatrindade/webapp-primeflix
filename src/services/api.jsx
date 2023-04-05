// Base da URL:https://api.themoviedb.org/3/
// https://api.themoviedb.org/3/movie/now_playing?api_key=b677b6ea5e02d15416587c22edf1c24d&language=pt-BR


import axios from "axios"

const api = axios.create({
    baseURL: 'https://api.themoviedb.org/3/'
})

export default api