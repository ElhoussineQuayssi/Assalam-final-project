// components/unified/Container.jsx
export default function Container({
  children,
  size = "default",
  className = "",
  padding = true,
}) {
  const sizeClasses = {
    small: "max-w-4xl",
    default: "max-w-5xl",
    large: "max-w-6xl",
    full: "max-w-full",
  };

  const paddingClasses = padding ? "px-4" : "";

  return (
    <div
      className={`mx-auto ${sizeClasses[size]} ${paddingClasses} ${className}`}
    >
      {children}
    </div>
  );
}
