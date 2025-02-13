import { Props } from "./types";

export const Button: React.FC<Props> = ({ onClick, variant, label, disabled }) => {
  const buttonVariant = () => {
    if (disabled) {
      return "rounded-lg px-6 py-3 font-medium bg-gray-400 text-white cursor-not-allowed";
    }
    if (variant === "secondary") {
      return "rounded-lg border px-6 py-3 font-medium border-slate-200 bg-white text-slate-900 hover:bg-slate-50";
    }
    return "rounded-lg px-6 py-3 font-medium bg-sky-900 text-white hover:bg-sky-800";
  };

  return (
    <button onClick={onClick} className={buttonVariant()} disabled={disabled}>
      {label || ""}
    </button>
  );
};