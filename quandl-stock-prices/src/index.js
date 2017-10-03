import React from 'react';
import { render } from 'react-dom';
import PriceGrid from './components/PriceGrid';

function App() {
    return(
        <div>
            <PriceGrid start='2017-09-05' end='2017-10-02' ticker='A'/>
        </div>
    )
}

render(
    <App />,
    document.getElementById('root')
)
