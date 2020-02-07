import React from 'react'
import classes from './Layout.module.css'
import MenuToggle from "../../components/Navigation/MenuToggle/MenuToggle"
import Drawer from "../../components/Navigation/Drawer/Drawer"

class Layout extends React.Component {

  state = {
    menu: false
  }

  onToggleMenuHandler = () => {
    this.setState({
      menu: !this.state.menu
    })
  }

  onMenuCloseHandler = () => {
    this.setState({
      menu: false
    })
  }

  render() {
    return (
      <div className={classes.Layout}>
        <Drawer
          isOpen={this.state.menu}
          onClose={this.onMenuCloseHandler}
        />
        <MenuToggle
          onToggle={this.onToggleMenuHandler}
          isOpen={this.state.menu}
        />
        <main>
          {this.props.children}
        </main>
      </div>
    )
  }
}

export default Layout