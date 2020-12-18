import React, {useState, useEffect, Component} from 'react';

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
    fetch(`https://swapi.dev/api/planets/${id}`)
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
const usePlanetInfo = ({id}) => {
    const [planetName, setPlanetName] = useState(null);

    useEffect(() => {
        let cancelled = false;

        fetch(`https://swapi.dev/api/planets/${id}`)
        .then(res => res.json())
        .then(data => {

            !cancelled && setPlanetName(data.name);

            return () => cancelled = true;
        });
    }, [id]);

    return planetName;
};


// useEffect for fetching data from API
const PlanetInfo = ({id}) => {

    const [planetName, setPlanetName] = useState(null);

    const planet = usePlanetInfo(id);


    useEffect(() => {
        let cancelled = false;

        fetch(`https://swapi.dev/api/planets/${id}`)
        .then(res => res.json())
        .then(data => {

            !cancelled && setPlanetName(data.name);

            return () => cancelled = true;
        });
    }, [id]);


    return (
        <div>
            {id} - {planetName}
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


