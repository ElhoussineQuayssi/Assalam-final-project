// components/unified/Textarea.jsx
export default function Textarea({
  label,
  placeholder,
  value,
  onChange,
  error,
  required = false,
  disabled = false,
  rows = 4,
  className = "",
  ...props
}) {
  const baseClasses =
    "w-full px-4 py-3 border rounded-lg transition-all duration-200 focus-ring bg-white resize-vertical";

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

      <textarea
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        disabled={disabled}
        required={required}
        rows={rows}
        className={`
          ${baseClasses}
          ${stateClasses}
          ${disabledClasses}
        `}
        {...props}
      />

      {error && (
        <p className="text-sm text-red-600 flex items-center gap-1">
          <span className="text-red-500">⚠</span>
          {error}
        </p>
      )}
    </div>
  );
}
