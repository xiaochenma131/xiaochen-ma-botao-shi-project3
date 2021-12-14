import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router';
import { Link } from 'react-router-dom';
import "../css/Common.css";
import axios from 'axios';

// All good
export default function Home() {
  const [formInput, setFormInput] = useState('');
  const [user, setUser] = useState();

  let navigate = useNavigate();

  function userLoggedIn() {
      axios.get('/api/user/userLoggedIn')
          .then(response => {
              setUser(response.data);
          })
          .catch(error => console.error(error));
  }
  useEffect(userLoggedIn, []);

  if (!user) {
    return (
      <div class='vertical'>
        <h1>Outdeed</h1>
        <h3>designed by Xiaochen Ma and Botao Shi</h3>
        <div class='search'>
          <input type='text' value={formInput}
            onChange={(e) => {
              setFormInput(e.target.value);
            }} />
  
            <Link to={{ pathname: `/searchResult/${formInput}` }}>
              <button class='button'>Search</button>
            </Link>
        </div>
        <div class='search'>
          <Link to="/loginsignup"><button class='button'>Log In</button></Link>
          <Link to="/loginsignup"><button class='button'>Sign Up</button></Link>
        </div>
  
      </div>
  
    )

  }
  else return (
    <div class='vertical'>
      <h1>Outdeed</h1>
      <h3>designed by Xiaochen Ma and Botao Shi</h3>
      <div class='search'>
        <input type='text' value={formInput}
          onChange={(e) => {
            setFormInput(e.target.value);
          }} />

          <Link to={{ pathname: `/searchResult/${formInput}` }}>
            <button class='button'>Search</button>
          </Link>
      </div>
      <div class='horizontal'>
        <h3>Logged in as {user}</h3>
      </div>
      <div class='search'>
          <Link to={"/favorites/" + user}><button class='button'>Favorites</button></Link>
          <button class='button'
            onClick={() => {
                axios.delete('/api/user/logout')
                    .then(response => {
                        console.log(response);
                        setUser('');
                        navigate('/');
                    })
                    .catch(error => console.log(error));
            }}>Logout</button>
        </div>

    </div>

  )
}