import React from 'react';
import { GenericList } from './GenericList';
import { InputList } from './InputList';
import { LinkList } from './LinkList';
import { ParagraphList } from './ParagraphList';
import PropTypes from 'prop-types';

export const ListDrawer = ({ type, ...props }) => {
  const renderListDrawer = () => {
    switch (type) {
      case 'inputs':
        return <InputList {...props} />;

      case 'links':
        return <LinkList {...props} />;

      case 'p':
        return <ParagraphList {...props} />;

      default:
        return <GenericList {...props} />;
    }
  };
  return renderListDrawer();
};
ListDrawer.propTypes = {
  type: PropTypes.string,
};
