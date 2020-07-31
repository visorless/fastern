import React from 'react';
import { BrowserRouter, Route, Switch} from 'react-router-dom';

import Chat from './components/chat';
import Customers from './components/customers';
import Inventory from './components/inventory';
import Landing from './components/landing';

// import more components
export default function Routes(props){
    return(
        <BrowserRouter>
            <Switch>
                <Route exact path='/' component={Landing} />
                <Route path='/customers' component={Customers} />
                <Route path='/inventory' component={Inventory} />
                <Route path='/chat' component={Chat} />
            </Switch>
        </BrowserRouter>
    )
};
