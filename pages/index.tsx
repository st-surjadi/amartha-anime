import type { NextPage } from 'next'
import Head from 'next/head'
import { useEffect, useState } from 'react'
import { Card } from './components/Card'
import { Layout } from './components/Layout';
import { getAnimeRecommendations } from '../@core/services/recommendation';
import { Recommendation } from '../@core/interfaces/recommendation';
import { getAnimeSearch } from '../@core/services/search';

const Home: NextPage = () => {
  
  const [recList, setRecList] = useState<Recommendation[] | any[]>([]);
  const [animeList, setAnimeList] = useState<any[]>([]);

  useEffect(() => {
    getAnimeRec();
    getAnimeList();
  }, []);

  async function getAnimeList() {
    try {
      let params = {
        page: 1,
        limit: 12,
        q: '',
      }
      const res = await getAnimeSearch(params);
      setAnimeList(res.data);
    } catch (error) {
      console.error(error);
    }
  }

  async function getAnimeRec() {
    try {
      const res = await getAnimeRecommendations();
      let list = [];
      for (let i = 0; i < res.data.length; i++) {
        let index = list.findIndex(data => data.title === res.data[i].entry[0].title);
        if (index < 0) {
          let content = res.data[i].content;
          list.push({
            title: res.data[i].entry[0].title,
            image: res.data[i].entry[0].images.jpg,
            description: content.charAt(0).toUpperCase() + content.slice(1)
          });
        }
        if (list.length === 10) {
          break;
        }
      }
      setRecList(list);
      
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <div>
      <Head>
        <title>Amartha Anime | Steven Surjadi</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Layout>
        <div className='home-container'>
          <div className='column column-recommendation'>
            <div className='recommendation-container'>
              <h3>Recommendations</h3>
              {
                recList.map((rec, index) => (
                  <div key={index} className="card-container">
                    <Card cardType='recommendation' cardData={rec} />
                  </div>
                ))
              }
            </div>
          </div>
          <div className='column column-search-list'>
            {
              animeList.map((anime, index) => (
                <div key={index} className='card-container'>
                  <Card cardType='normal' cardData={anime} />
                </div>
              ))
            }
          </div>
        </div>
      </Layout>
    </div>
  )
}

export default Home
