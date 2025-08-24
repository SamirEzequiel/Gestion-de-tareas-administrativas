import type { ButtonHTMLAttributes } from "react";
type Props = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: "primary" | "secondary" | "ghost";
  size?: "sm" | "md";
};
export default function Button({ variant="primary", size="md", className="", ...props }: Props) {
  const base = "inline-flex items-center justify-center rounded-lg font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2";
  const sizes = {
    sm: "h-9 px-3 text-sm",
    md: "h-10 px-4 text-sm"
  }[size];
  const variants = {
    primary: "bg-black text-white hover:bg-gray-900 focus:ring-black",
    secondary: "bg-white text-gray-900 border hover:bg-gray-50 focus:ring-gray-300",
    ghost: "bg-transparent text-gray-700 hover:bg-gray-100 focus:ring-gray-300"
  }[variant];
  return <button className={`${base} ${sizes} ${variants} ${className}`} {...props} />;
}
