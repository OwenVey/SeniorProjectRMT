import React, { Component } from 'react'
import { Header, Icon, Sticky, Accordion, Button } from 'semantic-ui-react'

const Level1Content = (
  <div>
    Allow users to create branches of a project
  </div>
)

const Level2Content = (
  <div>
    Allow users to merge branches together
  </div>
)

const Level3Content = (
  <div>
    Test the ability to add an item to the accordion/tree.
  </div>
)

const rootPanels = [
  { key: 'panel-1', title: '0048862 - Branch Project', content: { content: Level1Content } },
  { key: 'panel-2', title: '0038535 - Merge Project', content: { content: Level2Content } },
  { key: 'panel-3', title: '0000001 - Test Project', content: { content: Level3Content } },
]

export default class ProjectPage extends Component {
  state = {
    requirementDescription: 'No Requirement Selected',
    activeIndex: -1
  }

  toggleRequirement = (event, itemProps) => {
    const { index } = itemProps
    const { activeIndex } = this.state
    const newIndex = activeIndex === index ? -1 : index
    this.setState({
      activeIndex: newIndex,
      requirementDescription: document.getElementsByClassName('accordion ui styled')[0].childNodes[index * 2 + 1].childNodes[0].innerHTML
    })
    this.render()
  }
  render() {
    const { activeIndex } = this.state
    return (
      <div>
        <div style={{ display: 'flex', position: 'relative', justifyContent: 'center' }}>
          <div style={{ top: 50, position: 'absolute', textAlign: 'center', width: '50%', backgroundColor: '#afd' }}>
            <div ref={this.handleContextRef}>
              <Sticky>
                <Header as='h4' >
                  <div>{this.state.requirementDescription}</div>
                </Header>
              </Sticky>
            </div>
          </div>
        </div>
        <div style={{ display: 'flex', position: 'relative', justifyContent: 'left' }}>
          <div style={{ top: 50, position: 'absolute', width: '15%' }}>
            <Header as='h2' color='teal' textAlign='center'>
              Requirements
        </Header>
            <Accordion activeIndex={activeIndex} panels={rootPanels} onTitleClick={this.toggleRequirement} styled />
          </div>
        </div>
        <div style={{ display: 'flex', position: 'relative', justifyContent: 'right' }}>
          <div style={{ top: 50, right: 0, position: 'absolute' }}>
            <Button.Group>
              <Button size='tiny'>
                <Header as='h6' icon>
                  <Icon name='file alternate outline' />
                  Document View
          </Header>
              </Button>
              <Button size='tiny'>
                <Header as='h6' icon>
                  <Icon name='table' />
                  Expanded View
        </Header>
              </Button>
            </Button.Group>
          </div>
        </div>
        <div style={{ display: 'flex', position: 'relative', justifyContent: 'center' }}>
          <div style={{ top: 80, position: 'absolute', width: '50%', height: 800, backgroundColor: 'lightgrey', }}>
          </div>
        </div>
      </div>
    )
  }
}
