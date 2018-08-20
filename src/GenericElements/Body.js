import React from 'react'
import { Container } from 'semantic-ui-react'
import "./GenericCSS.css"

const Body = ({ children }) => (
  <Container className="body">
    {children}
  </Container>
)

export default Body
