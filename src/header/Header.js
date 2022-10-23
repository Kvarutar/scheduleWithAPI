import img from './logo.svg';
import './header.sass';

function Header(){
    
    return(
        <div className="header">
            <div className="header__link">
                <a 
                    href="https://portal.sutd.ru/stream/index.php?login=yes">
                        <img src={img} alt="logo"/>
                </a>
            </div>
            <p className="header__title">Расписание</p>
        </div>
    )
}

export default Header;