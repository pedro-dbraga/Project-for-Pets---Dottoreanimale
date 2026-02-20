import "../styles/account.css"
import editicon from "../assets/edit_square.svg"
export default function MenuConta(){

    
    return(
        <div className="accountbox">
            <div className="colordiv"></div>
            <div className="topcontent">
                <div className="accountheader">
                    <p>Pedro</p>
                    <p>pedro@gmail.com</p>
                </div>
                <img src={editicon} alt="" />
            </div>
            <div className="topcontent">
                <div>
                    <p>Name</p>
                    <p>Pedro</p>
                </div>
                <div>
                    <p>Email:</p>
                    <p>pedro@gmail.com</p>
                </div>
            </div>
            <div className="passcontent">
                <p>Senha:</p>
                <p>*********</p>
                <span>Mudar Senha</span>
            </div>
        </div>
    )
}