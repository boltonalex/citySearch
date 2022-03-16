import axios from 'axios'

export async function getCities(): Promise<ICitiesResult> {
  const url = `http://localhost:4000/rest/cities`
  const response = await axios.get<ICitiesResult>(url)
  return {
    cities: response.data.cities,
    total: response.data.total,
  }
}

export async function getCitiesSearch(searchParam: string): Promise<ICitiesResult> {
  const url = `http://localhost:4000/rest/cities?name=${searchParam}`
  const response = await axios.get<ICitiesResult>(url)
  return {
    cities: response.data.cities,
    total: response.data.total,
  }
}

export async function putCities(city: ICity, selection: string): Promise<any> {
  const url = `http://localhost:4000/rest/cities/${city.id}`
  const choices = {
    visited: selection === 'visited' ? !city.visited : city.visited,
    wishlist: selection === 'wishlist' ? !city.wishlist : city.wishlist,
  }
  return await axios.put<any>(url, choices)
}
