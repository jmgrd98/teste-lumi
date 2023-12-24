import { describe, it, expect, vi } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom';
import Dashboard from '../pages/Dashboard';
import axios from 'axios';

const mockFaturas = [
  {
    "id": 1,
		"numero_cliente": "7005400387",
		"mes_referencia": "JUN/2023",
		"energia_eletrica_quantidade": 50,
		"energia_eletrica_valor": 43.28,
		"energia_scee_quantidade": 1.007,
		"energia_scee_valor": 652.55,
		"energia_compensada_quantidade": 1.007,
		"energia_compensada_valor": -620,
		"contrib_ilum_publica": 43.28
  }
];

vi.mock('axios', () => ({
  get: vi.fn(() => Promise.resolve({ data: mockFaturas }))
}));

describe('Dashboard', () => {
  it('renders the dashboard title', () => {
    render(<Dashboard />);
    const titleElement = screen.getByText('Dashboard');
    expect(titleElement).toBeInTheDocument();
  });
});

  it('renders the customer number dropdown', () => {
    render(<Dashboard />);
    const dropdown = screen.getByRole('combobox');
    expect(dropdown).toBeInTheDocument();
    expect(screen.getByText('Selecione um número de cliente')).toBeInTheDocument();
  });

  it('shows no data initially in the charts', async () => {
    render(<Dashboard />);
    // Here you would check that the charts are empty or display a "no data" message
  });

  it('updates charts on selecting a customer number', async () => {
    render(<Dashboard />);
    const dropdown = screen.getByRole('combobox');
    userEvent.selectOptions(dropdown, "7005400387"); // Mock selection
    await waitFor(() => {
      // Check that the charts update with mock data
    });
  });
  
  it('clears charts on selecting no customer number', async () => {
    render(<Dashboard />);
    const dropdown = screen.getByRole('combobox');
    userEvent.selectOptions(dropdown, ""); // Select no customer number
    await waitFor(() => {
      // Check that the charts clear out
    });
  });
  
  it('handles API errors gracefully', async () => {
    axios.get.mockRejectedValue(new Error('API error'));
    render(<Dashboard />);
    await waitFor(() => {
      // Check how your component handles and displays the error
      const errorElement = screen.getByText(/API error/i);
      expect(errorElement).toBeInTheDocument();
    });
});

