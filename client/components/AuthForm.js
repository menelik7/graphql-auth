import React, { useState } from 'react';

export default function AuthForm({ onSubmit }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const onFormSubmit = (event) => {
    event.preventDefault();

    onSubmit(email, password);
  };

  return (
    <div className='row'>
      <form className='col s6' onSubmit={onFormSubmit}>
        <div className='input-field'>
          <input
            id='email'
            type='email'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <label htmlFor='email'>Email</label>
        </div>
        <div className='input-field'>
          <input
            id='password'
            type='password'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <label htmlFor='password'>Password</label>
        </div>
        <button className='btn' type='submit'>
          Submit
        </button>
      </form>
    </div>
  );
}
