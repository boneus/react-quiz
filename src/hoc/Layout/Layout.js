import React from 'react'
import classes from './Layout.module.css'
import MenuToggle from "../../components/Navigation/MenuToggle/MenuToggle"

class Layout extends React.Component {

  state = {
    menu: false
  }

  onToggleMenuHandler = () => {
    this.setState({
      menu: !this.state.menu
    })
  }

  render() {
    return (
      <div className={classes.Layout}>
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