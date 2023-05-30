import React, { useState, useContext } from 'react';
import UserContext from '../context/user';
import { useNavigate } from 'react-router-dom';
import { useMutation } from '@apollo/client';
import query from '../queries/CurrentUser';
import mutation from '../mutations/signup';
import AuthForm from './AuthForm';

export default function Signup() {
  const [errors, setErrors] = useState([]);
  const { updateCurrentUserInfo } = useContext(UserContext);
  const [login, { loading }] = useMutation(mutation);
  const navigate = useNavigate();

  const onSubmit = (email, password, username) => {
    login({
      variables: {
        username,
        email,
        password,
      },
    })
      .then((user) => {
        const { data } = user;
        updateCurrentUserInfo(data.signup);
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
