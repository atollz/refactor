import React, { useState, useEffect, useCallback } from 'react';
import logo from './logo.svg';
import './App.css';

const vocabulary = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

const App = (): React.ReactElement => {

    const [items, setItems] = useState<string[]>([]);

    const newTitle = useCallback(() => {
        let title = '';

        for(let i=0; i<10; i++) {
            title += vocabulary[Math.floor(Math.random() * vocabulary.length)];
        }

        return title;
    }, []);

    const addItems = () => {
        let currAddedItemsCount = 0;

        const addItem = () => {
            setItems(prevItems => [...prevItems, newTitle()]);
            currAddedItemsCount++;

            if(currAddedItemsCount < 20) {
                //break large task in pieces
                setTimeout(addItem);
            }
        }

        addItem();
    }

    useEffect(() => {
        addItems();
    }, []);

    const renderItem = (item: string) => (
        <div key={ item } className="App-item">
            { `Title is: ${ item }!` }
        </div>
    );

    return (
        <div className="App">
            <div className="App-header">
                <img src={ logo } className="App-logo" alt="logo"/>
            </div>
            <div>
                <button className="App-button" onClick={ addItems }>
                    Add More
                </button>
            </div>
            <div>
                { items.map(renderItem) }
            </div>
        </div>
    );
}

export default App;
