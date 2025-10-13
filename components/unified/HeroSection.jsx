// components/unified/HeroSection.jsx
import Button from "./Button";

export default function HeroSection({
  title,
  subtitle,
  backgroundImage,
  backgroundGradient = "from-brand-primary/90 to-brand-primary-dark/90",
  patternOverlay = true,
  actions = [],
  className = "",
}) {
  return (
    <section className={`relative py-20 md:py-32 ${className}`}>
      {/* Background gradient */}
      <div
        className={`absolute inset-0 bg-gradient-to-r ${backgroundGradient} z-0`}
      ></div>

      {/* Pattern overlay */}
      {patternOverlay && (
        <div className="absolute inset-0 bg-[url('/images/morocco-pattern.svg')] opacity-10 z-0"></div>
      )}

      {/* Background image */}
      {backgroundImage && (
        <div
          className="absolute inset-0 z-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${backgroundImage})` }}
        />
      )}

      <div className="relative z-10 max-w-5xl mx-auto text-center">
        <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
          {title}
        </h1>
        {subtitle && (
          <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
            {subtitle}
          </p>
        )}

        {actions.length > 0 && (
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            {actions.map((action, index) => (
              <Button
                key={index}
                href={action.href}
                variant={action.variant || "primary"}
                icon={action.icon}
                iconPosition="right"
              >
                {action.text}
              </Button>
              
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
