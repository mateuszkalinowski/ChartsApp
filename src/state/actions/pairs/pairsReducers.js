// import {ADD_PAIR, REMOVE_PAIR, EDIT_PAIR} from "../../types";
//
// const initialState = {
//     pairs: {
//         pairs: []
//     }
// }
//
// export default function (state = initialState, action) {
//     switch (action.type) {
//         case ADD_PAIR:
//             let pairs = state.pairs.pairs;
//             pairs.push(action.payload);
//             // points.sort(function(a,b) {
//             //     return a.x - b.x;
//             // })
//             return {
//                 ...state,
//                 points: {
//                     'pairs': pairs
//                 }
//             }
//         case REMOVE_PAIR:
//             pairs = state.pairs.pairs;
//             pairs = pairs.filter(point => {
//                 return pairs.id !== action.payload
//             })
//             return {
//                 ...state,
//                 pairs: {
//                     'pairs': pairs
//                 }
//             }
//         case EDIT_PAIR:
//             pairs = state.pairs.pairs;
//             pairs.forEach((point, id) => {
//                 if(pairs.id === action.payload.id) {
//                     pairs.key = action.payload.key;
//                     pairs.value = action.payload.value;
//                 }
//             })
//             return {
//                 ...state,
//                 pairs: {
//                     'pairs': pairs
//                 }
//             }
//         default:
//             return state;
//     }
// }