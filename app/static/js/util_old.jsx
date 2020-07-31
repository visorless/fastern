import React, { useState, useEffect } from 'react';

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
