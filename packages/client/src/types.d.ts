declare interface ICity {
  country: string
  id: number
  name: string
  visited: boolean
  wishlist: boolean
}

declare interface ICitiesResult {
  cities: ICity[] | []
  total: number
}
