import React from 'react';
import { useQuery, useMutation } from '@apollo/client';
import { Link, Outlet, useNavigate } from 'react-router-dom';
import query from '../queries/CurrentUser';
import mutation from '../mutations/logout';

export default function Header() {
  const { loading, error, data } = useQuery(query);
  const [logout] = useMutation(mutation, {
    refetchQueries: [{ query }],
  });
  const navigate = useNavigate();

  if (loading) return <div>Loading...</div>;
  if (error) return <p>Error: {error}</p>;

  const onLogout = () => {
    logout().then(() => navigate('/'));
  };

  const { user } = data;
  const renderButtons = user ? (
    <div onClick={onLogout}>
      <li>
        <Link to='/'>Logout</Link>
      </li>
    </div>
  ) : (
    <div>
      <li>
        <Link to='signup'>Sign up</Link>
      </li>
      <li>
        <Link to='login'>Log in</Link>
      </li>
    </div>
  );

  return (
    <div>
      <nav>
        <div className='nav-wrapper'>
          <ul>
            <li>
              <Link to='/'>Home</Link>
            </li>
          </ul>
          <ul className='right'>{renderButtons}</ul>
        </div>
      </nav>
      <Outlet />
    </div>
  );
}
