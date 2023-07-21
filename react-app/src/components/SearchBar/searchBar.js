import "./searchBar.css"
import {useState} from 'react';
import {useHistory} from 'react-router-dom';

const SearchBar = () => {
  const [keywords, setKeywords] = useState('');
  const history = useHistory();

  const handleSubmit = (e) => {
    e.preventDefault();
    if(!keywords) {
      history.push(`/search/all`)
    }
    else {
      history.push(`/search/${keywords}`)
    }
    setKeywords('');
  }

  return (
    <form className='searchbar' onSubmit={handleSubmit}>
      <input
        className='searchbar-input'
        type='text'
        placeholder='Search with restaurant name or keywords'
        value={keywords}
        onChange={(e) => setKeywords(e.target.value)}
        >
      </input>
      <button type='submit' className='search-button'>
        <i className="fa-solid fa-magnifying-glass"/>
      </button>
    </form>
  )
}

export default SearchBar;
