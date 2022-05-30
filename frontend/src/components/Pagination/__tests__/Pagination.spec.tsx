import { fireEvent, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Pagination from '..';

describe('Pagination tests', () => {
  test('Pagination should render', () => {
    const pageCount = 3;
    const range = 3;

    render(<Pagination pageCount={pageCount} range={range} />);

    const page1 = screen.getByText('1');
    const page2 = screen.getByText('2');
    const page3 = screen.getByText('3'); //getBy throw error if 0 matches
    const page4 = screen.queryByText('4'); //queryBy return null if 0 matches

    expect(page1).toBeInTheDocument();
    expect(page1).toHaveClass('pag-active');

    expect(page2).toBeInTheDocument();
    expect(page2).not.toHaveClass('pag-active');

    expect(page3).toBeInTheDocument();
    expect(page3).not.toHaveClass('pag-active');

    expect(page4).not.toBeInTheDocument();
  });

  test('next arrow should call onChange', async () => {
    const pageCount = 3;
    const range = 3;
    const onChange = jest.fn();

    render(
      <Pagination pageCount={pageCount} range={range} onChange={onChange} />
    );

    const arrowNext = screen.getByTestId('arrow-next');
    await userEvent.click(arrowNext);
    expect(onChange).toHaveBeenCalledWith(1);
  });

  test('previous arrow should call onChange', async () => {
    const pageCount = 3;
    const range = 3;
    const forcePage = 1;
    const onChange = jest.fn();

    render(
      <Pagination
        pageCount={pageCount}
        range={range}
        onChange={onChange}
        forcePage={forcePage}
      />
    );

    const arrowPrevious = screen.getByTestId('arrow-previous');
    await userEvent.click(arrowPrevious);
    expect(onChange).toHaveBeenCalledWith(0);
  });

  test('page link should call onChange', async () => {
    const pageCount = 3;
    const range = 3;
    const onChange = jest.fn();

    render(
      <Pagination pageCount={pageCount} range={range} onChange={onChange} />
    );

    const page2 = screen.getByText('2');
    await userEvent.click(page2);
    expect(onChange).toHaveBeenCalledWith(1);
  });
});
