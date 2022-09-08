import { render, screen, waitFor } from '@testing-library/react';
import React from 'react';
import Home from '../../pages';

describe('Home', () => {
  beforeEach(async () => {
    render(<Home />)
  });
  
  it("check 'skeleton' element is rendered", () => {
    const skeletonRecommendationList = screen.queryAllByTestId('skeleton-recommendation-list');
    const skeletonSearchList = screen.queryAllByTestId('skeleton-search-list');
    const skeletonPaginationSearch = screen.queryAllByTestId('skeleton-pagination-search');

    expect(skeletonRecommendationList[0]).toBeInTheDocument();
    expect(skeletonSearchList[0]).toBeInTheDocument();
    expect(skeletonPaginationSearch[0]).toBeInTheDocument();
  });
});
