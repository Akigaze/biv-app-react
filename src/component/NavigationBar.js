import React, {Component} from "react";
import {connect} from 'react-redux';
import {bindActionCreators} from "redux";
import classNames from "classnames";
import {Nav, NavItem, NavLink} from "reactstrap";

import {VIEW_IDS, VIEW_NAME} from "../constant/views";
import {changeActiveView} from "../action/app";
import "../style/navigator.css";

export class NavigationBar extends Component {
  constructor(props) {
    super(props);
  }

  toggle = (view) => {
    this.props.actions.changeActiveView(view)
  };

  render() {
    const {activeView} = this.props;
    const {upload, search, statistics} = VIEW_IDS;
    return (
      <div>
        <Nav tabs>
          <ViewTab viewId={upload} activeView={activeView} toggle={this.toggle}/>
          <ViewTab viewId={search} activeView={activeView} toggle={this.toggle}/>
          <ViewTab viewId={statistics} activeView={activeView} toggle={this.toggle}/>
        </Nav>
      </div>
    )
  }
}

const ViewTab = ({viewId, activeView, toggle}) => {
  const classSheet = classNames("biv-nav-tab", { active: activeView === viewId });

  return (
    <NavItem>
      <NavLink className={classSheet} onClick={() => { toggle(viewId); }}>
        {VIEW_NAME[viewId]}
      </NavLink>
    </NavItem>
  )
};

function mapStateToProps(state){
  return {
    activeView: state.app.currentView
  }
}

function mapDispatchToProps(dispatch){
  return {
    actions: bindActionCreators({
      changeActiveView
    }, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(NavigationBar)
