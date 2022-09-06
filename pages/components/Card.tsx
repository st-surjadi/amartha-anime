/* eslint-disable @next/next/no-img-element */
import Image from "next/image"

export const Card = ({
  cardType = '',
  cardData = null
}) => {
  return (
    <div>
      {
        cardType === "recommendation" && cardData && (
          <div className="card card-recommendation">
            <div className="card-image">
              <img src={cardData["image"]["image_url"]} alt={"recommendation-image"} />
            </div>
            <div className="card-body">
              <h3 className="card-title">{ cardData["title"] }</h3>
              <p className="card-description">{ cardData["description"] }</p>
            </div>
          </div>
        )
      }
      {
        cardType === "normal" && cardData && (
          <div className="card card-normal">
            <div className="card-image">
              <img src={cardData["images"]["webp"]["large_image_url"]} alt={"anime-image"} />
            </div>
            <div className="card-body">
              <h3 className="card-text card-title">{ cardData["title"] }</h3>
              <p className="card-text card-description">{ cardData["synopsis"] }</p>
              <div className="card-status-score">
                <p className="card-status">{ cardData["status"] }</p>
                <p className="card-score"><img src="/images/star.png" alt="star-image" />{ cardData["score"] }</p>
              </div>
            </div>
          </div>
        )
      }
    </div>
  )
}
