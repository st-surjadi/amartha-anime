import { render, screen } from '@testing-library/react';
import React from 'react';
import { Header } from '../../components/Header';

describe('Header', () => {
  beforeEach(() => {
    render(<Header/>);
  });
  
  it("should check 'logo' is rendered", () => {
    const el = screen.getByText(/ANIMELIST/);
    expect(el).toBeInTheDocument();
  });
});