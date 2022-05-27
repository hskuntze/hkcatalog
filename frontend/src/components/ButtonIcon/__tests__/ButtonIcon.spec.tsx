import { render, screen } from '@testing-library/react';
import ButtonIcon from '..';

test('ButtonIcon should render button with given text', () => {
  const string = 'Login maneiro';

  render(<ButtonIcon text={string} />);

  expect(screen.getByText(string)).toBeInTheDocument();
});
