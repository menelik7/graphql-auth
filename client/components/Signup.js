import React, { useState, useContext } from 'react';
import UserContext from '../context/user';
import { useNavigate } from 'react-router-dom';
import { useMutation } from '@apollo/client';
import query from '../queries/CurrentUser';
import mutation from '../mutations/signup';
import AuthForm from './AuthForm';

export default function Signup() {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState([]);
  const { updateCurrentUserInfo } = useContext(UserContext);
  const [login, { loading }] = useMutation(mutation);
  const navigate = useNavigate();

  const onSubmit = ([username, email, password]) => {
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

  const formFields = [
    { state: username, stateSetter: setUsername, type: 'username' },
    { state: email, stateSetter: setEmail, type: 'email' },
    { state: password, stateSetter: setPassword, type: 'password' },
  ];

  return (
    <div>
      <h4>Sign up</h4>
      <AuthForm
        onSubmit={onSubmit}
        errors={errors}
        loading={loading}
        formFields={formFields}
      />
    </div>
  );
}
