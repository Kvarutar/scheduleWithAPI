import "./day.sass"

String.prototype.hashCode = function() {
    var hash = 0,
      i, chr;
    if (this.length === 0) return hash;
    for (i = 0; i < this.length; i++) {
      chr = this.charCodeAt(i);
      hash = ((hash << 5) - hash) + chr;
      hash |= 0; // Convert to 32bit integer
    }
    return hash;
  }

const Day = ({subjects}) => {

    let dayTimes = ["10:05-11:30", "11:40-13:05", "13:45-15:10", "15:20-16:45", "16:55-18:20"];

    const getDaySchedule = () => {
        let arr = [...subjects];

        if (arr.length === 0){
            return (
                <div key={1} className="info">
                    <div className="info__when">Весь день</div>
                    <div className="info__where">
                        ДО
                    </div>
                    <div className="info__what">Выходной, можешь отдыхать)</div>
                </div>
            )
        }

        arr.sort((a, b) => {
            if (a.time < b.time){
                return -1;
            }
            if (a.time > b.time){
                return 1;
            }
            return 0;
        })

        return arr.map(el => {
            let {time, room, building, subjectName} = el;

            let strId = time + building + subjectName;

            return (
                <div key={strId.hashCode()+room} className="info">
                    <div className="info__when">{time}</div>
                    <div className="info__where">
                        {building}
                        {room}
                    </div>
                    <div className="info__what">{subjectName}</div>
                </div>
            )
        })
    }

    return(
        
            getDaySchedule()
        
    )
}

export default Day;