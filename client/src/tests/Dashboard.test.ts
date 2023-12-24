import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import Dashboard from '../pages/Dashboard';
import axios from 'axios';

vi.mock('axios');

describe('Dashboard', () => {
  it('renders the dashboard title', () => {
    render(<Dashboard />);
    const titleElement = screen.getByText('Dashboard');
    expect(titleElement).toBeInTheDocument();
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
    axios.get.mockResolvedValue({ data: [/* mocked data here */] });
    render(<Dashboard />);
    // Here you would simulate selecting a customer number and check the charts update
  });

  it('clears charts on selecting no customer number', async () => {
    axios.get.mockResolvedValue({ data: [/* mocked data here */] });
    render(<Dashboard />);
    // Here you would simulate selecting the "no customer number" option and check the charts clear
  });

  it('handles API errors gracefully', async () => {
    axios.get.mockRejectedValue(new Error('API error'));
    render(<Dashboard />);
    await waitFor(() => {
      // Check how your component handles and displays the error
    });
  });
});

