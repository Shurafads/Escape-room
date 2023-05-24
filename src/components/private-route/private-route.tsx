import { Navigate, Outlet } from 'react-router-dom';
import { AppRoute, AuthorizationStatus } from '../../const';
import { useAppSelector } from '../../store';
import { getAuthorizationStatus, getExpectingAuthorizationStatus } from '../../store/user-process/user-process-selectors';
import LoadingPage from '../../pages/loading-page/loading-page';

function PrivateRoute() {
  const isExpectingAuthorizationStatus = useAppSelector(getExpectingAuthorizationStatus);
  const authorizationStatus = useAppSelector(getAuthorizationStatus);

  if (isExpectingAuthorizationStatus) {
    return <LoadingPage />;
  }

  if ((authorizationStatus !== AuthorizationStatus.Auth)) {
    return <Navigate to={AppRoute.Login} />;
  }

  return <Outlet />;
}

export default PrivateRoute;
