import { Component } from 'react';
import DiscoverBlock from './DiscoverBlock/components/DiscoverBlock';
import { NewReleaseItem, NewReleases } from '../../../types/objects/new-releases';
import { FeaturedPlaylistItem, FeaturedPlaylists } from '../../../types/objects/featured-playlists';
import { CategoriesObject, CategoryItem } from '../../../types/objects/categories';

import '../styles/_discover.scss';
import { connect } from 'react-redux';
import { getCategories, getFeaturedPlaylists, getNewReleases } from '../../../redux/actions/homepage-actions';
import { ApiCallback } from '../../../types/service-types';

//TODO: Fix `any` types here

interface IDiscoverProps {
  getNewReleases: (payload: ApiCallback<NewReleases>) => void;
  getFeaturedPlaylists: (payload: ApiCallback<FeaturedPlaylists>) => void;
  getCategories: (payload: ApiCallback<CategoriesObject>) => void
}

interface IDiscoverState {
  newReleases: Array<NewReleaseItem>;
  playlists: Array<FeaturedPlaylistItem>;
  categories: Array<CategoryItem>;
}

class Discover extends Component<IDiscoverProps, IDiscoverState> {
  constructor(props: IDiscoverProps) {
    super(props);

    this.state = {
      newReleases: [],
      playlists: [],
      categories: []
    };
  }

  //TODO: Handle APIs

  componentDidMount() {
    this.props.getNewReleases({
      onSuccess: (payload) => this.setState({ ...this.state, newReleases: payload?.albums?.items || [] }),
      onError: console.log
    })
    this.props.getFeaturedPlaylists({
      onSuccess: (payload) => this.setState({ ...this.state, playlists: payload?.playlists.items || [] }),
      onError: console.log
    })
    this.props.getCategories({
      onSuccess: (payload) => this.setState({ ...this.state, categories: payload?.categories.items || [] }),
      onError: console.log
    })
  }

  render() {
    const { newReleases, playlists, categories } = this.state;

    return (
      <div className="discover">
        <DiscoverBlock<NewReleaseItem> text="RELEASED THIS WEEK" id="released" data={newReleases} />
        <DiscoverBlock<FeaturedPlaylistItem> text="FEATURED PLAYLISTS" id="featured" data={playlists} />
        <DiscoverBlock<CategoryItem> text="BROWSE" id="browse" data={categories} imagesKey="icons" />
      </div>
    );
  }
}

const mapStateToProps = () => ({})

const mapDispatchToProps = {
  getNewReleases,
  getFeaturedPlaylists,
  getCategories
}

const connectToStore = connect(mapStateToProps, mapDispatchToProps)

export default connectToStore(Discover)