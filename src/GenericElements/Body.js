import React from 'react'
import { Container } from 'semantic-ui-react'

const Body = ({ children }) => (
  <Container style={{
    marginTop: '4.1em',
    marginBottom: '3em',
    width: '100%',
    }}>
    {children}
  </Container>
)

export default Body
