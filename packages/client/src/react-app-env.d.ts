/// <reference types="react-scripts" />
declare interface ICity {
  country: string
  id: number
  name: string
  visited: boolean
  wishlist: boolean
}

declare interface ICitiesResponse {
  cities: ICity[] | []
  total: number
}

declare interface ICityListView {
  cityList: ICity[] | undefined
  searchParam: string | undefined
  setReload: any
}

declare interface ICityListItemView {
  city: ICity
  setReload: any
}

declare interface ISearchToolView {
  cityListEvent: any
  searchParamEvent: any
  reloadEvent: any
}
declare interface IPutCityResponse {
  cityListEvent: any
  searchParamEvent: any
  reloadEvent: any
}

declare interface IHomeView {
  cityList: ICity[]
  searchParam: string
  reloadEvent: any
  setReload: any
}

declare interface IToggleSwitchView {
  city: ICity
  choice: string
  setReload: ICity
}

declare interface ICityLocationView {
  city: ICity
}

declare interface IOptionView {
  option: string
}
