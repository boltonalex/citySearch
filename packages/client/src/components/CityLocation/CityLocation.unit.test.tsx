import { BrowserRouter } from 'react-router-dom'
import { screen } from '@testing-library/react'
import { render } from '../../test-utils'
import { CityLocation } from './'

const fakeCitiy = {
  id: 1,
  name: 'London',
  country: 'United Kingdom',
  visited: true,
  wishlist: true,
}

describe('<CityLocation /> component', () => {
  it('renders the CityLocation component', () => {
    render(
      <BrowserRouter>
        <CityLocation city={fakeCitiy} />
      </BrowserRouter>
    )
    const CityName = screen.getByText(/^London - United Kingdom$/i)
    expect(CityName).toBeInTheDocument()
  })
})
