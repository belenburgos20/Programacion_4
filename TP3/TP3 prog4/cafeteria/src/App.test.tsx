import { render, screen, waitFor } from '@testing-library/react';
import App from './App';

test('muestra el menú inicial con productos (ej: Café)', async () => {
  render(<App />);

  await waitFor(() => {
    const items = screen.getAllByRole('listitem');
    expect(items.length).toBeGreaterThan(0);
  });

  expect(screen.getByText(/café/i)).toBeInTheDocument();
});