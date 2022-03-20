import { Text, Center, Switch } from '@chakra-ui/react'
import { putCity } from '../../api/citiesApi'

export const ToggleSwitch = ({ city, choice, setReload }: IToggleSwitchView): JSX.Element => {
  const handleCityCheck = (city: ICity, selection: string) => {
    if (city) {
      /* @ts-expect-error square bracket notation */
      putCity(city, selection).then(response => setReload(response.data))
    }
  }
  return (
    <Center flex="1" h="20">
      <Text fontWeight="bold" fontSize="xl">
        {choice}:
        <Switch
          aria-label={`${choice} city toggle button`}
          onChange={() => handleCityCheck(city, choice)}
          /* @ts-expect-error square bracket notation */
          isChecked={city[choice]}
          m={3}
        />
      </Text>
    </Center>
  )
}
