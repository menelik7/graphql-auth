import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useMutation } from '@apollo/client';
import query from '../queries/CurrentUser';
import mutation from '../mutations/login';
import AuthForm from './AuthForm';

export default function Login() {
  const [login] = useMutation(mutation, {
    refetchQueries: [{ query }],
  });
  const navigate = useNavigate();

  const onSubmit = (email, password) => {
    login({
      variables: {
        email,
        password,
      },
    }).then(() => {
      navigate('/');
    });
  };

  return (
    <div>
      <h4>Log in</h4>
      <AuthForm onSubmit={onSubmit} />
    </div>
  );
}
