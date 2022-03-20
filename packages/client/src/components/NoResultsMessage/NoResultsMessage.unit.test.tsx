import { BrowserRouter } from 'react-router-dom'
import { screen } from '@testing-library/react'
import { render } from '../../test-utils'
import { NoResultsMessage } from './'

describe('<NoResultsMessage /> component', () => {
  it('renders the NoResultsMessage component', () => {
    render(
      <BrowserRouter>
        <NoResultsMessage />
      </BrowserRouter>
    )
    const Message = screen.getByText(/^There are no results that match your query.$/i)

    expect(Message).toBeInTheDocument()
  })
})
