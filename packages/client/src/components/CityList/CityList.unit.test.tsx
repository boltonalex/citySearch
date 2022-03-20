import { BrowserRouter } from 'react-router-dom'
import { screen } from '@testing-library/react'
import { render } from '../../test-utils'
import { CityList } from './'

const mockSetReload = jest.fn

describe('<CityList /> component', () => {
  it('renders the CityList component', () => {
    const searchParam = 'London'
    const cityList = [
      {
        country: 'United Kingdom',
        id: 1,
        name: 'London',
        visited: false,
        wishlist: false,
      },
    ]
    render(
      <BrowserRouter>
        <CityList cityList={cityList} setReload={mockSetReload} searchParam={searchParam} />
      </BrowserRouter>
    )
    const CityName = screen.getByText(/^London - United Kingdom$/i)
    expect(CityName).toBeInTheDocument()
  })
  it('renders the CityList component with loading message', () => {
    const searchParam = 'London'
    const cityList: ICity[] | undefined = undefined

    render(
      <BrowserRouter>
        <CityList cityList={cityList} setReload={mockSetReload} searchParam={searchParam} />
      </BrowserRouter>
    )
    const LoadingMessage = screen.getByText(/^Loading...$/i)
    expect(LoadingMessage).toBeInTheDocument()
  })

  it('renders the CityList component with the message for no results', () => {
    const searchParam = 'London'
    const cityList: ICity[] | undefined = []
    render(
      <BrowserRouter>
        <CityList cityList={cityList} setReload={mockSetReload} searchParam={searchParam} />
      </BrowserRouter>
    )
    const NoResultsMessage = screen.getByText(/^There are no results that match your query.$/i)
    expect(NoResultsMessage).toBeInTheDocument()
  })
})
