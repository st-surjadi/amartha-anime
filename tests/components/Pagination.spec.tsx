import { render, screen, fireEvent } from '@testing-library/react';
import React from 'react';
import { Pagination } from '../../components/Pagination';

it("check 'onChangePage' method to be called after button 'Next' is clicked", () => {
  const MockStatePagination = {
    currentPage: 1,
    totalPage: 2
  };
  const MockOnChangePage = jest.fn();
  render(<Pagination onChangePage={MockOnChangePage} statePagination={MockStatePagination} />);

  fireEvent.click(screen.getByRole('button', { name: 'Next' }));

  expect(MockOnChangePage).toBeCalled();
});

it("check 'onChangePage' method to be called after button 'Prev' is clicked", () => {
  const MockStatePagination = {
    currentPage: 2,
    totalPage: 2
  };
  const MockOnChangePage = jest.fn();
  render(<Pagination onChangePage={MockOnChangePage} statePagination={MockStatePagination} />);

  fireEvent.click(screen.getByRole('button', { name: 'Prev' }));

  expect(MockOnChangePage).toBeCalled();
});