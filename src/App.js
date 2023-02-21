import { Component } from "react";
import "./App.css";

class App extends Component {
  constructor(props) {
    super();
    this.state = {
      monsters: [],
      searchTerm: "",
    };
  }

  componentDidMount() {
    fetch("https://jsonplaceholder.typicode.com/users")
      .then((response) => response.json())
      .then((users) =>
        this.setState(
          () => {
            return { monsters: users };
          },
          () => {
            console.log(this.state.monsters);
          }
        )
      );
  }

  onSearchChange = (e) => {
    const searchTerm = e.target.value.toLowerCase();
    this.setState(() => {
      return { searchTerm: searchTerm };
    });
  }

  render() {

    const {monsters, searchTerm} = this.state;
    const {onSearchChange} = this;

    const filterMonsters = monsters.filter((monster) =>
      monster.name.toLowerCase().includes(searchTerm)
    );

    return (
      <div className="App">
        <input
          className="search-box"
          type="search"
          placeholder="Search Monster"
          onChange={onSearchChange}
        />
        {filterMonsters.map((monster, index) => {
          return <h1 key={index}>{monster.name}</h1>;
        })}

      </div>
    );
  }
}

export default App;



