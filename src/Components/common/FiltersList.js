// import React from "react";

// class FiltersList extends React.Component {
//     constructor(){
//         super();
//         this.state = {
//             checkedStaples: {},
//         }
//     }

//     render(){
//         const stapleList = this.props.stapleList;
//         const checkboxItems = stapleList.map((staple, index) => 
//             <div key = {index}>
//             <label>
//                 <input
//                     type="checkbox"
//                     value="{staple}"
//                     onClick={e => this.props.onChange(staple, e.checked)}
//                 />
//                 {staple}
//             </label>
//             </div>
//         );
//         return (
//             <form>
//                 {checkboxItems}
//             </form>
//         );
//     }
// }

// export default FiltersList;