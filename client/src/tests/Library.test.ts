import { describe, it, expect, vi } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import Library from '../pages/Library';
import axios from 'axios';

vi.mock('axios');

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
      axios.get.mockResolvedValue({ data: [/* mocked data here */] });
      render(<Library />);
      // Here you would simulate typing in the search field and check the table updates
    });
  
    it('handles API errors gracefully', async () => {
      axios.get.mockRejectedValue(new Error('API error'));
      render(<Library />);
      await waitFor(() => {
        // Check how your component handles and displays the error
      });
    });
  
    // You might also want to test the pagination behavior and the download link functionality
  });
  