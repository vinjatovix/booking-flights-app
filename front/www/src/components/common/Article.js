import React from 'react';
import './article.css';

export const Article = ({ className, title, children }) => {
  return (
    <article className={className}>
      <h2>{title}</h2>
      {children}
    </article>
  );
};
