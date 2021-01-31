import React from 'react';
import './article.css';

export const Article = ({ className, title, children, ...props }) => {
  return (
    <article className={className} {...props}>
      <h2>{title}</h2>
      {children}
    </article>
  );
};
