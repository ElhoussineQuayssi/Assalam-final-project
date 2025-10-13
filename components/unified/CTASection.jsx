// components/unified/CTASection.jsx
import Button from "./Button";

export default function CTASection({
  title,
  subtitle,
  backgroundGradient = "from-brand-primary-dark to-brand-primary",
  patternOverlay = true,
  actions = [],
  className = "",
}) {
  return (
    <section className={`py-4 my-4 h-full text-white relative ${className}`}>
      {/* Pattern overlay */}
      {patternOverlay && (
        <div className="absolute inset-0 bg-[url('/images/morocco-pattern.svg')] opacity-10"></div>
      )}

      <div className={`bg-gradient-to-r h-full p-4 ${backgroundGradient} relative z-10`}>
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-4xl font-bold mb-6">{title}</h2>
            <p className="text-lg mb-8">{subtitle}</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              {actions.map((action, index) => (
                <Button
                  key={index}
                  href={action.href}
                  variant={action.variant || "primary"}
                >
                  {action.text}
                </Button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
