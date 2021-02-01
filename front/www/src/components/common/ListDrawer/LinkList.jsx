import React from 'react';
import { ListItem } from './ListItem';
import { v4 as uuidv4 } from 'uuid';
import PropTypes from 'prop-types';

export const LinkList = ({ cssClassName, title, items }) => {
  return (
    <>
      <h3>{title}</h3>
      <ul className={cssClassName}>
        {items.map((item) => {
          return (
            <ListItem key={`a${uuidv4()}}`} name={item.name}>
              <a href={item.url} children={item.linkText || item.children} />
            </ListItem>
          );
        })}
      </ul>
    </>
  );
};
LinkList.propTypes = {
  cssClassName: PropTypes.string,
  title: PropTypes.string,
  items: PropTypes.array.isRequired,
};
