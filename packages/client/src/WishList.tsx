import React, { useEffect, useState, Fragment } from 'react'

import type { FC } from 'react'
import { Container, Heading, Flex, Text, Center, Switch, Divider } from '@chakra-ui/react'

interface ICity {
  country: string
  id: number
  name: string
  visited: boolean
  wishlist: boolean
}
function insertAt(array: ICity[], index: number, ...elementsArray: ICity[]) {
  array.splice(index, 0, ...elementsArray)
}
export const WishList: FC = () => {
  const [cityList, setCityList] = useState<ICity[]>([])
  useEffect(() => {
    fetch(`http://localhost:4000/rest/cities`)
      .then(response => response.json())
      .then(data => setCityList(data.cities))
  }, [])
  const handleCityCheck = (city: ICity, checkboxChoice: string) => {
    fetch(`http://localhost:4000/rest/cities/${city.id}`, {
      method: 'PUT',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        visited: checkboxChoice === 'visited' ? !city.visited : city.visited,
        wishlist: checkboxChoice === 'wishlist' ? !city.wishlist : city.wishlist,
      }),
    })
      .then(response => response.json())
      .then(data => {
        if (cityList) {
          const ArrIndex = cityList.findIndex(city => city.id === data.id)
          const newArr = cityList.filter(c => c.id !== city.id)
          insertAt(newArr, ArrIndex, data)
          setCityList(newArr)
        }
      })
  }

  if (cityList.length === 0) return null
  return (
    <>
      <Heading as="h1">Wish list</Heading>
      <Container maxW="container.md">
        {cityList
          .filter(city => city.wishlist)
          .map((city: ICity) => (
            <Fragment key={city.id}>
              <Flex>
                <Center flex="1" h="20">
                  <Text fontWeight="bold" fontSize="xl">
                    {city.name} - {city.country}
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
    </>
  )
}
