/* eslint-disable @next/next/no-img-element */
import Image from "next/image"

export const Card = ({
  cardType = '',
  cardData = {
    title: '',
    image: { image_url: '' },
    description: ''
  }
}) => {
  return (
    <div>
      {
        cardType === "recommendation" && cardData.title && cardData.image && cardData.description && (
          <div className="card card-recommendation">
            <div className="card-image">
              <img src={cardData.image.image_url} alt={"recommendation-image"} />
            </div>
            <div className="card-body">
              <h3 className="card-title">{ cardData.title }</h3>
              <p className="card-description">{ cardData.description }</p>
            </div>
          </div>
        )
      }
    </div>
  )
}
