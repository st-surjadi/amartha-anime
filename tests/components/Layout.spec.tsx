import { render, screen } from '@testing-library/react';
import React from 'react';
import { Layout } from '../../components/Layout';


describe('Layout', () => {
  beforeEach(() => {
    render(<Layout><div>MockComponent</div></Layout>);
  });
  
  it("check 'children', 'Header' and 'Footer' component is rendered", () => {
    const headerElement = screen.getByText(/ANIMELIST/);
    const footerElement = screen.getByText(/copyright © 2022 amartha anime \| steven surjadi/i);
    const childrenElement = screen.getByText(/mockcomponent/i);

    expect(headerElement).toBeInTheDocument();
    expect(footerElement).toBeInTheDocument();
    expect(childrenElement).toBeInTheDocument();
  });
});