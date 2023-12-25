import { describe, it, expect, vi } from 'vitest';
import { render, screen, waitFor, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import Library from '../pages/Library';
import axios from 'axios';

vi.mock('axios', () => ({
  get: vi.fn(() => Promise.resolve({ data: mockFaturas }))
}));

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

describe('Library', () => {
    it('renders the library page', () => {
      render(<Library />);
      const titleElement = screen.getByText('Faturas');
      expect(titleElement).toBeInTheDocument();
    });

    it('renders search input and table', () => {
      render(<Library />);
      const inputElement = screen.getByPlaceholderText('Pesquise um número de cliente');
      const tableElement = screen.getByRole('table');
      expect(inputElement).toBeInTheDocument();
      expect(tableElement).toBeInTheDocument();
    });

    it('updates table on search', async () => {
      axios.get.mockResolvedValue({ data: mockFaturas });
      render(<Library />);
      const inputElement = screen.getByPlaceholderText('Pesquise um número de cliente');
      fireEvent.change(inputElement, { target: { value: '7202187422' } });
      await waitFor(() => {
        // Check that the table updates with mock data
      });
    });

    it('handles API errors gracefully', async () => {
      axios.get.mockRejectedValue(new Error('API error'));
      render(<Library />);
      await waitFor(() => {
        // Check how your component handles and displays the error
      });
    });

    // Additional tests for pagination and download functionality
});
