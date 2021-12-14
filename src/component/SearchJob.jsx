import { useState } from 'react';
import { Link } from 'react-router-dom';
import Navbar from './Navbar';
import "../css/Common.css";

// All good
export default function Home() {
  const [formInput, setFormInput] = useState('');

    return (
        <div class='vertical'>
            <Navbar />
            <div class='search'>
                <input type='text' value={formInput}
                onChange={(e) => {
                    setFormInput(e.target.value);
                }} />

                <Link to={{ pathname: `/searchResult/${formInput}` }}>
                    <button class='button'>Search</button>
                </Link>
            </div>
        </div>

    )
}