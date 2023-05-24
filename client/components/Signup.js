import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useMutation } from '@apollo/client';
import query from '../queries/CurrentUser';
import mutation from '../mutations/signup';
import AuthForm from './AuthForm';

export default function Signup() {
  const [errors, setErrors] = useState([]);
  const [login, { loading }] = useMutation(mutation, {
    refetchQueries: [{ query }],
  });
  const navigate = useNavigate();

  const onSubmit = (email, password, username) => {
    login({
      variables: {
        username,
        email,
        password,
      },
    })
      .then(() => {
        setErrors([]);
        navigate('/dashboard');
      })
      .catch((res) => {
        const gqlErrors = res.graphQLErrors.map((error) => error.message);
        setErrors(gqlErrors);
      });
  };

  return (
    <div>
      <h4>Sign up</h4>
      <AuthForm
        onSubmit={onSubmit}
        errors={errors}
        loading={loading}
        usernameRequired
      />
    </div>
  );
}
