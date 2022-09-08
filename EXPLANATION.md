This application contains of two main pages, which are the Home Page and the Anime Detail Page. These two pages use the same shared component Layout.

Home Page consists of two column. The first column showed Anime Recommendation List which is fetched from '/recommendations/anime'.
The second column showed the requested Anime List which has pagination and search capabilities. Because the fetching process requires some time, I created the components' skeleton for the loading view on this page.

Anime Detail Page also consists of two column. The first column showed the anime's synopsis, background (if data available), characters and voice actors (which can open a new tab to its MAL page). The second column showed its image, statistics and general informations. I decided to use arrays (of keys) for the statistics and general informations to improve maintainability.

For improvement, this project only has minimum unit testing. I haven't been able to test imported async function (axios data-fetching services). This is the first time I used Jest for Nextjs unit testing as I usually uses Jasmine/Karma in Angular for my TDD project.