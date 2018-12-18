export const getFilms = async () => {
  const url = 'https://api.themoviedb.org/3/discover/movie?api_key=8d54c10134c07bfb8e01ded9e30524be&with_genres=28'
  const response = await fetch(url)
  const movies = await response.json()
}