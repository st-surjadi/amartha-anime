import { render, screen } from '@testing-library/react';
import React from 'react';
import { Footer } from '../../components/Footer';

it("check 'footer text' is rendered", () => {
  render(<Footer/>);
  const el = screen.getByText(/copyright © 2022 amartha anime \| steven surjadi/i);
  expect(el).toBeInTheDocument();
})