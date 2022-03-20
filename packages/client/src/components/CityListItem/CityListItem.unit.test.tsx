import { BrowserRouter } from 'react-router-dom'
import { render } from '../../test-utils'
import { screen } from '@testing-library/react'
import { CityListItem } from './'

const mockSetReload = jest.fn
const fakeCity = {
  country: 'United Kingdom',
  id: 1,
  name: 'London',
  visited: false,
  wishlist: false,
}

describe('<CityListItem /> component', () => {
  it('renders the CityListItem component', () => {
    render(
      <BrowserRouter>
        <CityListItem city={fakeCity} setReload={mockSetReload} />
      </BrowserRouter>
    )
    const CityName = screen.getByText(/^London - United Kingdom$/i)
    expect(CityName).toBeInTheDocument()
  })
})
