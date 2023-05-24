import React, { useState, useEffect } from 'react';
import spinner from '../assets/svg/spinner.svg';

export default function AuthForm({
  onSubmit,
  errors,
  loading,
  usernameRequired,
}) {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const onFormSubmit = (event) => {
    event.preventDefault();

    onSubmit(email, password, username);
  };

  useEffect(() => {
    if (!errors.length) {
      setEmail('');
      setPassword('');
    }
  }, [errors]);

  return (
    <div className='row'>
      <form className='col s6' onSubmit={onFormSubmit}>
        {usernameRequired && (
          <div className='input-field'>
            <input
              className={errors.length ? 'error-highlight' : ''}
              id='username'
              type='text'
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
            <label
              className={errors.length ? 'active error-label' : ''}
              htmlFor='username'
            >
              Username
            </label>
          </div>
        )}
        <div className='input-field'>
          <input
            className={errors.length ? 'error-highlight' : ''}
            id='email'
            type='email'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <label
            className={errors.length ? 'active error-label' : ''}
            htmlFor='email'
          >
            Email
          </label>
        </div>
        <div className='input-field'>
          <input
            className={errors.length ? 'error-highlight' : ''}
            id='password'
            type='password'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <label
            className={errors.length ? 'active error-label' : ''}
            htmlFor='password'
          >
            Password
          </label>
        </div>
        <div className='error'>
          {errors && errors.map((error, i) => <div key={i}>{error}</div>)}
        </div>
        <button className='btn' type='submit'>
          {loading ? <img src={spinner} /> : 'Submit'}
        </button>
      </form>
    </div>
  );
}
