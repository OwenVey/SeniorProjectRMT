import React, { Component } from "react";
import { Card, Icon } from 'semantic-ui-react'
import { Treebeard, decorators } from "react-treebeard";

const theme = {
  tree: {
    base: {
      listStyle: 'none',
      margin: 0,
      padding: 0,
      fontSize: '14px'
    },
    node: {
      base: {
        position: 'relative'
      },
      link: {
        cursor: 'pointer',
        position: 'relative',
        padding: '0px 5px',
        display: 'block'
      },
      activeLink: {
        background: '#31363F'
      },
      toggle: {
        base: {
          position: 'relative',
          display: 'inline-block',
          verticalAlign: 'top',
          marginLeft: '-5px',
          height: '24px',
          width: '24px'
        },
        wrapper: {
          position: 'absolute',
          top: '50%',
          left: '50%',
          margin: '-12px 0 0 -7px',
          height: '14px'
        },
        height: 7,
        width: 7,
        arrow: {
          strokeWidth: 0
        }
      },
      header: {
        base: {
          display: 'inline-block',
          verticalAlign: 'top',
        },
        connector: {
          width: '2px',
          height: '12px',
          borderLeft: 'solid 2px black',
          borderBottom: 'solid 2px black',
          position: 'absolute',
          top: '0px',
          left: '-21px'
        },
        title: {
          lineHeight: '24px',
          verticalAlign: 'middle',
          display: 'inline'
        }
      },
      subtree: {
        listStyle: 'none',
        paddingLeft: '19px'
      },
      loading: {
        color: '#E2C089'
      }
    }
  }
};

const animations = {
  toggle: ({ node: { toggled } }) => ({
    animation: { rotateZ: toggled ? 90 : 0 },
    duration: 0
  }),
  drawer: (/* props */) => ({
    enter: {
      animation: 'slideDown',
      duration: 0
    },
    leave: {
      animation: 'slideUp',
      duration: 0
    }
  })
};

const modifiedDecorators = Object.assign({}, decorators, {
  Header: (props) => {
    const { style, node } = props;
    let iconName = node.hasOwnProperty('children') ? 'folder' : node.icon;
    return (
      <div style={style.base}>
        <Icon name={iconName} />
        <div style={style.title}>
          {node.name}
        </div>
      </div>
    );
  }
});


const data = {
  name: "Root",
  toggled: true,
  children: [
    {
      name: "Parent",
      children: [{ name: "Child1" }, { name: "Child2" }]
    },
    {
      name: "Loading parent",
      loading: true,
      children: []
    },
    {
      name: "Parent",
      children: [
        {
          name: "Nested Parent",
          children: [{ icon: 'box', name: "Nested Child 1" }, { icon: 'box', name: "Nested Child 2" }]
        }
      ]
    }
  ]
};

class TreeView extends Component {
  constructor(props) {
    super(props);

    this.state = {};
    this.onToggle = this.onToggle.bind(this);
  }

  onToggle(node, toggled) {

    if (this.state.cursor) {
      this.setState({
        active: false,
      })
    }

    node.active = true;

    if (node.children) {
      node.toggled = toggled;
    }

    this.setState({ cursor: node });
  }



  render() {



    return (
      <Card style={{ margin: '100px', padding: '20px' }}>
        <Treebeard style={theme} data={data} onToggle={this.onToggle} decorators={modifiedDecorators} animations={animations} />
      </Card>

    );
  }
}

export default TreeView;
