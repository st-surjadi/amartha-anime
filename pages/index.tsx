import type { NextPage } from 'next'
import Head from 'next/head'
import { useEffect, useRef, useState } from 'react'
import { Card } from '../components/Card'
import { Layout } from '../components/Layout';
import { getAnimeRecommendations } from '../@core/services/recommendation';
import { Recommendation } from '../@core/interfaces/recommendation';
import { getAnimeSearch } from '../@core/services/search';
import { SearchBar } from '../components/SearchBar';
import { Pagination } from '../components/Pagination';

const Home: NextPage = () => {
  
  const [recList, setRecList] = useState<Recommendation[] | any[]>([]);
  const [animeList, setAnimeList] = useState<any[]>([]);

  const [isLoadingList, setIsLoadingList] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [statePagination, setStatePagination] = useState<any>({
    currentPage: 1,
    totalPage: 0
  });

  const inputSearch = useRef() as React.MutableRefObject<HTMLInputElement>;

  const skeletonList = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
  const skeletonRecommendation = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
  
  const onClickSearch = async () => {
    if (statePagination.currentPage === 1) {
      getAnimeListSearch();

    } else {
      setStatePagination({...statePagination, currentPage: 1});
    }
  }

  useEffect(() => {
    getHomeData();
  }, []);

  useEffect(() => {
    getAnimeListSearch();
  }, [statePagination.currentPage]);

  async function getHomeData() {
    setIsLoading(true);
    setIsLoadingList(true);
    try {
      await getAnimeRec();
      await getAnimeList();
      
    } catch (error) {
      console.error(error);
      setIsLoading(false);
      setIsLoadingList(false);
      setStatePagination({
        currentPage: 1,
        totalPage: 0
      });

    } finally {
      setTimeout(() => {
        setIsLoading(false);
        setIsLoadingList(false);
      }, 1000)
    }
  }

  const onChangePage = async (page: number) => {
    setStatePagination({...statePagination, currentPage: page});
  }

  async function getAnimeList() {
    try {
      let params = {
        page: statePagination.currentPage,
        limit: 12,
        q: inputSearch.current.value,
      }
      const res = await getAnimeSearch(params);
      setAnimeList(res.data);
      setStatePagination({
        ...statePagination, totalPage: res.pagination.last_visible_page
      });
    } catch (error) {
      console.error(error);
    }
  }

  async function getAnimeListSearch() {
    setIsLoadingList(true);
    try {
      let params = {
        page: statePagination.currentPage,
        limit: 12,
        q: inputSearch.current.value,
      }
      const res = await getAnimeSearch(params);
      setAnimeList(res.data);
      setStatePagination({
        ...statePagination, totalPage: res.pagination.last_visible_page
      });
    } catch (error) {
      console.error(error);
      setIsLoadingList(false);

    } finally {
      setTimeout(() => {
        setIsLoadingList(false);
      }, 1000)
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
            description: content.charAt(0).toUpperCase() + content.slice(1),
            mal_id: res.data[i].entry[0].mal_id
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
                isLoading && skeletonRecommendation.map((skeleton, index) => (
                  <div key={index} className='skeleton recommendation-list'></div>
                ))
              }
              {
                !isLoading && recList.map((rec, index) => (
                  <div key={index} className="card-container">
                    <Card cardType='recommendation' cardData={rec} />
                  </div>
                ))
              }
            </div>
          </div>
            <div className='search-bar-column-container'>
              {
                isLoading && (
                  <>
                    <div className='skeleton pagination-search'></div>
                    <div className='skeleton pagination-search'></div>
                  </>
                )
              }
              {
                !isLoading && (
                  <>
                    <Pagination statePagination={statePagination} onChangePage={onChangePage} ></Pagination>
                    <SearchBar inputSearch={inputSearch} onClickSearch={onClickSearch} isLoading={isLoading} />
                  </>
                )
              }
            </div>
          <div className='column column-search-list'>
            {
              isLoadingList && skeletonList.map((skeleton, index) => (
                <div key={index} className='skeleton search-list'></div>
              ))
            }
            {
              !isLoadingList && animeList.map((anime, index) => (
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
