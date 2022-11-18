
import { FaArrowLeft } from "react-icons/fa";
import compassCSS from '../styles/compass.module.css'

const CompassArrow = ({ degree, color }) => {
    return (<div className = {compassCSS.container} > 
    <div><FaArrowLeft fontSize={18} style = {{"transform": "rotateZ("+degree+"deg)", "color": color}}/></div>
    <p style = {{"color": color}}> The wind direction is {degree} degrees </p>
  </div>)
};

export default CompassArrow;