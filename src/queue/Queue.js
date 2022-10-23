import React, {useEffect, useState, useRef, useCallback} from 'react';

const Queue = ({}) =>{
    let [queue, setQueue] = useState([]);
    const ws = useRef(null);

    useEffect(() => {
        
        ws.current = new WebSocket("ws://localhost:8080/"); // создаем ws соединение

        gettingData();
        
        return () => ws.current.close(); // кода меняется isPaused - соединение закрывается
    }, [ws]);

    const gettingData = useCallback(() => {
        if (!ws.current) return;

        ws.current.onmessage = e => {                //подписка на получение данных по вебсокету
            const message = JSON.parse(e.data);
            setQueue(message);
            console.log(message)
        };
    });

    return(
        <div></div>
    )
    
}

export default Queue;