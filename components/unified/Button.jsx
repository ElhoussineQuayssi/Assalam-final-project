// components/unified/Button.jsx
import Link from "next/link";
import { ArrowRight } from "lucide-react";

export default function Button({
  children,
  href,
  variant = "primary",
  size = "medium",
  className = "",
  icon = null,
  iconPosition = "right",
  disabled = false,
  loading = false,
  ...props
}) {
  const baseClasses =
    "inline-flex items-center justify-center rounded-md transition-all duration-300 font-medium focus-ring relative overflow-hidden";

  const variantClasses = {
    primary: "btn-primary",
    secondary: "bg-ui-surface hover:bg-ui-bg text-ui-text border border-ui-border hover:border-brand-primary",
    outlineLight:
      "border-2 border-white text-white hover:bg-white hover:text-brand-primary bg-transparent",
    outline:
      "border-2 border-brand-primary text-brand-primary hover:bg-brand-primary hover:text-white bg-transparent",
    danger: "bg-brand-accent hover:bg-brand-accent-dark text-white shadow-md hover:shadow-lg",
    ghost: "text-brand-primary hover:text-brand-primary-dark hover:bg-ui-bg",
    success: "bg-brand-primary hover:bg-brand-primary-dark text-white shadow-md hover:shadow-lg",
  };

  const sizeClasses = {
    small: "px-4 py-2 text-sm gap-2",
    medium: "px-6 py-3 text-base gap-2",
    large: "px-8 py-4 text-lg gap-3",
  };

  const disabledClasses = disabled
    ? "opacity-50 cursor-not-allowed pointer-events-none"
    : "cursor-pointer";

  const buttonClasses = `${baseClasses} ${variantClasses[variant]} ${sizeClasses[size]} ${disabledClasses} ${className}`;

  const content = (
    <>
      {loading ? (
        <div className="animate-spin rounded-full h-4 w-4 border-2 border-current border-t-transparent mr-2" />
      ) : (
        icon && iconPosition === "left" && (
          <span className={iconPosition === "left" ? "mr-2" : "ml-2"}>
            {icon}
          </span>
        )
      )}
      <span className="relative z-10">{children}</span>
      {!loading && icon && iconPosition === "right" && (
        <span className="ml-2 transition-transform duration-300 group-hover:translate-x-1">
          {icon}
        </span>
      )}
    </>
  );

  if (href && !disabled) {
    return (
      <Link href={href} className={`${buttonClasses} group`} {...props}>
        {content}
      </Link>
    );
  }

  return (
    <button className={`${buttonClasses} group`} disabled={disabled || loading} {...props}>
      {content}
    </button>
  );
}
