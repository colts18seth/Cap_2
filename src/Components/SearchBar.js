import './SearchBar.css';

function searchBar({ handleChange, handleSubmit, searchTerm, toggleSearch }) {

    return (
        <form data-testid="searchBar" className='SearchBar' onSubmit={handleSubmit}>
            <input
                className="rounded-3 fs-5"
                onChange={handleChange}
                value={searchTerm}
                type='text'
                placeholder='Enter Search Term...'
            />
            <button className="rounded-3 btn-light" type='submit'>
                Search
            </button>
            <button className="rounded-3 btn-light" onClick={toggleSearch} type='button'>
                Show All
            </button>
        </form>
    );
}

export default searchBar;