import { describe, test, expect, vi } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react';
import { Button } from './Component'; 

describe('Button Component', () => {
  test('renders primary button with correct styles and label', () => {
    const onClickMock = vi.fn();
    render(<Button onClick={onClickMock} variant="primary" label="button" />);

    const buttonElement = screen.getByRole('button', { name: "button" });
    expect(buttonElement).toBeInTheDocument();
    expect(buttonElement).toHaveClass('rounded-lg px-6 py-3 font-medium bg-sky-900 text-white hover:bg-sky-800');
  });

  test('renders secondary button with correct styles and label', () => {
    const onClickMock = vi.fn();
    const label = "My Button"
    render(<Button onClick={onClickMock} variant="secondary" label={label} />);

    const buttonElement = screen.getByRole('button', { name: label });
    expect(buttonElement).toBeInTheDocument();
    expect(buttonElement).toHaveTextContent(label);
    expect(buttonElement).toHaveClass('rounded-lg border px-6 py-3 font-medium border-slate-200 bg-white text-slate-900 hover:bg-slate-50');
  });

  test('calls onClick handler when button is clicked', () => {
    const onClickMock = vi.fn();
    render(<Button onClick={onClickMock} variant="primary" label="button" />);

    const buttonElement = screen.getByRole('button', { name: "button"});
    fireEvent.click(buttonElement);
    expect(onClickMock).toHaveBeenCalledTimes(1);
  });

  test('renders button without label if label is not provided', () => {
    const onClickMock = vi.fn();
    render(<Button onClick={onClickMock} variant="primary" label="" />);

    const buttonElement = screen.getByRole('button');
    expect(buttonElement).toBeInTheDocument();
    expect(buttonElement).toHaveTextContent('');
  });
});