import React from 'react';
import { Profile } from '../components/Profile/Profile';
import { ProfileData } from '../components/Profile/Subsections/ProfileData';
import { ProfilePass } from '../components/Profile/Subsections/ProfilePass';
import { ProfileContainer } from '../components/Profile/Subsections/ProfileContainer';

export const ProfilePage = ({ control, profile }) => {
  const { profile_data, profile_pass } = profile;
  const { dispatch } = control;
  return (
    <>
      {profile_data === true && (
        <ProfileContainer props={[{ profile_data: profile_data }, dispatch]}>
          {<ProfileData {...profile} {...control} />}
        </ProfileContainer>
      )}
      {profile_pass === true && <ProfilePass {...profile} {...control} />}
      {profile_data === false && profile_pass === false && <Profile {...profile} {...control} />}
    </>
  );
};
