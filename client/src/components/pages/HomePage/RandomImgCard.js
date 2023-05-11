import { Col } from "react-bootstrap"



const RandomImgCard = ({ alt_description, urls }) => {


    return (
        <Col sm={6} md={3} className="random-card-div">
            <Col className="random-card">
                <img src={urls.regular} alt={alt_description} /> 
            </Col>
        </Col>
    )
}


export default RandomImgCard


