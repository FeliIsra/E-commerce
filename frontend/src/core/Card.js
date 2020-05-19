import React from 'react'
import { Link } from 'react-router-dom'
import ShowImage from "./ShowImage";

const Card = ({product, showViewProductButton = true}) => {

	const ShowViewButton = showViewProductButton => {
		return (
			showViewProductButton && (
				<Link to={`/product/${product._id}`}>
					<button className="btn btn-outline-primary mt-2 mb-2 mr-2">
						View product
					</button>
				</Link>
			)
		)
	}

	return(
			<div className="card">
				<div className="card-header">{product.name}</div>
				<div className="card-body">
					<ShowImage item={product} url={'product'} />
					<p>{product.description.substring(0, 100)}</p>
					<p>${product.price}</p>
					{ShowViewButton(showViewProductButton)}
					<button className="btn btn-warning mt-2 mb-2">
						Add to cart
					</button>					
				</div>
			</div>
	)
}

export default Card