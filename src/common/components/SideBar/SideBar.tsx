import React from 'react';
import { connect } from 'react-redux';
import cx from 'classnames';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faHeadphonesAlt,
  faHeart,
  faPlayCircle,
  faSearch, faStream,
} from '@fortawesome/free-solid-svg-icons';
import { IconDefinition } from '@fortawesome/fontawesome-svg-core';
import { ReactComponent as Avatar } from '../../../assets/images/avatar.svg';
import { logoutAction } from '../../../redux/actions/auth-actions';

import './_sidebar.scss';

//TODO: Fix types here

const renderSideBarOption = (link: string, icon: IconDefinition, text: string, { selected }: { selected?: boolean } = {}) => {
  return (
    <div
      className={cx('sidebar__option', { 'sidebar__option--selected': selected })}
    >
      <FontAwesomeIcon icon={icon} />
      <p>{text}</p>
    </div>
  )
}

interface SidebarProps {
  logoutAction: () => void;
}

class SideBar extends React.Component<SidebarProps> {

  render = () => {
    return (
      <div className="sidebar">
        <div className="sidebar__profile">
          <Avatar />
          <p>Bob Smith</p>
        </div>
        <div className="sidebar__options">
          {renderSideBarOption('/', faHeadphonesAlt, 'Discover', { selected: true })}
          {renderSideBarOption('/search', faSearch, 'Search')}
          {renderSideBarOption('/favourites', faHeart, 'Favourites')}
          {renderSideBarOption('/playlists', faPlayCircle, 'Playlists')}
          {renderSideBarOption('/charts', faStream, 'Charts')}
        </div>
        <button onClick={this.props.logoutAction}>LOGOUT</button>
      </div>
    )
  }
}

const mapStateToProps = () => ({})

const mapDispatchToProps = {
  logoutAction
}

const connectToStore = connect(mapStateToProps, mapDispatchToProps)

export default connectToStore(SideBar)