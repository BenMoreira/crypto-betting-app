import React from 'react';
import { render, screen } from '@testing-library/react';
import CrypDisp from '../components/CryptoList';

describe('CrypDisp component', () => {
  it('renders a list of crypto tokens', async () => {
    const selectCoin = jest.fn();
    render(<CrypDisp selectCoin={selectCoin} />);

    const tokenNames = [
      'bitcoin',
      'ethereum',
      'dogecoin',
      'litecoin',
      'solana',
      'monero',
      'optimism',
      'dash',
      'decentraland',
      'maker',
    ];

    // Wait for the API call to complete and update the component state
    await screen.findByText('$');

    tokenNames.forEach((tokenName) => {
      const tokenElement = screen.getByText(tokenName);
      expect(tokenElement).toBeInTheDocument();
    });
  });

  it('calls selectCoin function when a token is clicked', async () => {
    const selectCoin = jest.fn();
    render(<CrypDisp selectCoin={selectCoin} />);

    // Wait for the API call to complete and update the component state
    await screen.findByText('$');

    const bitcoinElement = screen.getByText('bitcoin');
    bitcoinElement.click();

    expect(selectCoin).toHaveBeenCalledWith('bitcoin');
  });
});
