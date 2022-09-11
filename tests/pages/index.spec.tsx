import { render, screen, waitFor, waitForElementToBeRemoved } from '@testing-library/react';
import React from 'react';
import Home from '../../pages';
import { getAnimeRecommendations } from '../../@core/services/recommendation'
import { getAnimeSearch } from '../../@core/services/search';
import { act } from 'react-dom/test-utils';

jest.mock('../../@core/services/recommendation');
const MockGetAnimeRecommendations = jest.mocked(getAnimeRecommendations);
jest.mock('../../@core/services/search');
const MockGetAnimeSearch = jest.mocked(getAnimeSearch);

jest.useFakeTimers();

describe('Home', () => {
  beforeAll(() => {
    MockGetAnimeRecommendations.mockResolvedValue(
      {
        data : [
          {
            mal_id: "37979-50709",
            entry: [
              {
                mal_id: 37979,
                url: "https://myanimelist.net/anime/37979/Mahou_Shoujo_Tokushusen_Asuka",
                images: {
                  jpg: {
                    image_url: "https://cdn.myanimelist.net/images/anime/1278/112932.jpg",
                    small_image_url: "https://cdn.myanimelist.net/images/anime/1278/112932t.jpg",
                    large_image_url: "https://cdn.myanimelist.net/images/anime/1278/112932l.jpg"
                  },
                  webp: {
                    image_url: "https://cdn.myanimelist.net/images/anime/1278/112932.webp",
                    small_image_url: "https://cdn.myanimelist.net/images/anime/1278/112932t.webp",
                    large_image_url: "https://cdn.myanimelist.net/images/anime/1278/112932l.webp"
                  }
                },
                title: "Mahou Shoujo Tokushusen Asuka"
              },
              {
                mal_id: 50709,
                url: "https://myanimelist.net/anime/50709/Lycoris_Recoil",
                images: {
                    jpg: {
                      image_url: "https://cdn.myanimelist.net/images/anime/1392/124401.jpg",
                      small_image_url: "https://cdn.myanimelist.net/images/anime/1392/124401t.jpg",
                      large_image_url: "https://cdn.myanimelist.net/images/anime/1392/124401l.jpg"
                    },
                    webp: {
                      image_url: "https://cdn.myanimelist.net/images/anime/1392/124401.webp",
                      small_image_url: "https://cdn.myanimelist.net/images/anime/1392/124401t.webp",
                      large_image_url: "https://cdn.myanimelist.net/images/anime/1392/124401l.webp"
                    }
                },
                title: "Lycoris Recoil"
              }
            ],
            content: "Do you like yuri? Do you crave violence? Especially with guns? Well do I have the show for you.",
            date: "2022-09-10T09:18:57+00:00",
            user: {
              url: "https://myanimelist.net/profile/SanaeK10",
              username: "SanaeK10"
            }
          }
        ]
      }
    );
    MockGetAnimeSearch.mockResolvedValue(
      {
        data: [
          {
            mal_id: 1,
            url: "https://myanimelist.net/anime/1/Cowboy_Bebop",
            images: {
              jpg: {
                image_url: "https://cdn.myanimelist.net/images/anime/4/19644.jpg",
                small_image_url: "https://cdn.myanimelist.net/images/anime/4/19644t.jpg",
                large_image_url: "https://cdn.myanimelist.net/images/anime/4/19644l.jpg"
              },
              webp: {
                image_url: "https://cdn.myanimelist.net/images/anime/4/19644.webp",
                small_image_url: "https://cdn.myanimelist.net/images/anime/4/19644t.webp",
                large_image_url: "https://cdn.myanimelist.net/images/anime/4/19644l.webp"
              }
            },
            titles: [
              {
                typ: "Default",
                title: "Cowboy Bebop"
              },
              {
                type: "Japanese",
                title: "カウボーイビバップ"
              },
              {
                type: "English",
                title: "Cowboy Bebop"
              }
            ],
            title: "Cowboy Bebop",
            title_english: "Cowboy Bebop",
            title_japanese: "カウボーイビバップ",
            status: "Finished Airing",
            score: 8.75,
            synopsis: "Crime is timeless. By the year 2071, humanity has expanded across the galaxy, filling the surface of other planets with settlements like those on Earth. These new societies are plagued by murder, drug use, and theft, and intergalactic outlaws are hunted by a growing number of tough bounty hunters. Spike Spiegel and Jet Black pursue criminals throughout space to make a humble living. Beneath his goofy and aloof demeanor, Spike is haunted by the weight of his violent past. Meanwhile, Jet manages his own troubled memories while taking care of Spike and the Bebop, their ship. The duo is joined by the beautiful con artist Faye Valentine, odd child Edward Wong Hau Pepelu Tivrusky IV, and Ein, a bioengineered Welsh Corgi. While developing bonds and working to catch a colorful cast of criminals, the Bebop crew's lives are disrupted by a menace from Spike's past. As a rival's maniacal plot continues to unravel, Spike must choose between life with his newfound family or revenge for his old wounds. [Written by MAL Rewrite]",
          }
        ],
        pagination: {
          last_visible_page: 2102,
          has_next_page: true,
          current_page: 1,
          items: {
              count: 12,
              total: 25218,
              per_page: 12
          }
        }
      }
    );
  });
  beforeEach(async () => {
    render(<Home />);
  });
  
  it("check 'recommendation-list' and 'search-list' are rendered", async () => {
    jest.runAllTimers();
    const data = await screen.findByTestId('recommendation-list');
    expect(data).toBeTruthy();
  });
});
