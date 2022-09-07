/* eslint-disable @next/next/no-img-element */
import Image from "next/image"
import Link from "next/link"

export const Card = ({
  cardType = '',
  cardData = null
}) => {
  return (
    <div>
      {
        cardType === "recommendation" && cardData && (
          <Link href={`/detail/${cardData['mal_id']}`}>
            <div className="card card-recommendation">
              <div className="card-image">
                <img src={cardData["image"]["image_url"]} alt={"recommendation-image"} />
              </div>
              <div className="card-body">
                <h3 className="card-title">{ cardData["title"] }</h3>
                <p className="card-description">{ cardData["description"] }</p>
              </div>
            </div>
          </Link>
        )
      }
      {
        cardType === "normal" && cardData && (
          <Link href={`/detail/${cardData['mal_id']}`}>
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
          </Link>
        )
      }
      {
        cardType === "character" && cardData && (
          <a>
            <div className="card card-character">
              <div className="card-image">
                <img src={cardData["character"]["images"]["webp"]["image_url"]} alt={"char-image"} />
                <img src={cardData["voice_actors"][0]["person"]["images"]["jpg"]["image_url"]} alt={"actor-image"} />
              </div>
              <div className="card-data">
                <p className="character">
                  {
                    cardData["character"]["url"] ? (
                      <a href={cardData["character"]["url"]} target="_blank" rel="noreferrer" >{ cardData["character"]["name"] }</a>
                    ) : (
                      <span>{ cardData["character"]["name"] }</span>
                    )
                  }
                </p>
                <p className="actor">
                  {
                    cardData["voice_actors"][0]["person"]["url"] ? (
                      <a href={cardData["voice_actors"][0]["person"]["url"]} target="_blank" rel="noreferrer" >{ cardData["voice_actors"][0]["person"]["name"] }</a>
                    ) : (
                      <span>{ cardData["voice_actors"][0]["person"]["name"] }</span>
                    )
                  }
                </p>
              </div>
            </div>
          </a>
        )
      }
    </div>
  )
}
