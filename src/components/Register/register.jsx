import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { registerWithEmailAndPassword } from '../../utils/auth/auth_utils';

const Register = () => {
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [checkPassword, setCheckPassword] = useState();
  const [errorMessage, setErrorMessage] = useState();
  const [role, setRole] = useState();
  const [firstName, setFirstName] = useState();
  const [lastName, setLastName] = useState();
  const [phoneNumber, setPhoneNumber] = useState();
  const navigate = useNavigate();

  /**
   * This function handles registering an account (temporary usage)
   * If the user registers successfully, they are redirected to login in screen
   * @param {Event} e
   */
  const handleSubmit = async e => {
    e.preventDefault();
    try {
      if (password !== checkPassword) {
        throw new Error("Passwords don't match");
      }
      await registerWithEmailAndPassword(
        email,
        password,
        role,
        firstName,
        lastName,
        phoneNumber,
        navigate,
        '/login',
      );
    } catch (error) {
      setErrorMessage(error.message);
    }
  };

  return (
    <div>
      <h2>Register</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          onChange={({ target }) => setEmail(target.value)}
          placeholder="Email"
          required
        />
        <br />
        <input onChange={({ target }) => setRole(target.value)} placeholder="Role" required />
        <br />
        <input
          type="text"
          onChange={({ target }) => setFirstName(target.value)}
          placeholder="First Name"
          required
        />
        <br />
        <input
          type="text"
          onChange={({ target }) => setLastName(target.value)}
          placeholder="Last Name"
          required
        />
        <br />
        <input
          type="text"
          onChange={({ target }) => setPhoneNumber(target.value)}
          placeholder="Phone Number"
          required
        />
        <br />
        <input
          onChange={({ target }) => setPassword(target.value)}
          placeholder="Password"
          type="password"
          required
        />
        <br />
        <input
          onChange={({ target }) => setCheckPassword(target.value)}
          placeholder="Re-enter Password"
          type="password"
          required
        />
        <br />
        <button type="submit" onClick={handleSubmit}>
          Register
        </button>
      </form>
      <p>{errorMessage}</p>
    </div>
  );
};

export default Register;
