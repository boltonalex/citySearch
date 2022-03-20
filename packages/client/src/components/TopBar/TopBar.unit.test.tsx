import { BrowserRouter } from 'react-router-dom'
import { screen } from '@testing-library/react'
import { render } from '../../test-utils'
import { TopBar } from './'

describe('<TopBar /> component', () => {
  it('renders the TopBar component', () => {
    render(
      <BrowserRouter>
        <TopBar />
      </BrowserRouter>
    )
    const HomeLink = screen.getByText(/^Home$/i)
    const WishLink = screen.getByText(/^Wish list$/i)
    const VisitedLink = screen.getByText(/^Visited$/i)

    expect(WishLink).toBeInTheDocument()
    expect(HomeLink).toBeInTheDocument()
    expect(VisitedLink).toBeInTheDocument()
  })
})
