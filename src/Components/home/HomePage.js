import React from "react";
import Header from "../common/Header";
import RestaurantList from "../restaurants/RestaurantList";
import { getRestaurants } from "../../api/restaurantsApi";
import { createStatesList,  createAttiresList, createGenresList, FiltersList } from '../common/Filter';
import { createSorter } from '../common/Sort';

class HomePage extends React.Component {

    state = {
        restaurants: [],
        allRestaurants: [],
        selectedOptions: [],
        sorters: this.props.sorters
    };

    static defaultProps = {

        sorters: [{
          property: 'name'
        }, {
          property: 'state'
        }]


      };

    componentDidMount() {
        getRestaurants().then(restaurants => (this.setState({ allRestaurants: restaurants, restaurants: this.parseData(restaurants) })));

    }

    componentDidUpdate(prevState) {
        const { restaurants, selectedOptions } = this.state;

        console.log(prevState.restaurants);
        console.log(restaurants);

        if (prevState.restaurants && prevState.restaurants !== restaurants) {
            this.setState({ restaurants: this.parseData(restaurants) });
        };

    }

    parseData(data) {
        const { sorters } = this.state;
        const { selectedOptions } = this.state;

        if (data && data.length) {

          if (Array.isArray(selectedOptions) && selectedOptions.length) {
            selectedOptions.map(option => { data = data.filter(r => r.state === option);})
            //data = data.filter(r => r.state === 'FL');
          }

          if (Array.isArray(sorters) && sorters.length) {
            data.sort(createSorter(...sorters));
          }
        }
    
        console.log(data);

        return data;
      }

    compareBy = (key) => {
        return function(a, b) {
          if (a[key] < b[key]) return -1;
          if (a[key] > b[key]) return 1;
          return 0;
        };
      };
      
    sortList = (key) => {
        let arrayCopy = [...this.state.restaurants];
        arrayCopy.sort(this.compareBy(key));
        console.log(arrayCopy);
        this.setState({ users: arrayCopy });
    };

    handleOnChange(option) {

        const { restaurants, selectedOptions } = this.state;

        console.log(option);
        console.log(selectedOptions);

        if (!selectedOptions.includes(option)) {

            selectedOptions.push(option);
            console.log(selectedOptions);
            this.setState({ selectedOptions: selectedOptions})

        } else {

            var index = selectedOptions.indexOf(option);
            if (index >= 0) {
                selectedOptions.splice( index, 1 );
            }
            console.log(selectedOptions);
            this.setState({ selectedOptions: selectedOptions})

        }
        console.log(this.state.selectedOptions)
        this.setState({ restaurants: this.parseData(restaurants) });
    }

    render() {

        const { allRestaurants, restaurants } = this.state;
        console.log(restaurants);
        console.log(allRestaurants);
        let statesList = createStatesList(allRestaurants);
        let attiresList = createAttiresList(allRestaurants);
        let genresList = createGenresList(allRestaurants);

        console.log(statesList);
        console.log(attiresList);
        console.log(genresList);


        return (
            <div>
            <Header />
            
            <div>
                <h3>List of Restaurants</h3>
            </div>
            <div className="filter-section">
                    <h6>Filter by State:</h6>
                    <FiltersList optionsList = {statesList} onChange={this.handleOnChange.bind(this)}/>
            </div>
            <div className="filter-section">
                    <h6>Filter by Genres:</h6>
                    <FiltersList optionsList = {genresList} onChange={this.handleOnChange.bind(this)}/>
            </div>

            <RestaurantList restaurants={restaurants} />
        </div>
            );
    }
}
  

export default HomePage;