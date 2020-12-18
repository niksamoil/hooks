/* eslint-disable no-unused-vars */
import React, {useState, useEffect, useCallback} from 'react';

const App = () => {
    const [value, setValue] = useState(1);
    const [visible, setVisible] = useState(true);

    if (visible) {
        return (
			<div>
				<button onClick={() => setValue((v) => v + 1)}>+</button>
				<button onClick={() => setVisible(false)}>hide</button>

                <Notification />
                {/* <ClassCounter value={value} />
                <HookCounter value={value} /> */}
                <PlanetInfo id={value} />
                
			</div>
		);
    } else {
        return	<button onClick={() => setVisible(true)}>show</button>
                
    }
};

// universal function for data fetching
const getPlanet = (id) => {
    return fetch(`https://swapi.dev/api/planets/${id}`)
    .then(res => res.json())
    .then(data => data);
}

// hook changes usePlanetInfo logic / universal custom hook
const useRequest  = (request) => {
    const [dataState, setDataState] = useState(null);

    useEffect(() => {
        let cancelled = false;

        request()
            .then(data => !cancelled && setDataState(data));
        
        return () => cancelled = true;

    }, [request] );

    return dataState;
};

// how to make our own hook
const usePlanetInfo = (id) => {

    // =! useCallback will return a memoized version of the callback that only changes if one of the dependencies has changed.
    const request = useCallback(() => getPlanet(id), [id]);

    // deleted logic and used custom hook

    return useRequest(request);
};


// useEffect for fetching data from API
const PlanetInfo = ({id}) => {

    // deleted logic, look previous commit

    const data = usePlanetInfo(id);


    return (
        <div>
            {id} - {data && data.name}
        </div>
    );
};


const HookCounter = ({ value }) => {
    useEffect(()=>{
        console.log('useEffect()');

        return () => console.log('clear'); // =! так мы очищаем предыдущий эфект


    }, [value]); // =! eсли нужно обновлять компонент только если поменялся value
                // =! Если передаем пустой массив функция сработает только один раз как componendDidMount

    return <p>{value}</p>;
};


const Notification = () => {

    const [visible, setVisible] = useState(true);

    useEffect(() => {
        const timeout = setTimeout(() => setVisible(false), 1500);

        return () => {
            clearTimeout(timeout);
        }
    }, []);

    return (
        <div>
            { visible && <p>Hello</p> }
        </div>
    );
}



export default App;



//== useEffect is like combination between componentDidMount and componentDidUpdate


const Examples = () => {


    useEffect(() => console.log('mount'), []); // * >> componentDidMount

    useEffect(() => console.log('update')); //* >> componentDidUpdate

    useEffect(() => () => console.log('unmount'), []); //* >> componentWillUnmount

    useEffect(()=>{
        console.log('useEffect()');

        return () => console.log('clear'); // =! так мы очищаем предыдущий эфект // unmount


    }, []); //=! only once 
}


