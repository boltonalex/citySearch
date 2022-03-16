import React, { useEffect, useState, Fragment } from 'react'
import type { FC } from 'react'
import {
  Container,
  InputRightElement,
  Input,
  Heading,
  InputGroup,
  IconButton,
  VStack,
  Flex,
  Text,
  Center,
  Divider,
  Spinner,
  Switch,
  Tooltip,
} from '@chakra-ui/react'
import { getCities, getCitiesSearch, putCities } from './api/citiesApi'
import { CloseIcon, Search2Icon } from '@chakra-ui/icons'
import { debounce } from 'lodash'
import { NoResultsMessage } from './components/NoResults'

function insertAt(array: ICity[], index: number, ...elementsArray: ICity[]) {
  array.splice(index, 0, ...elementsArray)
}

export const Home: FC = () => {
  const [searchParam, setSearchParam] = useState<string | undefined>()
  const [cityList, setCityList] = useState<ICity[]>()
  const handleChange = (event: { target: { value: string } }) => setSearchParam(event.target.value)

  useEffect(() => {
    const storageSearchParam = localStorage.getItem('searchParam')
    if (!searchParam && storageSearchParam) {
      setSearchParam(storageSearchParam)
    }
    // fetch(`http://localhost:4000/rest/cities`)
    //   .then(response => response.json())
    //   .then(data => setCityList(data.cities))
    getCities().then(response => setCityList(response.cities))
  }, [])

  useEffect(() => {
    if (searchParam) {
      // fetch(`http://localhost:4000/rest/cities?name=${searchParam}`)
      //   .then(response => response.json())
      //   .then(data => setCityList(data.cities))
      getCitiesSearch(searchParam).then(response => setCityList(response.cities))
    }
    if (searchParam === '') {
      // fetch(`http://localhost:4000/rest/cities`)
      // .then(response => response.json())
      // .then(data => setCityList(data.cities))
      getCities().then(response => setCityList(response.cities))
    }
    return () => {
      if (searchParam) {
        localStorage.setItem('searchParam', searchParam)
      }
    }
  }, [searchParam])

  const handleCityCheck = (city: ICity, selection: string) => {
    // fetch(`http://localhost:4000/rest/cities/${city.id}`, {
    //   method: 'PUT',
    //   headers: {
    //     Accept: 'application/json',
    //     'Content-Type': 'application/json',
    //   },
    //   body: JSON.stringify({
    //     visited: choice === 'visited' ? !city.visited : city.visited,
    //     wishlist: choice === 'wishlist' ? !city.wishlist : city.wishlist,
    //   }),
    // })
    //   .then(response => response.json())
    //   .then(data => {
    //     if (cityList) {
    //       const ArrIndex = cityList.findIndex(city => city.id === data.id)
    //       const newArr = cityList.filter(c => c.id !== city.id)
    //       insertAt(newArr, ArrIndex, data)
    //       setCityList(newArr)
    //     }
    //   })
    putCities(city, selection).then(response => {
      if (cityList) {
        const ArrIndex = cityList.findIndex(city => city.id === response.data.id)
        const newArr = cityList.filter(c => c.id !== city.id)
        insertAt(newArr, ArrIndex, response.data)
        setCityList(newArr)
      }
    })
  }

  return (
    <VStack spacing="8">
      <Heading as="h1">Smart traveller</Heading>
      <Container maxW="container.md">
        <InputGroup>
          <Input //
            onChange={debounce(handleChange, 300)}
            placeholder={searchParam ? searchParam : 'Search by city'}
          />
          <InputRightElement
            children={
              <>
                <Tooltip label="Clear search input">
                  <IconButton
                    aria-label="Clear search button"
                    onClick={() => setSearchParam('')}
                    icon={<CloseIcon />}
                  />
                </Tooltip>
                <Tooltip label="Click to search">
                  <IconButton aria-label="Search button" icon={<Search2Icon />} />
                </Tooltip>
              </>
            }
          />
        </InputGroup>
        {/* <SearchTool searchParam /> */}
        {/* TODO: add loading state to api calls, toggle this UI element with that status */}
        {!cityList && searchParam && <Spinner color="teal" m={8} />}
        {cityList && cityList.length === 0 && <NoResultsMessage />}
        {cityList?.map((city: ICity) => (
          <Fragment key={city.id}>
            <Flex>
              <Center flex="1" h="20">
                <Text fontWeight="bold" fontSize="xl">
                  {city.name} - {city.country}
                </Text>
              </Center>
              <Center flex="1" h="20">
                <Text fontWeight="bold" fontSize="xl">
                  visited:
                  <Switch
                    aria-label="visited city toggle button"
                    onChange={() => handleCityCheck(city, 'visited')}
                    isChecked={city.visited}
                    m={3}
                  />
                </Text>
              </Center>
              <Center flex="1" h="20">
                <Text fontWeight="bold" fontSize="xl">
                  wishlist:
                  <Switch
                    aria-label="wishlist city toggle button"
                    onChange={() => handleCityCheck(city, 'wishlist')}
                    isChecked={city.wishlist}
                    m={3}
                  />
                </Text>
              </Center>
            </Flex>
            <Divider />
          </Fragment>
        ))}
      </Container>
    </VStack>
  )
}
