import React from 'react';
import { GenericList } from './GenericList';
import { InputList } from './InputList';
import { LinkList } from './LinkList';
import { ParagraphList } from './ParagraphList';
import PropTypes from 'prop-types';

export const ListDrawer = ({ type, ...props }) => {
  if (type === 'inputs') {
    return <InputList {...props} />;
  }
  if (type === 'links') {
    return <LinkList {...props} />;
  }
  if (type === 'p') {
    return <ParagraphList {...props} />;
  }
  return <GenericList {...props} />;
};
ListDrawer.propTypes = {
  type: PropTypes.string,
};
