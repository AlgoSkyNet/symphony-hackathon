import React from 'react';
import { render } from 'react-dom';
import PriceGrid from './components/PriceGrid';

function App() {
    return(
        <div>
            <PriceGrid start='2001-01-29' end='2001-02-04' ticker='A'/>
        </div>
    )
}

render(
    <App />,
    document.getElementById('root')
)
