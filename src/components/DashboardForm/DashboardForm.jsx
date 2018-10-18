import React from 'react'
import { Header, Sticky, Accordion } from 'semantic-ui-react'

const DashboardForm = () => (
  <div>
    <div ref={this.handleContextRef}>
      <Sticky>
        <Header as='h3' > Stuck Content</Header>
      </Sticky>
    </div>
    <div style={{ display: 'flex', position: 'relative', justifyContent: 'left' }}>
      <div style={{ top: 50, position: 'absolute', width: '15%' }}>

        <Header as='h2' color='teal' textAlign='center'>
          Requirements
      </Header>

        <Accordion panels={rootPanels} styled />

      </div>
    </div>
  </div>
)

const Level1Content = (
  <div>
    Requirement 1 Description
    </div>
)

const Level2Content = (
  <div>
    Requirement 2 Description
    </div>
)

const rootPanels = [
  { key: 'panel-1', title: 'Requirement 1', content: { content: Level1Content } },
  { key: 'panel-2', title: 'Requirement 2', content: { content: Level2Content } },
]

export default DashboardForm