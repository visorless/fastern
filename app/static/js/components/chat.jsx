import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useFetch } from '../app';

export default function Chat(){
        const result = useFetch('/get_users');

        let dataArr = [];
        if (result){
            for (let each in result){
                dataArr.push(
                    <div>{result[each]['username']}</div>
                )
            }
        }
    return (
        <div>
            <h1>Chat!</h1>
            <div>
                Go to:
                <ul>
                    <li><Link to="/customers">customers</Link></li>
                    <li><Link to="/inventory">inventory</Link></li>
                    <li><Link to="/">Landing</Link></li>
                </ul>
            </div>
            <div>
                <h3>Current Users:</h3>
                {dataArr}
            </div>
        </div>
    )
}

// {
//     "firstname" : "test",
//     "lastname" : "Example",
//     "email" : "testExample@example.com",
//     "username" : "test_example",
//     "admin" : false,
//     "pass" : "",
//     "created" : Date()
// }
