import { render, screen } from '@testing-library/react';
import React from 'react';
import { Header } from '../../components/Header';

it("check 'logo' is rendered", () => {
  render(<Header/>);
  const el = screen.getByText(/ANIMELIST/);
  expect(el).toBeInTheDocument();
})