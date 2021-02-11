import React from 'react';
import { Profile } from '../components/Profile/Profile';
import { ProfileData } from '../components/Profile/Subsections/ProfileData';

export const ProfilePage = ({ control, profile }) => {
  const { profile_data } = profile;
  console.log(profile_data);
  return (
    <>{profile_data === true ? <ProfileData {...profile} {...control} /> : <Profile {...control} {...profile} />}</>
  );
};
