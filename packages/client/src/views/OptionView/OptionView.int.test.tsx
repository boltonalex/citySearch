import { BrowserRouter } from 'react-router-dom'
import { screen } from '@testing-library/react'
import { render } from '../../test-utils'
import { OptionView } from './'

describe('<OptionView /> component renders', () => {
  it('renders the OptionView component As Visited', () => {
    render(
      <BrowserRouter>
        <OptionView option={'Visited'} />
      </BrowserRouter>
    )
    const titleValue = screen.getByTestId('header-text')
    expect(titleValue).toHaveTextContent('Visited')
  })
})
