import './Sneaker.css'
import {Link, useHistory} from 'react-router-dom'
const Sneaker = ({name, description, style, brands, sizes, retailPrice, 
    colorway, prices, quantities, imageUrls, sneakerId}) => {
    let history = useHistory()
    
    const priceRange = () => {
        let low = Math.min(...prices)
        let high = Math.max(...prices)
        
        return low === high ? `${low}` : `${low} - $${high}`
    }

    const sizeRange = () => {
        return sizes.length === 1 ? `Size: ${sizes.toString()}`
        : `Sizes: ${sizes.toString()}`
    }

    const textClicked = (l) => {
        history.push(l)
    }

    return (
        <div className = "sneaker">
            
            <Link to = {`/sneaker/${sneakerId}`} >
                <img className = "sneaker_image" src = { imageUrls ? imageUrls[0] : ""} alt = "sneaker"/>
            </Link>
            <div className = "sneaker_info">
                <p onClick = {() => {textClicked(`/sneaker/${sneakerId}`)}} className = "sneaker_name">{name}</p>
                <p onClick = {() => {textClicked(`/sneaker/${sneakerId}`)}} className = "sneaker_description">{description}</p>
                <p onClick = {() => {textClicked(`/sneaker/${sneakerId}`)}} className = "sneaker_size">{sizeRange()}</p>
                <p onClick = {() => {textClicked(`/sneaker/${sneakerId}`)}} className = "sneaker_price">${priceRange()}</p>
            
            </div>
        </div>
    )
}

export default Sneaker
