/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @next/next/no-img-element */
import { NextPage } from 'next'
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react'
import { getAnimeById, getAnimeCharactersById } from '../../@core/services/anime';
import { Card } from '../../components/Card';
import { Layout } from '../../components/Layout';

const AnimeDetail: NextPage = () => {
 
  const [animeDetail, setAnimeDetail] = useState<any>(null);
  const [animeCharacters, setAnimeCharacters] = useState<any>(null);
  const statisticInfo = [
    { label: 'Ranked', key: 'rank', prefix: '', unit: '' },
    { label: 'Popularity', key: 'popularity', prefix: '#', unit: '' },
    { label: 'Favorites', key: 'favorites', prefix: '#', unit: '' },
    { label: 'Members', key: 'members', prefix: '', unit: 'user' },
    { label: 'Score', key: 'score', child: { label: 'Scored By', key: 'scored_by', prefix: '', unit: 'user' } },
  ];
  const generalInfo = [
    { label: 'Type', key: 'type', type: 'normal' },
    { label: 'Episodes', key: 'episodes', type: 'normal' },
    { label: 'Status', key: 'status', type: 'normal' },
    { label: 'Aired', key: 'aired', type: 'daterange' },
    { label: 'Premiered', key: 'year', type: 'normal' },
    { label: 'Producers', key: 'producers', type: 'array' },
    { label: 'Licensors', key: 'licensors', type: 'array' },
    { label: 'Studios', key: 'studios', type: 'array' },
    { label: 'Genres', key: 'genres', type: 'array' },
    { label: 'Demographics', key: 'demographics', type: 'array' },
    { label: 'Duration', key: 'duration', type: 'normal' },
    { label: 'Rating', key: 'rating', type: 'normal' },
  ];

  const router = useRouter();
  const { id } = router.query;
  useEffect(()=>{
    if(!router.isReady) return;
    getAnimeDetail();

  }, [router.isReady]);

  useEffect(() => {
  }, [])

  async function getAnimeDetail() {
    let runFinally = true;
    try {
      const res = await getAnimeById(id);
      setAnimeDetail(res.data);
    } catch (error) {
      console.error(error);
      runFinally = false;
    } finally {
      if (runFinally) {
        getAnimeCharacters();
      }
    }
  }

  async function getAnimeCharacters() {
    let runFinally = true;
    try {
      const res = await getAnimeCharactersById(id);
      let list = [];
      for (let i = 0; i < 10; i++) {
        if (res.data[i].role.toLowerCase() === 'main') {
          list.push(res.data[i]);
        }
      }
      list.sort((a,b) => (b.favorites - a.favorites));
      setAnimeCharacters(list);
    } catch (error) {
      console.error(error);
      runFinally = false;
    }
  }
  

  return (
    <div className='detail-container'>
      <Layout>
        {
          animeDetail && (
            <div className='anime-detail-container'>
              <div className='anime-detail'>
                <div className='container synopsis-container'>
                  <p className='info-title'>Synopsis</p>
                  <p className='synopsis-data'>{ animeDetail["synopsis"] }</p>
                </div>
                <div className='container background-container'>
                  <p className='info-title'>Background</p>
                  <p className='synopsis-data'>{ animeDetail["background"] }</p>
                </div>
                <div className='container character-container'>
                  <p className='info-title'>Characters and Voice Actors</p>
                  <div className='character-grid'>
                    {
                      animeCharacters && animeCharacters.map((char: any, index: number) => (
                        <div key={index} className="card-container">
                          <Card cardData={char} cardType={'character'} />
                        </div>
                      ))
                    }
                  </div>
                </div>
              </div>
              <div className='anime-info'>
                <div className='container anime-image-container'>
                  <img src={animeDetail["images"]["webp"]["large_image_url"]} alt="anime-image" />
                </div>
                <div className='container anime-statistic'>
                  <p className='info-title'>Statistic</p>
                  {
                    statisticInfo.map((stat) => (
                      <p key={stat.key} className='row-info stat-info'>
                        <span className='label stat-label'>{ stat.label }: </span>
                        <span className='data stat-data'>
                          { stat.prefix }{ (animeDetail[stat.key])?.toLocaleString() } { stat.unit }{ stat.unit && animeDetail[stat.key] > 1 ? 's' : '' }
                        </span>
                        {
                          stat.child && (
                            <span className='data stat-data'>
                              ({ stat.child.prefix }{ (animeDetail[stat.child.key])?.toLocaleString() } { stat.child.unit }{ stat.child.unit && animeDetail[stat.child.key] > 1 ? 's' : '' })
                            </span>
                          )
                        }
                      </p>
                    ))
                  }
                </div>
                <div className='container anime-information'>
                  <p className='info-title'>Information</p>
                  {
                    generalInfo.map((general: any) => (
                      <span key={general.key}>
                        {
                          general.type === 'normal' && (
                            <p className='row-info general-info'>
                              <span className='label general-label'>{ general.label }: </span>
                              <span className='data general-data'>
                                { general.key === 'year' ? animeDetail[general.key] : (animeDetail[general.key])?.toLocaleString() }
                              </span>
                            </p>
                          )
                        }
                        {
                          general.type === 'array' && (
                            <p className='row-info general-info'>
                              <span className='label general-label'>{ general.label }: </span>
                              {
                                animeDetail[general.key].map((data: any, index: number) => (
                                  <span className='data general-data' key={data.name}>
                                    {
                                      data.url ? (
                                        <span>
                                          <a href={data.url} target="_blank" rel="noreferrer">{ data.name }</a>{ `${index === (animeDetail[general.key].length - 1) ? '' : ', '}` }
                                        </span>
                                      ) : (
                                        <span>{ `${data.name}${index === (animeDetail[general.key].length - 1) ? '' : ', '}` }</span>
                                      )
                                    }
                                  </span>
                                ))
                              }
                            </p>
                          )
                        }
                      </span>
                    ))
                  }
                </div>
              </div>
            </div>
          )
        }
      </Layout>
    </div>
  )
}

export default AnimeDetail;

