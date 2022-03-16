import React, { useEffect, useState, Fragment } from 'react'
import type { FC } from 'react'
import { InputRightElement, Input, InputGroup, IconButton, Tooltip } from '@chakra-ui/react'
import { getCities, getCitiesSearch } from '../api/citiesApi'
import { CloseIcon, Search2Icon } from '@chakra-ui/icons'
import { debounce } from 'lodash'

export const SearchTool: FC = () => {
  const [searchParam, setSearchParam] = useState<string | undefined>()
  const [cityList, setCityList] = useState<ICity[]>()
  const handleChange = (event: { target: { value: string } }) => setSearchParam(event.target.value)

  useEffect(() => {
    const storageSearchParam = localStorage.getItem('searchParam')
    if (!searchParam && storageSearchParam) {
      setSearchParam(storageSearchParam)
    }
    getCities().then(response => setCityList(response.cities))
  }, [])

  useEffect(() => {
    if (searchParam) {
      getCitiesSearch(searchParam).then(response => setCityList(response.cities))
    }
    if (searchParam === '') {
      getCities().then(response => setCityList(response.cities))
    }
    return () => {
      if (searchParam) {
        localStorage.setItem('searchParam', searchParam)
      }
    }
  }, [searchParam])

  return (
    <InputGroup>
      <Input //
        onChange={debounce(handleChange, 300)}
        placeholder={searchParam ? searchParam : 'Search by city'}
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
