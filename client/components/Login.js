import React, { useState, useContext } from 'react';
import UserContext from '../context/user';
import { useNavigate } from 'react-router-dom';
import { useMutation } from '@apollo/client';
import mutation from '../mutations/login';
import AuthForm from './AuthForm';

export default function Login() {
  const [errors, setErrors] = useState([]);
  const { updateCurrentUserInfo } = useContext(UserContext);
  const [login, { loading }] = useMutation(mutation);

  const navigate = useNavigate();

  const onSubmit = (email, password) => {
    login({
      variables: {
        email,
        password,
      },
    })
      .then((user) => {
        const { data } = user;
        updateCurrentUserInfo(data.login);
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
