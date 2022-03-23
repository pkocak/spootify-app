import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons';
import DiscoverItem from './DiscoverItem';
import '../styles/_discover-block.scss';

//TODO: Fix types here

const scrollContainer = (id: string, { isNegative }: { isNegative?: boolean } = {}) => {
  return () => {
    const scrollableContainer: HTMLElement = document.getElementById(id) || document.createElement('div');
    const amount = isNegative ? -scrollableContainer.offsetWidth : scrollableContainer.offsetWidth;

    scrollableContainer.scrollLeft = scrollableContainer.scrollLeft + amount;
  };
}

interface IDiscoverBlockProps<Type> {
  text: string;
  id: string;
  data: Type[];
  imagesKey: string;
}

export default class DiscoverBlock<Type> extends React.Component<IDiscoverBlockProps<Type>> {
  static defaultProps = {
    imagesKey: "images"
  }
  render = () => {
    const { text, id, data, imagesKey } = this.props;
    return (
      <div className="discover-block">
        <div className="discover-block__header">
          <h2>{text}</h2>
          <span />
          {
            data.length ? (
              <div className="animate__animated animate__fadeIn">
                <FontAwesomeIcon
                  icon={faChevronLeft}
                  onClick={scrollContainer(id, { isNegative: true })}
                />
                <FontAwesomeIcon
                  icon={faChevronRight}
                  onClick={scrollContainer(id)}
                />
              </div>
            ) : null
          }
        </div>
        <div className="discover-block__row" id={id}>
          {data.map(({ [imagesKey]: images, name }: any) => (
            <DiscoverItem key={name} images={images} name={name} />
          ))}
        </div>
      </div>
    );
  }
}
