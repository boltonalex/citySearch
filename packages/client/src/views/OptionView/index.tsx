import { Fragment, useEffect, useState, useMemo } from 'react'
import { getCities } from '../../api/citiesApi'
import { ToggleSwitch } from '../../components/ToggleSwitch'
import { CityLocation } from '../../components/CityLocation'
// import { OptionViewItem } from '../../components/OptionViewItem'

import { Container, Heading, Flex, Divider } from '@chakra-ui/react'

export const OptionView = ({ option }: IOptionView): JSX.Element => {
  const [cityList, setCityList] = useState<ICity[]>([])
  const [reload, setReload] = useState<ICity[]>([])

  useEffect(() => {
    setTimeout(() => {
      getCities().then(response => setCityList(response.cities))
    }, 1000)
  }, [reload])

  const cityListMemo = useMemo(() => cityList, [cityList])

  return (
    <>
      <Heading as="h1" data-testid="header-text">
        {option}
      </Heading>
      <Container maxW="container.md">
        {cityListMemo
          /* @ts-expect-error square bracket notation */
          .filter(city => city[option.toLowerCase()])
          .map((city: ICity) => (
            <Fragment key={city.id}>
              <Flex>
                <CityLocation city={city} />
                <ToggleSwitch //
                  city={city}
                  choice={option.toLowerCase()}
                  /* @ts-expect-error square bracket notation */
                  setReload={setReload}
                />
              </Flex>
              <Divider />
            </Fragment>
            // <OptionViewItem city={city} option={option} />
          ))}
      </Container>
    </>
  )
}
