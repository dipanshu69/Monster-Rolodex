import { Component } from "react";
import CardList from "./components/card-list/card-list.component";
import SearchBox from "./components/search-box/search-box.component";
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
        this.setState(() => {
          return { monsters: users };
        })
      );
  }

  onSearchChange = (e) => {
    const searchTerm = e.target.value.toLowerCase();
    this.setState(() => {
      return { searchTerm: searchTerm };
    });
  };

  render() {
    const { monsters, searchTerm } = this.state;
    const { onSearchChange } = this;

    const filterMonsters = monsters.filter((monster) =>
      monster.name.toLowerCase().includes(searchTerm)
    );

    return (
      <div className="App">
        <h1 className="app-title">Monster Rolodex</h1>

        <SearchBox
          onChangeHandler={onSearchChange}
          placeHolder="Search Monster"
        />
        <CardList monsters={filterMonsters} />
      </div>
    );
  }
}

export default App;
