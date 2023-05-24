import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useMutation } from '@apollo/client';
import query from '../queries/CurrentUser';
import mutation from '../mutations/login';
import AuthForm from './AuthForm';

export default function Login() {
  const [errors, setErrors] = useState([]);
  const [login, { loading }] = useMutation(mutation, {
    refetchQueries: [{ query }],
  });
  const navigate = useNavigate();

  const onSubmit = (email, password) => {
    login({
      variables: {
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
      <h4>Log in</h4>
      <AuthForm onSubmit={onSubmit} errors={errors} loading={loading} />
    </div>
  );
}
