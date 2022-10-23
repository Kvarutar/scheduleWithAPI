import React, {useEffect, useState} from 'react';
import Calendar from '../calendar';
import GroupSchedule from '../groupSchedule';
import Queue from '../queue';

let Schedule = () => {
    const [curDate, setCurDate] = useState(new Date()),
          [isEven, setIsEven] = useState(false),
          [isWeek, setIsWeek] = useState(true);

    useEffect(() => {
        let zeroDate = new Date(2022, 0, 2);
        setIsEven(Math.ceil((curDate-zeroDate)/(1000*60*60*24*7)) % 2 === 0 ? true : false) 
    }, [curDate, isEven, isWeek])

    const updateIsWeek = (t) => {
        setIsWeek(t);
        setToday();
    }

    const updateDate = (year, month, day) => {
        setCurDate(new Date(year, month, day))
    }

    const setToday = () => {
        setCurDate(new Date())
    }

    return(
        <>
            <div className="container">
                <Calendar curDate={curDate} updateDate={updateDate} updateIsWeek={updateIsWeek} isWeek={isWeek} setToday={setToday}/>
                <GroupSchedule curDate={curDate} isWeek={isWeek} isEven={isEven}/>
                <Queue/>
            </div>
        </>
    )
}

export default Schedule

