import React from 'react';
import { Article } from '../components/common/Article';
import { CredentialsForm } from '../components/Credentials/CredentialsForm';

export const CredentialsPage = (props) => {
  return (
    <section>
      <Article title={props.title}>
        <CredentialsForm {...props} />
      </Article>
    </section>
  );
};
