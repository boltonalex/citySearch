import { useEffect, useState } from 'react'

import { InputRightElement, Input, InputGroup, IconButton, Tooltip } from '@chakra-ui/react'
import { getCities, getCitiesSearch } from '../../api/citiesApi'

import { CloseIcon, Search2Icon } from '@chakra-ui/icons'
import { debounce } from 'lodash'

export const SearchTool = ({ cityListEvent, searchParamEvent, reloadEvent }: ISearchToolView): JSX.Element => {
  const [searchParam, setSearchParam] = useState<string | undefined>()

  useEffect(() => {
    const storageSearchParam = localStorage.getItem('searchParam')
    if (!searchParam && storageSearchParam) {
      setSearchParam(storageSearchParam)
    }
    if (!searchParam) {
      getCities().then(response => cityListEvent(response.cities))
    }
  }, [reloadEvent])

  useEffect(() => {
    if (searchParam) {
      getCitiesSearch(searchParam).then(response => cityListEvent(response.cities))
      searchParamEvent(searchParam)
    }
    if (searchParam === '') {
      getCities().then(response => cityListEvent(response.cities))
    }
    return () => {
      if (searchParam || searchParam === '') {
        localStorage.setItem('searchParam', searchParam)
      }
    }
  }, [searchParam, reloadEvent])

  const handleSearch = (event: { target: { value: string } }) => setSearchParam(event.target.value)

  return (
    <InputGroup>
      <Input //
        data-testid="search-input"
        onChange={debounce(handleSearch, 300)}
        placeholder={searchParam || 'Search by city'}
      />
      <InputRightElement
        children={
          <>
            <Tooltip label="Clear search input">
              <IconButton aria-label="Clear search button" onClick={() => setSearchParam('')} icon={<CloseIcon />} />
            </Tooltip>
            <Tooltip label="Click to search">
              <IconButton aria-label="Search button" icon={<Search2Icon />} />
            </Tooltip>
          </>
        }
      />
    </InputGroup>
  )
}
