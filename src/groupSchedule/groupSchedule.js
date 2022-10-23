import Day from '../day';
import React, {useState, useEffect} from 'react';
import "./groupSchedule.sass"

const GroupSchedule = ({curDate, isWeek, isEven}) => {
    let [data, setData] = useState([]);

    useEffect(() => {
        fetch("https://spsuitd-schedule-api.herokuapp.com/group?name=4-МД-15")
            .then(res => res.json())
            .then(info => setData(info[0].scheduleList))
    }, [data])
    
    const renderItems = () => {
        console.log(data)
        let weekDaysMap = {"ВС": 0, "ПН": 1, "ВТ": 2, "СР": 3, "ЧТ": 4, "ПТ": 5, "СБ": 6}
        let reverseWeekDayMap = {0: "ВС", 1: "ПН", 2: "ВТ", 3: "СР", 4: "ЧТ", 5: "ПТ", 6: "СБ"}
        let arr = isWeek ? [...data.filter(e => e.parity == isEven)] : [...data.filter(el => weekDaysMap[el.weekDay] === curDate.getDay() && el.parity == isEven)];
        let result = [];

        if (isWeek){
            for (let i = 0; i < 7; i++){
                let dayItems = arr.filter(el => el.weekDay === reverseWeekDayMap[i]);
    
                let weekDay = reverseWeekDayMap[i],
                    weekDays = getWeekDates(i);
    
                result.push(
                    <div key={i} className="day">
                        <div className="day__date">
                            <div>
                                <p>{weekDay}</p>
                                {/* <p>{weekDays}</p> */}
                            </div>
                        </div>
                        <div className="day__wrapper">
                            <Day id={i} subjects={dayItems}/>
                        </div>
                    </div>
                )
            }
        }else{
            if (arr.length == 0){
                arr.push({
                    weekDay: reverseWeekDayMap[curDate.getDay()],
                    building: "ДО",
                    room: "",
                    time: "Весь день",
                    subjectName: "Выходной, можешь отдыхать)"
                })
            }
            let weekDay = reverseWeekDayMap[curDate.getDay()],
                    weekDays = getWeekDates(weekDaysMap[arr[0].weekDay]);
            
            result.push(

                <div key={1} className="day">
                    <div className="day__date">
                        <p>{weekDay}</p>
                        {/* <p>{weekDays}</p> */}
                    </div>
                    <div>
                        <Day id={1} subjects={arr}/>
                    </div>
                </div>
            )
        }
        
        let temp = result.shift();
        result.push(temp);
        return result;
    }

    const getWeekDates = (id) => {
        id = id === 0 ? 7 : id;
        let diff = (curDate.getDay() - id),
            leftBorder = new Date(curDate.getFullYear(), curDate.getMonth(), (curDate.getDate() - diff));
        
        return isWeek ? `${leftBorder.getDate()}.${leftBorder.getMonth()+1}` : `${curDate.getDate()}.${curDate.getMonth()+1}`
    }

    return(
        <div className="schedule">{renderItems()}</div>
    )
}

export default GroupSchedule;