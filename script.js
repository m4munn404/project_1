//select DOM element
const counterEl = document.getElementById("counter");
const incrementEl = document.getElementById("id_increment");
const decrementEl = document.getElementById("id_decrement");
const addMatchEl = document.getElementById("add_match");
const matchListEl = document.getElementById("match_list");
const prevMatch = document.getElementById("match");
const resetEl = document.getElementById("reset");
const removeEl = document.getElementById("removeTodo");

//action identifier
const INCREMENT = "increment";
const DECREMENT = "decrement";
const ADD_MATCH = "add_m";
const RESET = "reset";
const divArray = [prevMatch];

//action creators

const increment = (value) => {
    
    return {
        type: INCREMENT,
        payload: value,
    }
}
const decrement = (value) => {
    return {
        type: DECREMENT,
        payload: value,
    }
}

const resetState = () => {
    return {
        type: RESET,
        
    }
}

//initial state
const initialState = {
    value: 0,
   
}

//create reducer function
function counterReducer(state = initialState, action){
    if(action.type === INCREMENT) {
        
        return {
            ...state,
            value: state.value + action.payload,
        }
    } else if(action.type === DECREMENT) {
        return {
            ...state,
            value: state.value - action.payload,
        }
    }
    else if(action.type === RESET) {
        return {
            value: 0,
        }
    }
    else return state;
}

//create store
const store = Redux.createStore(counterReducer);

const render = () => {
    const state = store.getState();
    if(state.value <0) counterEl.innerText = 0;
    else counterEl.innerText = state.value.toString();
}
render();
store.subscribe(render);

//input change listener
incrementEl.addEventListener("change", (e) => {
    e.preventDefault();
    const inputValue = parseInt(incrementEl.value);
    store.dispatch(increment(inputValue))
});
decrementEl.addEventListener("change", (e) => {
    e.preventDefault()
    const inputValue = parseInt(decrementEl.value);
    store.dispatch(decrement(inputValue))
});

resetEl.addEventListener('click', () => {
    store.dispatch(resetState());
});

var cnt = 1;
const createMatch = (e) => {
    e.preventDefault();
    cnt++;
    const matchDiv = document.createElement("div");
    matchDiv.classList.add("match");
  
    // wrapper div
    const wrapDiv = document.createElement("div");
    wrapDiv.classList.add("wrapper");
  
    const image = document.createElement("IMG");
    image.src = "./image/delete.svg"
    const deleteBtn = document.createElement("button");
    deleteBtn.setAttribute('class',"lws-delete");
    deleteBtn.setAttribute('id', "removeTodo");
    deleteBtn.appendChild(image);
  
    const name = document.createElement("H3");
    name.setAttribute("class","lws-matchName");
    name.innerHTML = 'match '+ cnt.toString();
    wrapDiv.appendChild(deleteBtn);
    wrapDiv.appendChild(name);
    
    // increment decrement div
    const in_De = document.createElement("div");
    in_De.setAttribute("class","inc-dec");
  
    const formOne = document.createElement("form");
    formOne.setAttribute("class","incrementForm");
    const incrementName = document.createElement("H4");
    incrementName.textContent = "Increment";
    const inputOne = document.createElement("input");
    inputOne.setAttribute("class","lws-increment");
    inputOne.setAttribute("id", "id_increment"); // unique ID
    inputOne.setAttribute('type', 'number');
    inputOne.setAttribute('name', 'increment');
    formOne.appendChild(incrementName);
    formOne.appendChild(inputOne);
    in_De.appendChild(formOne);
  
    const formTwo = document.createElement("form");
    formTwo.setAttribute("class","incrementForm");
    const decrementName = document.createElement("H4");
    decrementName.textContent = "Decrement";
    const inputTwo = document.createElement("input");
    inputTwo.setAttribute("class","lws-decrement");
    inputTwo.setAttribute("id", "id_decrement"); // unique ID
    inputTwo.setAttribute('type', 'number');
    inputTwo.setAttribute('name', 'decrement');
    formTwo.appendChild(decrementName);
    formTwo.appendChild(inputTwo);
    in_De.appendChild(formTwo);
    

    const resultDiv = document.createElement("div");
    resultDiv.setAttribute('class',"numbers");
    const result = document.createElement("H2");
    result.setAttribute("class","lws-singleResult");
    result.setAttribute('id', 'counter');
    resultDiv.appendChild(result);

    matchDiv.appendChild(wrapDiv);
    matchDiv.appendChild(in_De);
    matchDiv.appendChild(resultDiv);
    matchListEl.appendChild(matchDiv)
    
  }
addMatchEl.addEventListener('click', createMatch);

const deleteMatch = (e) => {
    if (e.target.classList.contains('lws-delete')) {
              e.preventDefault();
              const matchDiv = e.target.closest('.match');
              matchListEl.removeChild(matchDiv);
            }
}

// removeEl.addEventListener('click', (e) => {
//     if (e.target.classList.contains('lws-delete')) {
//       e.preventDefault();
//       const matchDiv = e.target.closest('.match');
//       matchListEl.removeChild(matchDiv);
//     }
//   });
