import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useMutation } from '@apollo/client';
import query from '../queries/CurrentUser';
import mutation from '../mutations/signup';
import AuthForm from './AuthForm';

export default function Signup() {
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
      <h4>Sign up</h4>
      <AuthForm onSubmit={onSubmit} />
    </div>
  );
}
