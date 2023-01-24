const SearchBar = (props) => (
    <div>
        find countries&nbsp;
        <input
            value={props.searchValue}
            onChange={props.setSearchValue}/>
    </div>
)

export default SearchBar