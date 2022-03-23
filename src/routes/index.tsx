import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useRoutes, useLocation } from 'react-router-dom';
import CoreLayout from '../common/layouts/CoreLayout';
import { loginAction } from '../redux/actions/auth-actions';
import { loggedSelector, tokenSelector } from '../redux/selectors/auth-selectors';
import routes from './routes';

export default function Routes() {
  const dispatch = useDispatch();
  const hash = useLocation().hash;

  const logged = useSelector(loggedSelector)
  const token = useSelector(tokenSelector)

  useEffect(() => {
    if (hash.startsWith("#access_token=")) {
      dispatch(loginAction({ token: hash.substring(14) }))
    }
  }, [dispatch, hash])

  const element = useRoutes(routes(token))

  // Here you'd return an array of routes
  return logged ? <CoreLayout>{element}</CoreLayout> : <>{element}</>
}
