import React from 'react';
import spinner from '../assets/svg/spinner.svg';

export default function Spinner() {
  return (
    <div className='container spinner-div'>
      <img
        src={spinner}
        style={{
          width: '36px',
          height: '36px',
        }}
      />
    </div>
  );
}
