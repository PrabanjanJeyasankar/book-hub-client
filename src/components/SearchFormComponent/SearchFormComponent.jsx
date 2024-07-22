import React from 'react';
import { FaSearch } from "react-icons/fa";
import "./SearchFormComponent.css";

function SearchFormComponent() {
  return (
    <div className='search-form'>
      <div className='container'>
        <div className='search-form-content'>
          <form className='search-form'>
            <div className='search-form-elem'>
              <input type="text" className='form-control' placeholder='The Lost World ...' />
              <button type="submit" className=''>
                <FaSearch className='text-black' size={18} />
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default SearchFormComponent;
