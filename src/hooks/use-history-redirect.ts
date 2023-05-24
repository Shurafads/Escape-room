import { useNavigate } from 'react-router';
import { AppRoute } from '../const';

const REDIRECT_KEY = 'redirect_page';

export const useHistoryRedirect = () => {
  const navigate = useNavigate();

  const saveUrl = (url: string) => {
    localStorage.setItem(REDIRECT_KEY, url);
  };

  const returnUrl = () => {

    const redirectUrl = localStorage.getItem(REDIRECT_KEY);

    if (redirectUrl) {
      navigate(redirectUrl);
      localStorage.removeItem(REDIRECT_KEY);
    } else {
      navigate(AppRoute.Main);
    }
  };

  return { saveUrl, returnUrl };
};
