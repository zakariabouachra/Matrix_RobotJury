import SimpleBar from 'simplebar-react'
import Cover from 'components/Cover'
import Main from 'components/Main'
import { theme } from './helpers'
import { ChakraProvider } from '@chakra-ui/react'


import 'simplebar/dist/simplebar.min.css'
import 'assets/Styles/index.css'


export default function ViewProfile() {
 

  return (
    <SimpleBar style={{ maxHeight: '100vh' }}>
      <ChakraProvider theme={theme}>
        <Cover  />
        <Main />
      </ChakraProvider>
    </SimpleBar>
  )
}
