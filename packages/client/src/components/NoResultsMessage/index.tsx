import type { FC } from 'react'
import { Flex, Text, Center } from '@chakra-ui/react'

export const NoResultsMessage: FC = () => {
  return (
    <Flex>
      <Center flex="1" h="20">
        <Text fontWeight="bold" fontSize="xl">
          There are no results that match your query.
        </Text>
      </Center>
    </Flex>
  )
}
