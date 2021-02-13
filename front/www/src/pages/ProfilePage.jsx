import React from 'react';
import { Profile } from '../components/Profile/Profile';
import { ProfileData } from '../components/Profile/Subsections/ProfileData';
import { ProfilePass } from '../components/Profile/Subsections/ProfilePass';
import { ProfileContainer } from '../components/Profile/Subsections/ProfileContainer';
import { ProfileBookings } from '../components/Profile/Subsections/ProfileBookings';

export const ProfilePage = ({ control, profile }) => {
  const { profile_data, profile_pass, profile_bookings } = profile;
  const { dispatch } = control;
  return (
    <>
      {profile_data === true && (
        <ProfileContainer props={[{ profile_data: profile_data }, dispatch]}>
          {<ProfileData {...profile} {...control} />}
        </ProfileContainer>
      )}
      {profile_pass === true && (
        <ProfileContainer props={[{ profile_pass: profile_pass }, dispatch]}>
          {<ProfilePass {...profile} {...control} />}
        </ProfileContainer>
      )}

      {profile_bookings === true && (
        <ProfileContainer props={[{ profile_bookings: profile_bookings }, dispatch]}>
          {<ProfileBookings {...profile} {...control} />}
        </ProfileContainer>
      )}

      {(profile_data || profile_pass || profile_bookings) !== true && <Profile {...profile} {...control} />}
    </>
  );
};
