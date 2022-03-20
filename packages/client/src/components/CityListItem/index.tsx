import { Fragment } from 'react'
import { Flex, Divider, Spinner } from '@chakra-ui/react'
import { ToggleSwitch } from '../ToggleSwitch'
import { CityLocation } from '../CityLocation'
export const CityListItem = ({ city, setReload }: ICityListItemView): JSX.Element => {
  if (!city) return <Spinner color="teal" m={8} />

  return (
    <Fragment key={city.id}>
      <Flex>
        <CityLocation city={city} />
        <ToggleSwitch city={city} choice="visited" setReload={setReload} />
        <ToggleSwitch city={city} choice="wishlist" setReload={setReload} />
      </Flex>
      <Divider />
    </Fragment>
  )
}
