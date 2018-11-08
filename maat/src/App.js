import React from 'react';
import axios from 'axios';

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      countries: [],
      filter: ''
    }
  }
    onChange = key => e => {
        this.setState({[key]: e.target.value})
    }

    onClick = e => {
        this.setState({filter: e.target.textContent});
    }

    componentDidMount() {
        axios.get('https://restcountries.eu/rest/v2/all').then(response => {
            this.setState({countries: response.data});
        })
    }

  render() {
    const filtered_countries = this.state.countries.filter(country => country.name.toLowerCase().indexOf(this.state.filter.toLowerCase()) !== -1);
    let result;
    if (filtered_countries.length === 1) {
        const country = filtered_countries[0];
        result = (
            <div>
                <h1>{country.name} {country.nativeName}</h1>
                <p>capital: {country.capital}</p>
                <p>population: {country.population}</p>
                <img src={country.flag} alt={"flag"}/>
            </div>
        );
    } else if (filtered_countries.length < 10) {
        result = filtered_countries.map(country => <p key={country.name} onClick={this.onClick}>{country.name}</p>);
    } else {
        result = <p>too many maches, specify another filter</p>
    }
    return (
      <div>
        find countries: <input onChange={this.onChange("filter")} value={this.state.filter} />
        {result}
      </div>
    )
  }
}

export default App
