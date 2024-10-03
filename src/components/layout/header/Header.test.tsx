import React from 'react';
import { render, screen } from '@testing-library/react';
import Header from './Header';

test('whether an Icon button displays under a certain width', () => {
  render(<Header />);
  // screen.getByText();
  
  const linkElement = screen.getByText(/learn react/i);
  expect(linkElement).toBeInTheDocument();
});

// Export below creates this file as a module and avoids TypeScript error 
export {}
