import { BrowserRouter } from 'react-router-dom'
import { screen } from '@testing-library/react'
import { render, mockLocalStorage } from '../../test-utils'
import { SearchTool } from './'
import userEvent from '@testing-library/user-event'

const cityListEvent = jest.fn
const searchParamEvent = jest.fn
const reloadEvent = jest.fn
const { getItemMock } = mockLocalStorage()

describe('<SearchTool /> component', () => {
  it('renders the SearchTool component with the placeholder text', () => {
    render(
      <BrowserRouter>
        <SearchTool cityListEvent={cityListEvent} searchParamEvent={searchParamEvent} reloadEvent={reloadEvent} />
      </BrowserRouter>
    )
    expect(screen.getByPlaceholderText('Search by city')).toBeInTheDocument()
  })

  it('renders the SearchTool component with search input retrieved from local storage', () => {
    getItemMock.mockReturnValue('london')
    render(
      <BrowserRouter>
        <SearchTool cityListEvent={cityListEvent} searchParamEvent={searchParamEvent} reloadEvent={reloadEvent} />
      </BrowserRouter>
    )
    expect(screen.getByPlaceholderText('london')).toBeInTheDocument()
  })

  it('renders the SearchTool component and allows search input', () => {
    render(
      <BrowserRouter>
        <SearchTool cityListEvent={cityListEvent} searchParamEvent={searchParamEvent} reloadEvent={reloadEvent} />
      </BrowserRouter>
    )

    const inputEl = screen.getByTestId('search-input')
    userEvent.type(inputEl, 'london')
    expect(screen.getByTestId('search-input')).toHaveValue('london')
  })
})
