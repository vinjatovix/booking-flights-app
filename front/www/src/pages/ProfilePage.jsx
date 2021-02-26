import React from 'react';
import { Profile } from '../components/Profile/Profile';
import { ProfileData } from '../components/Profile/Subsections/ProfileData';
import { ProfilePass } from '../components/Profile/Subsections/ProfilePass';
import { ProfileContainer } from '../components/Profile/Subsections/ProfileContainer';
import { ProfileBookings } from '../components/Profile/Subsections/ProfileBookings';

export const ProfilePage = (props) => {
  const { profile_data, profile_pass, profile_bookings, dispatch } = props;
  return (
    <>
    {!(profile_data || profile_pass || profile_bookings) && <Profile {...props} />}
      {profile_data && (
        <ProfileContainer props={[{ profile_data: profile_data }, dispatch]}>
          {<ProfileData {...props} />}
        </ProfileContainer>
      )}
      {profile_pass && (
        <ProfileContainer props={[{ profile_pass: profile_pass }, dispatch]}>
          {<ProfilePass {...props} />}
        </ProfileContainer>
      )}

      {profile_bookings && (
        <ProfileContainer props={[{ profile_bookings: profile_bookings }, dispatch]}>
          {<ProfileBookings {...props} />}
        </ProfileContainer>
      )}

    </>
  );
};
