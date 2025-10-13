// components/unified/Select.jsx
export default function Select({
  label,
  placeholder = "Sélectionnez une option",
  value,
  onChange,
  options = [],
  error,
  required = false,
  disabled = false,
  className = "",
  ...props
}) {
  const baseClasses =
    "w-full px-4 py-3 border rounded-lg transition-all duration-200 focus-ring bg-white appearance-none cursor-pointer";

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
        <select
          value={value}
          onChange={onChange}
          disabled={disabled}
          required={required}
          className={`
            ${baseClasses}
            ${stateClasses}
            ${disabledClasses}
            pr-10
          `}
          {...props}
        >
          {placeholder && (
            <option value="" disabled>
              {placeholder}
            </option>
          )}
          {options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>

        {/* Custom dropdown arrow */}
        <div className="absolute right-3 top-1/2 transform -translate-y-1/2 pointer-events-none">
          <svg
            className={`w-5 h-5 transition-colors duration-200 ${
              disabled ? "text-gray-400" : "text-gray-500"
            }`}
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M19 9l-7 7-7-7"
            />
          </svg>
        </div>
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
