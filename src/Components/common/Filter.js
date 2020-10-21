import React from "react";
import '../../Style/Filter.css';
const createStatesList = (...args) => {
    var statesList = [];
    args.map(restaurant => {
        restaurant.map(r => {
            if (!statesList.includes(r.state)) {
                statesList.push(r.state);
            }; 
        })
    })
    return statesList.sort();
}

const createAttiresList = (...args) => {
    var attiresList = [];
    args.map(restaurant => {
        restaurant.map(r => {
            if (!attiresList.includes(r.attire)) {
                attiresList.push(r.attire);
            }; 
        })
    })
    return attiresList.sort();
}

const createGenresList = (...args) => {
    var genresList = [];
    var genre = [];
    args.map(restaurant => {
        restaurant.map(r => {
            genre = [];
            genre = r.genre.split(',');
            genre.map(g => {
                if (!genresList.includes(g)) {
                    genresList.push(g);
                };                 
            })
        })
    })
    return genresList.sort();
}

class FiltersList extends React.Component {
    constructor(){
        super();
        this.state = {
            checkedOptions: {},
        }
    }

    render(){
        const optionsList = this.props.optionsList;

        console.log(optionsList);

        const checkboxItems = optionsList.map((option, index) => 
            <div className="check" key = {index}>
            <label>
                <input
                    type="checkbox"
                    value="{option}"
                    onClick={e => this.props.onChange(option, e.checked)}
                />
                {option}
            </label>
            </div>
        );
        return (
            <form >
                {checkboxItems}
            </form>
        );
    }
}
  
export { createStatesList,  createAttiresList, createGenresList, FiltersList };