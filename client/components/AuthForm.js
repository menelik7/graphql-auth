import React from 'react';
import spinner from '../assets/svg/spinner.svg';

export default function AuthForm({ onSubmit, errors, loading, formFields }) {
  const onFormSubmit = (event) => {
    event.preventDefault();
    const formValues = formFields.map(({ state }) => state);

    onSubmit(formValues);
  };

  const renderFormFields = formFields.map(({ state, stateSetter, type }) => {
    return (
      <div className="input-field" key={type}>
        <input
          className={errors.length ? 'error-highlight' : ''}
          id={type}
          type={type === 'username' ? 'text' : type}
          value={state}
          onChange={(e) => stateSetter(e.target.value)}
        />
        <label
          className={errors.length ? 'active error-label' : ''}
          htmlFor="username"
        >
          {type[0].toUpperCase() + type.slice(1)}
        </label>
      </div>
    );
  });

  return (
    <div className="row">
      <form className="col s6" onSubmit={onFormSubmit}>
        {renderFormFields}
        <div className="error">
          {errors && errors.map((error, i) => <div key={i}>{error}</div>)}
        </div>
        <button className="btn" type="submit">
          {loading ? <img src={spinner} /> : 'Submit'}
        </button>
      </form>
    </div>
  );
}
