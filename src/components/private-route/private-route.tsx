import {Navigate} from 'react-router-dom';
import {AppRoute, AuthorizationStatus} from '../../const';
import { useAppSelector } from '../../store';
import { getExpectingAuthStatus } from '../../store/user-process/user-process-selectors';
import LoadingPage from '../../pages/loading-page/loading-page';

type PrivateRouteProps = {
  authorizationStatus: AuthorizationStatus;
  children: JSX.Element;
}

function PrivateRoute({authorizationStatus, children}: PrivateRouteProps) {
  const isExpectingAuthStatus = useAppSelector(getExpectingAuthStatus);

  if (isExpectingAuthStatus) {
    return <LoadingPage />;
  }

  return (
    authorizationStatus === AuthorizationStatus.Auth
      ? children
      : <Navigate to={AppRoute.Login} />
  );
}

export default PrivateRoute;
