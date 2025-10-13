// components/unified/Input.jsx
export default function Input({
  label,
  type = "text",
  placeholder,
  value,
  onChange,
  error,
  required = false,
  disabled = false,
  className = "",
  leftIcon,
  rightIcon,
  ...props
}) {
  const baseClasses =
    "w-full px-4 py-3 border rounded-lg transition-all duration-200 focus-ring bg-white";

  const stateClasses = error
    ? "border-red-300 focus:border-red-500 focus:ring-red-200"
    : "border-gray-300 hover:border-gray-400 focus:border-blue-500 focus:ring-blue-200";

  const disabledClasses = disabled
    ? "bg-gray-50 text-gray-500 cursor-not-allowed"
    : "bg-white";

  return (
    <div className={`space-y-2 ${className}`}>
      {label && (
        <label className="block text-sm font-medium text-gray-700">
          {label}
          {required && <span className="text-red-500 ml-1">*</span>}
        </label>
      )}

      <div className="relative">
        {leftIcon && (
          <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
            {leftIcon}
          </div>
        )}

        <input
          type={type}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          disabled={disabled}
          required={required}
          className={`
            ${baseClasses}
            ${stateClasses}
            ${disabledClasses}
            ${leftIcon ? "pl-10" : ""}
            ${rightIcon ? "pr-10" : ""}
          `}
          {...props}
        />

        {rightIcon && (
          <div className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400">
            {rightIcon}
          </div>
        )}
      </div>

      {error && (
        <p className="text-sm text-red-600 flex items-center gap-1">
          <span className="text-red-500">⚠</span>
          {error}
        </p>
      )}
    </div>
  );
}
