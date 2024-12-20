import React, { useState, useEffect } from 'react';
import '../App.css';
const { Xumm } = require('xumm');

const xumm = new Xumm('KEY HERE');

export const Home = () => {
  const [account, setAccount] = useState('');
  const [admin, setAdmin] = useState('');
  const [showSidebar, setShowSidebar] = useState(false);

  const handleClick = (publickey) => {
    console.log("account is" + publickey)
    const apiUrl = `https://handy-seahorse-suddenly.ngrok-free.app/api/publickey/` + publickey;
  
    fetch(apiUrl, {
      mode: "cors",
      headers: {
        'ngrok-skip-browser-warning': '69420',
        'x-api-key' : 'CarboCreditAPIKEy'
      }
    })
      .then(response => {
        if (response.ok) {
          return response.json();
        }
        throw new Error('Network response was not ok.');
      })
      .then(data => {
        setAccount(data.username);
        setAdmin(data.AccountType);
        console.log(data.AccountType);
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });
  };
  
  useEffect(() => {
    console.log(account);
    console.log(admin);
  }, [account, admin]);
  

  useEffect(() => {
    xumm.user.account.then(a => {
      handleClick(a);
    });
  }, []);

  const login = () => {
    xumm.authorize();
  };

  const handletourClick = () => {
    window.location.href = '/contact';
  };
  const yay = () => {
    window.location.href = '/Sign_Up';
  };  
  const projects = () => {
    window.location.href = '/projects';
  };
  
  const toggleSidebar = () => {
    setShowSidebar(!showSidebar);
  };
  const openAdminPanel = ()=>{
    window.location.href = '/admin'
  }

  return (
    <div className="hero">
      
      <div className="navbar">
        <img src="/Images/logo.png" className="logo" alt="logo" />
        
      </div>
      <div className="content">
        <h3>Welcome {account ? account : 'Guest'} to </h3> <h1>CarboCredit<br /></h1>

        <h3>Powering Climate Action on the XRPL Blockchain</h3><br></br>
        <button type="button" onClick={handletourClick} style={{color: 'white' }}>Take a tour</button>
      </div>
      <div className="sidebar" style={{ display: showSidebar ? 'block' : 'none', color: 'white' }}>
      <button type="button" onClick={yay} className='Nav_button' style={{color: 'white' }}>Sign up</button>
      <br></br>
      <br></br>
        <button type="button" onClick={login} className='Nav_button' style={{color: 'white' }}>Sign In</button>
        <br></br>
      <br></br>
        <button type="button" onClick={projects} className='Nav_button' style={{color: 'white' }}> Projects</button>
        <br></br>
        <br></br>
        {admin && admin === 'Admin' && (
        <button type="button" onClick={openAdminPanel} className='Nav_button' style={{ color: 'white' }}>Admin Panel</button>
      )}
      </div>
      <div className="bubbles">
        <img src="/Images/bubble.png" alt="Bubblea"/>
        <img src="/Images/bubble.png" alt="Bubblea"/>
        <img src="/Images/bubble.png" alt="Bubblea"/>
        <img src="/Images/bubble.png" alt="Bubblea"/>
        <img src="/Images/bubble.png" alt="Bubblea"/>
        <img src="/Images/bubble.png" alt="Bubblea"/>
        <img src="/Images/bubble.png" alt="Bubblea"/>
      </div>
      <img src="/Images/menu.png" className="menu" alt="menu" onClick={toggleSidebar} style={{ position: 'absolute', top: 0, right:30 }} />

    </div>
  );
};
