import React from 'react';
import { Profile } from '../components/Profile/Profile';
import { ProfileData } from '../components/Profile/Subsections/ProfileData';
import { ProfilePass } from '../components/Profile/Subsections/ProfilePass';

export const ProfilePage = ({ control, profile }) => {
  const { profile_data, profile_pass } = profile;
  console.log(profile_pass);
  return (
    <>
      {profile_data === true && <ProfileData {...profile} {...control} />}
      {profile_pass === true && <ProfilePass {...profile} {...control} />}
      {(profile_data === false) & (profile_pass === false) && <Profile {...profile} {...control} />}
    </>
  );
};
