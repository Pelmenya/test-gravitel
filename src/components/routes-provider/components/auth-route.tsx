import React from 'react';
import { Navigate } from 'react-router';
import { To } from 'history';
import { RoutePropsType } from '../../../utils/types/route-props-type';
/* import { getProfileState } from '../../../services/redux/selectors/profile';
import { RoutePropsType } from '../../../utils/types/route-props-type';
import { useAppSelector } from '../../../hooks/use-app-selector';
 */
export const AuthRoute = ({ redirect, element }: RoutePropsType): JSX.Element => {
  //const { user } = useAppSelector(getProfileState);

  return !true ? (
    element
  ) : (
    <Navigate to={{ pathname: redirect} as To} />
  );
};
