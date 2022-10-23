import left from "./Arrow_left.svg";
import right from "./Arrow_right.svg";
import calendar_icon from "./Calendar.svg";
import queue_icon from "./Queue.svg";
import edit_icon from "./edit.svg";
import './calendar.sass';

const Calendar = ({curDate, updateDate, isWeek ,updateIsWeek}) => {
    
    const calculateWeekBorders = () => {
        let leftBorder = curDate.getDay() - 1,
            rightBorder = 7 - curDate.getDay(),
            leftDate = new Date(curDate.getFullYear(), curDate.getMonth(), curDate.getDate()-leftBorder),
            rightDate = new Date(curDate.getFullYear(), curDate.getMonth(), curDate.getDate()+rightBorder);

        return `${leftDate.getDate()}.${leftDate.getMonth()+1} - ${rightDate.getDate()}.${rightDate.getMonth()+1}`
    }

    const shift = (days) => {
        updateDate(curDate.getFullYear(), curDate.getMonth(), (curDate.getDate()+days))
    }

    let shiftStep = isWeek ? 7 : 1,
        borders = isWeek ? calculateWeekBorders() : `${curDate.getDate()}.${curDate.getMonth()+1}`,
        weekBtnClass = isWeek ? "calendar__switcher-btn calendar__switcher-btn_active" : "calendar__switcher-btn",
        dayBtnClass = isWeek ? "calendar__switcher-btn" : "calendar__switcher-btn calendar__switcher-btn_active";
       
    
    return(
        <div className="calendar">
            <div className="calendar__dates">
                <button className="calendar-arrow" onClick={() => shift(-shiftStep)}><img src={left} alt="left"/></button>
                <div className="calendar__borders">{borders}</div>
                <button className="calendar-arrow" onClick={() => shift(shiftStep)}><img src={right} alt="right"/></button>
            </div>
            <div className="calendar__switcher">
                <button className={weekBtnClass} onClick={() => updateIsWeek(true)}>По неделям</button>
                <button className={dayBtnClass} onClick={() => updateIsWeek(false)}>По дням</button>
            </div>
            <div className="calendar__btns">
                <div>
                    <button className="calendar__calendar"><img src={calendar_icon} alt="calendar"/></button>
                    <button className="calendar__queue"><img src={queue_icon} alt="left"/></button>
                </div>
                    <button className="calendar__edit"><img src={edit_icon} alt="left"/></button>
            </div>
        </div>
    )
}

export default Calendar;