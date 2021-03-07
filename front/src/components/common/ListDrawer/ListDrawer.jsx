import React from 'react';
import PropTypes from 'prop-types';

import { GenericList } from './GenericList';
import { InputList } from './InputList';
import { LinkList } from './LinkList';
import { ParagraphList } from './ParagraphList';

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
