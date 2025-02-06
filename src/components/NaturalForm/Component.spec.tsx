import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { NaturalForm } from "./Component";
import { useCredit } from "@/context/CreditContext";
import { useNavigate } from "react-router-dom";
import { vi, type Mock } from "vitest";
vi.mock("@/context/CreditContext", () => ({
  useCredit: vi.fn(),
}));

vi.mock("react-router-dom", () => ({
  useNavigate: vi.fn(),
}));

describe("NaturalForm", () => {
  const mockConsultPerson = vi.fn();
  const mockNavigate = vi.fn();

  beforeEach(() => {
    (useCredit as Mock).mockReturnValue({
      consultPerson: mockConsultPerson,
    });

    (useNavigate as Mock).mockReturnValue(mockNavigate);
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  it("should render the form correctly", () => {
    render(<NaturalForm />);
    expect(screen.getByLabelText("Nome Completo")).toBeInTheDocument();
    expect(screen.getByLabelText("Idade")).toBeInTheDocument();
    expect(screen.getByLabelText("CPF")).toBeInTheDocument();
    expect(screen.getByLabelText("Renda Mensal")).toBeInTheDocument();
    expect(screen.getByLabelText("Cidade")).toBeInTheDocument();
  });

  it("should show errors on submit", async () => {
    render(<NaturalForm />);

    fireEvent.submit(screen.getByRole("form"));

    await waitFor(() => {
      expect(
        screen.getByText("Este campo deve ter no mínimo 11 caracteres.")
      ).toBeInTheDocument();
      expect(
        screen.getByText("Você deve ter no mínimo 18 anos.")
      ).toBeInTheDocument();
      expect(screen.getByText("Documento inválido.")).toBeInTheDocument();
      expect(
        screen.getByText("Seu faturamento mensal não é suficiente.")
      ).toBeInTheDocument();
      expect(screen.getByText("Este campo é obrigatório.")).toBeInTheDocument();
    });
  });

  it("should call consultPerson correctly", async () => {
    render(<NaturalForm />);

    fireEvent.change(screen.getByLabelText("Nome Completo"), {
      target: { value: "João da Silva" },
    });
    fireEvent.change(screen.getByLabelText("Idade"), {
      target: { value: "25" },
    });
    fireEvent.change(screen.getByLabelText("CPF"), {
      target: { value: "12345678901" },
    });
    fireEvent.change(screen.getByLabelText("Renda Mensal"), {
      target: { value: "3000" },
    });
    fireEvent.change(screen.getByLabelText("Cidade"), {
      target: { value: "São Paulo" },
    });

    fireEvent.submit(screen.getByRole("form"));

    await waitFor(() => {
      expect(mockConsultPerson).toHaveBeenCalledWith({
        city: "São Paulo",
        name: "João da Silva",
        age: "25",
        document: "12345678901",
        income: "3000",
      });
      expect(mockNavigate).toHaveBeenCalledWith("/seu-credito");
    });
  });

  describe("input validations", () => {
    it("should show an error if name has less than 8 characters", async () => {
      render(<NaturalForm />);

      fireEvent.change(screen.getByLabelText("Nome Completo"), {
        target: { value: "João" },
      });
      fireEvent.blur(screen.getByLabelText("Nome Completo"));

      await waitFor(() => {
        expect(
          screen.getByText("Este campo deve ter no mínmo 11 caracteres.")
        ).toBeInTheDocument();
      });
    });

    it("should render an error when age under 18", async () => {
      render(<NaturalForm />);

      fireEvent.change(screen.getByLabelText("Idade"), {
        target: { value: "17" },
      });
      fireEvent.blur(screen.getByLabelText("Idade"));

      await waitFor(() => {
        expect(
          screen.getByText("Você deve ter no mínimo 18 anos.")
        ).toBeInTheDocument();
      });
    });

    it("should render an error when document is invalid", async () => {
      render(<NaturalForm />);

      fireEvent.change(screen.getByLabelText("CPF"), {
        target: { value: "1234567890" },
      });
      fireEvent.blur(screen.getByLabelText("CPF"));

      await waitFor(() => {
        expect(screen.getByText("Documento inválido.")).toBeInTheDocument();
      });
    });

    it("should render an error when monthly income is 0", async () => {
      render(<NaturalForm />);

      fireEvent.change(screen.getByLabelText("Renda Mensal"), {
        target: { value: "0" },
      });
      fireEvent.blur(screen.getByLabelText("Renda Mensal"));

      await waitFor(() => {
        expect(
          screen.getByText("Seu faturamento mensal não é suficiente.")
        ).toBeInTheDocument();
      });
    });

    it("should render an error when city is empty", async () => {
      render(<NaturalForm />);

      fireEvent.change(screen.getByLabelText("Cidade"), {
        target: { value: "" },
      });
      fireEvent.blur(screen.getByLabelText("Cidade"));

      await waitFor(() => {
        expect(
          screen.getByText("Este campo é obrigatório.")
        ).toBeInTheDocument();
      });
    });
  });

  describe("actions", () => {
    it("should not call consultPerson if has errors", async () => {
      render(<NaturalForm />);

      fireEvent.change(screen.getByLabelText("Nome Completo"), {
        target: { value: "João" },
      });
      fireEvent.submit(screen.getByRole("form"));

      await waitFor(() => {
        expect(mockConsultPerson).not.toHaveBeenCalled();
      });
    });

    it("should redirect to home", () => {
      render(<NaturalForm />);

      fireEvent.click(screen.getByText("Voltar"));

      expect(mockNavigate).toHaveBeenCalledWith("/");
    });
  });
});
