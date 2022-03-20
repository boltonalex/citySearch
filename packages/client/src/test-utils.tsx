import * as React from 'react'
import type { RenderOptions } from '@testing-library/react'
import { render } from '@testing-library/react'
import { ChakraProvider, theme } from '@chakra-ui/react'

const AllProviders = ({ children }: { children?: React.ReactNode }) => (
  <ChakraProvider theme={theme}>{children}</ChakraProvider>
)

const customRender = (ui: React.ReactElement, options?: RenderOptions) =>
  render(ui, { wrapper: AllProviders, ...options })

export { customRender as render }

export const mockLocalStorage = () => {
  const setItemMock = jest.fn()
  const getItemMock = jest.fn()

  beforeEach(() => {
    Storage.prototype.setItem = setItemMock
    Storage.prototype.getItem = getItemMock
  })

  afterEach(() => {
    setItemMock.mockRestore()
    getItemMock.mockRestore()
  })

  return { setItemMock, getItemMock }
}
