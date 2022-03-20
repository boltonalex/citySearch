import { useMemo } from 'react'

import { Spinner } from '@chakra-ui/react'
import { NoResultsMessage } from '../NoResultsMessage'
import { CityListItem } from '../CityListItem'

export const CityList = ({ cityList, setReload, searchParam }: ICityListView): JSX.Element => {
  const cityListMemo = useMemo(() => cityList, [cityList])
  return (
    <>
      {!cityListMemo && searchParam && <Spinner color="teal" m={8} />}
      {cityListMemo && cityListMemo.length === 0 && <NoResultsMessage />}
      {cityListMemo?.map((city: ICity) => (
        <CityListItem //
          key={city.id}
          city={city}
          setReload={setReload}
        />
      ))}
    </>
  )
}
