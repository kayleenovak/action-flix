

export const getFavorites = async (userId = 1) => {
  const url = `http://localhost:3000/api/users/${userId}/favorites`
    try {
      const response = await fetch(url)
      const data = await response.json()
      return data.data
    } catch (error) {
    }
  }