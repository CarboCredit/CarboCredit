import React, { useState } from 'react';
import { Xumm } from 'xumm';
import bcrypt from 'bcryptjs';
import '../App.css';

const xumm = new Xumm('KEY HERE');

const SignUp = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [account, setAccount] = useState('');
  const [loading, setLoading] = useState(false);
  const [userType, setUserType] = useState('');
  const [passwordError, setPasswordError] = useState('');

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleUserTypeChange = (event) => {
    setUserType(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);

    try {
      await xumm.authorize();
      const userAccount = await xumm.user.account;
      setAccount(userAccount);
      const isValidPassword = validatePassword(password);
      if (!isValidPassword) {
        throw new Error(
          'Password must contain at least 1 capital letter, 1 special character, and at least 2 numbers.'
        );
      }
      const encryptedPassword = await encryptPassword(password);
      alert('Sign up successful!');
      const response = await sign_up(email, encryptedPassword, userAccount, userType);
      console.log(response);
    } catch (error) {
      console.error('Error signing up:', error);
      alert('Sign up failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const validatePassword = (password) => {
    const capitalRegex = /[A-Z]/;
    const specialCharRegex = /[!@#$%^&*(),.?":{}|<>]/;
    const numberRegex = /[0-9]/g;
    const isValid =
      capitalRegex.test(password) &&
      specialCharRegex.test(password) &&
      (password.match(numberRegex) || []).length >= 2;
    setPasswordError(isValid ? '' : 'Password is not valid.');
    return isValid;
  };

  const encryptPassword = async (password) => {
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    return hashedPassword;
  };

  const sign_up = async (email, password, userAccount, userType) => {
    const apiUrl = `http://34.30.11.176:3002/api/add_user/`;

    const response = await fetch(apiUrl, {
      mode: 'cors',
      method: 'POST',
      headers: {
        'ngrok-skip-browser-warning': '69420',
        'Content-Type': 'application/json',
        'x-api-key' : 'CarboCreditAPIKEy'
      },
      body: JSON.stringify({ email, pwd: password, public_key: userAccount, user_type: userType }),
    });

    if (!response.ok) {
      throw new Error('Network response was not ok.');
    }

    return response.json();
  };

  return (
    <div className="center-container">
      <div className="signup-form-container">
        <form onSubmit={handleSubmit} className="signup-form">
          <h2>Sign Up</h2>
          <div className="form-group">
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={handleEmailChange}
            />
          </div>
          <div className="form-group">
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={handlePasswordChange}
            />
            {passwordError && <p className="error-message">{passwordError}</p>}
          </div>
          <div className="form-group">
            <label>
              <input
                type="radio"
                value="CarboProducer"
                checked={userType === 'CarboProducer'}
                onChange={handleUserTypeChange}
              />
              CarboProducer
            </label>
          </div>
          <div className="form-group">
            <label>
              <input
                type="radio"
                value="CarboDeucer"
                checked={userType === 'CarboDeucer'}
                onChange={handleUserTypeChange}
              />
              CarboDeucer
            </label>
          </div>
          <button type="submit" disabled={loading} className="btn-signup">
            {loading ? 'Signing up...' : 'Sign Up'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default SignUp;
