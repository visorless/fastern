import React, { useEffect, useState } from 'react';
import { Router, Route, Switch} from 'react-router-dom';

import GlobalStyles from "./components/styles/global";
import Routes from './routes/index'

import history from './services/history'

// import more components
export default function App(props) {

    return(
        <Router history={history}>
            <Routes />
            <GlobalStyles />
        </Router>
    )
};

export const useFetch = (url) => {
    const [data, updateData] = useState(undefined);

    // empty array as second argument equivalent to componentDidMount
    useEffect(() => {
        async function fetchData() {
            const response = await fetch(url);
            const json = await response.json();
            if (json.success == true){
                updateData(JSON.parse(json.payload))
            }

        }
        fetchData();
    }, [url]);

    return data;
};

// handler for Ajax POST
export const useFetchData = (url, payload) => {
    const [res, setRes] = useState({data: null, error: null, isLoading: false});
    const [error, setError] = useState(null)
    // You POST method here
    const callAPI = useCallback(() => {
        setRes(prevState => ({...prevState, isLoading: true}));
        fetch(url, {
                method: 'POST',
                headers: {
                "Content-Type": "application/json",
                "Accept": "application/json",
                },
                body: payload
            }
        ).then(
            res => res.json()
        ).then(result => {
            setRes({data: result.data, isLoading: false, error: null});
        }).catch((error) => {
            setRes({data: null, isLoading: false, error});
})
    }, [url, payload])
    return [res, callAPI];
}
