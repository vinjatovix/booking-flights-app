import React from 'react';
import { Profile } from '../components/Profile/Profile';

export const ProfilePage = (controlProps) => {
  console.log(controlProps);
  const { profile } = controlProps;
  console.log(profile);
  return <Profile {...controlProps} />;
};
