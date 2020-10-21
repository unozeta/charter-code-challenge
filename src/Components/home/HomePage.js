import React from "react";
import Header from "../common/Header";
import RestaurantList from "../restaurants/RestaurantList";
import { getRestaurants } from "../../api/restaurantsApi";
import { createStatesList, FiltersList } from '../common/Filter';
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
        getRestaurants().then(restaurants => (this.setState({ allRestaurants: restaurants , restaurants: this.parseData(restaurants) })));

    }

    componentDidUpdate(prevState) {
        const { restaurants } = this.state;

        if (prevState.restaurants && prevState.restaurants !== restaurants) {
            this.setState({ restaurants: this.parseData(restaurants) });
        };
        
    }

    parseData(data) {
        const { sorters, selectedOptions } = this.state;

        if (data && data.length) {

          if (Array.isArray(selectedOptions) && selectedOptions.length) {
            // eslint-disable-next-line array-callback-return
            selectedOptions.map(option => { data = data.filter(r => r.state === option);})
          }

          if (Array.isArray(sorters) && sorters.length) {
            data.sort(createSorter(...sorters));
          }
        }

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
        this.setState({ users: arrayCopy });
    };

    handleOnChange(option) {

        const { allRestaurants, restaurants, selectedOptions } = this.state;

        if (!selectedOptions.includes(option)) {

            selectedOptions.push(option);
            this.setState({ selectedOptions: selectedOptions})

        } else {

            var index = selectedOptions.indexOf(option);
            if (index >= 0) {
                selectedOptions.splice( index, 1 );
            }
            this.setState({ selectedOptions: selectedOptions})

        }

        if (this.state.selectedOptions.length === 0) {
          this.setState({ restaurants: this.parseData(allRestaurants) });
        } else {
          this.setState({ restaurants: this.parseData(restaurants) });
        }

    }

    render() {

        const { allRestaurants, restaurants } = this.state;
        let statesList = createStatesList(allRestaurants);

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

            <RestaurantList restaurants={restaurants} />

        </div>
            );
    }
}
  

export default HomePage;