import React from 'react'
import { BrowserRouter } from 'react-router-dom'
import { screen } from '@testing-library/react'
import { render } from '../../test-utils'
import { Home } from './'
import userEvent from '@testing-library/user-event'

describe('<Home /> component with search inputs', () => {
  it.only('renders the Home component and allows search input', () => {
    render(
      <BrowserRouter>
        <Home />
      </BrowserRouter>
    )

    const inputEl = screen.getByTestId('search-input')
    userEvent.type(inputEl, 'london')
    expect(screen.getByTestId('search-input')).toHaveValue('london')
  })
})
