import React, { useContext, useState } from 'react';
import UserContext from '../context/user';
import { useMutation, useQuery } from '@apollo/client';
import { Link, Outlet, useNavigate } from 'react-router-dom';
import mutation from '../mutations/logout';
import query from '../queries/CurrentUser';
import Spinner from './Spinner';

export default function Header() {
  const [loading, setLoading] = useState(false);
  const [logout] = useMutation(mutation);
  const { refetch } = useQuery(query);
  const navigate = useNavigate();
  const { currentUser, updateCurrentUserInfo } = useContext(UserContext);

  const onLogout = () => {
    setLoading(true);
    logout().then(async () => {
      await refetch();
      updateCurrentUserInfo(null);
      setLoading(false);
      navigate('/login');
    });
  };

  const params = window.location.href.split("/");
  const currentParam = params[params.length - 1] || "/";

  const renderButtons = currentUser ? (
    <div onClick={onLogout}>
      {loading ? (
        <Spinner />
      ) : (
        <li>
          <Link to={currentParam}>Logout</Link>
        </li>
      )}
    </div>
  ) : (
    <div>
      <li>
        <Link to="signup">Sign up</Link>
      </li>
      <li>
        <Link to="login">Log in</Link>
      </li>
    </div>
  );

  return (
    <div>
      <nav>
        <div className="nav-wrapper">
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="dashboard">Dashboard</Link>
            </li>
          </ul>
          <ul className="right">{renderButtons}</ul>
        </div>
      </nav>
      <Outlet />
    </div>
  );
}
