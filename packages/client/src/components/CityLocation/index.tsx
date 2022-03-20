import { Text, Center } from '@chakra-ui/react'

export const CityLocation = ({ city }: ICityLocationView): JSX.Element => (
  <Center flex="1" h="20">
    <Text fontWeight="bold" fontSize="xl" data-testid="location-name">
      {city.name} - {city.country}
    </Text>
  </Center>
)
