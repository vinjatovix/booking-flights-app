import React from 'react';
import { Profile } from '../components/Profile/Profile';
import { ProfileData } from '../components/Profile/ProfileData';

export const ProfilePage = ({ control, profile }) => {
  const { profile_data, profile_pass, profile_bookings, profile_tools } = profile;
  console.log(profile_data);
  return <>{profile_data === true ? <ProfileData /> : <Profile {...control} {...profile} />}</>;
};
