import React from 'react'
import { Header } from 'semantic-ui-react'

const Welcome = () => (

    <div className='welcome'>
    <Header
      as='h1'
      content='Welcome!'
      style={{
        fontSize: '4em',
        fontWeight: 'normal',
      }}
    />
  </div>

)

export default Welcome