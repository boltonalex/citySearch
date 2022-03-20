import { useState } from 'react'
import type { FC } from 'react'
import { Container, Heading, VStack } from '@chakra-ui/react'
import { CityList } from '../../components/CityList'
import { SearchTool } from '../../components/SearchTool'

export const Home: FC = () => {
  const [searchParam, setSearchParam] = useState<string | undefined>()
  const [cityList, setCityList] = useState<ICity[]>()
  const [reloadEvent, setReloadEvent] = useState<ICity>()

  return (
    <VStack spacing="8">
      <Heading as="h1">Smart traveller</Heading>
      <Container maxW="container.md" data-testid="search-tool">
        <SearchTool
          cityListEvent={(cityList: ICity[]) => setCityList(cityList)}
          searchParamEvent={(searchParam: string) => setSearchParam(searchParam)}
          reloadEvent={reloadEvent}
        />

        <CityList
          cityList={cityList}
          searchParam={searchParam}
          setReload={(setReload: ICity) => setReloadEvent(setReload)}
        />
      </Container>
    </VStack>
  )
}
