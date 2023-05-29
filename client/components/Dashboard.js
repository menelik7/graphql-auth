import React, { useContext } from 'react';
import UserContext from '../context/user';
import { Link } from 'react-router-dom';

export default function Dashboard() {
  const { currentUser } = useContext(UserContext);

  const renderContent = currentUser ? (
    <p>
      Welcome
      <span className='user-email'>{currentUser?.username}</span>
    </p>
  ) : (
    <p>
      This page is protected. Please <Link to='/login'>Login</Link> or{' '}
      <Link to='/signup'>Signup</Link>
    </p>
  );

  return (
    <div>
      <h4>Dashboard</h4>
      {renderContent}
    </div>
  );
}
