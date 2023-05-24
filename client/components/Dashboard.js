import React from 'react';
import { useQuery } from '@apollo/client';
import query from '../queries/CurrentUser';

export default function Dashboard() {
  const { loading, error, data } = useQuery(query);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  const { user } = data;
  const { username } = user;

  return (
    <div>
      <h4>Dashboard</h4>
      <p>
        Welcome
        <span className='user-email'>{username}</span>
      </p>
    </div>
  );
}
