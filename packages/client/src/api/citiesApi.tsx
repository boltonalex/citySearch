import axios from 'axios'

export async function getCities(): Promise<ICitiesResponse> {
  const url = `http://localhost:4000/rest/cities`
  const response = await axios.get<ICitiesResponse>(url)
  return {
    cities: response.data.cities,
    total: response.data.total,
  }
}

export async function getCitiesSearch(searchParam: string): Promise<ICitiesResponse> {
  const url = `http://localhost:4000/rest/cities?name=${searchParam}`
  const response = await axios.get<ICitiesResponse>(url)
  return {
    cities: response.data.cities,
    total: response.data.total,
  }
}

export async function putCity(city: ICity, selection: string): Promise<unknown> {
  const url = `http://localhost:4000/rest/cities/${city.id}`
  const body = {
    visited: selection === 'visited' ? !city.visited : city.visited,
    wishlist: selection === 'wishlist' ? !city.wishlist : city.wishlist,
  }
  return await axios.put(url, body)
}
