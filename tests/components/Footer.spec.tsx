import { render, screen } from '@testing-library/react';
import React from 'react';
import { Footer } from '../../components/Footer';


describe('Footer', () => {
  beforeEach(() => {
    render(<Footer/>);
  });
  
  it("check 'footer text' is rendered", () => {
    const el = screen.getByText(/copyright © 2022 amartha anime \| steven surjadi/i);
    expect(el).toBeInTheDocument();
  });
});