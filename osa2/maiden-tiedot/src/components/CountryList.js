const CountryLine = (props) => (
    <div>
        {props.country.name.common}&nbsp;
        <button onClick={props.handleClick}>show</button>
    </div>
)

const CountryList = (props) => {
    if (props.countries.length >= 10) {
        return (
            <div>
                Too many matches, specify another filter
            </div>
        )
    }
    return (
        <div>
            {props.countries.map(country => (<CountryLine key={country.ccn3} country={country} handleClick={() => props.handleClick(country.ccn3)}/>))}
        </div>
    )
}

export default CountryList