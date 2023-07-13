import react from 'react'
import './styles.css'
import payMoney from './images/payMoney.png'
const Modal = ({open}) => {
    if (!open) return null
    return(
        <div className='overlay'>
            <div className='modalContainer'>
            You need more coins!
            <img src={payMoney} alt="coins"/>
            </div>
           </div>
    )
}

export default Modal;