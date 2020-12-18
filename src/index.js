import React, {useContext} from 'react';
import ReactDOM from 'react-dom';
import App from './use-effect'

// const MyContext = React.createContext();

// const App = () => {
//     return (
//         <MyContext.Provider value='Hello 123'>
//             <Child/>
//         </MyContext.Provider>
//     );
// };

// const Child = () => {
//     const value = useContext(MyContext);

//     return <p>{value}</p>
// }

ReactDOM.render(<App/>, document.getElementById("root"));
