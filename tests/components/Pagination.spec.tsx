import { render, screen, fireEvent } from '@testing-library/react';
import React from 'react';
import { Pagination } from '../../components/Pagination';

describe('Pagination', () => {
  const MockStatePagination = {
    currentPage: 1,
    totalPage: 2
  };
  const MockOnChangePage = jest.fn();
  beforeEach(() => {
    render(<Pagination isLoading={false} onChangePage={MockOnChangePage} statePagination={MockStatePagination} />);
  });
  
  it("should check 'onChangePage' method to be called after button 'Next' is clicked", () => {
    fireEvent.click(screen.getByRole('button', { name: 'Next' }));
    expect(MockOnChangePage).toBeCalled();
  });

  it("should check 'onChangePage' method to be called after button 'Prev' is clicked", () => {
    fireEvent.click(screen.getByRole('button', { name: 'Prev' }));
    expect(MockOnChangePage).toBeCalled();
  });
});