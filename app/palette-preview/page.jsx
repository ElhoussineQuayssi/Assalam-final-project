import { Metadata } from "next";

export const metadata  = {
  title: "Palette Preview - Fondation Assalam",
  description: "Preview of the Fondation Assalam design system colors and tokens",
};

export default function PalettePreviewPage() {
  return (
    <div className="min-h-screen bg-ui-bg p-8">
      <div className="max-w-6xl mx-auto">
        <header className="mb-12">
          <h1 className="text-4xl font-bold text-ui-text mb-4">
            Fondation Assalam Design System
          </h1>
          <p className="text-lg text-ui-muted max-w-2xl">
            Preview of the updated color palette and design tokens for the Fondation Assalam website.
            This page helps designers and developers validate the new brand colors and ensure consistency.
          </p>
        </header>

        {/* Color Palette Section */}
        <section className="mb-12">
          <h2 className="text-2xl font-semibold text-ui-text mb-6">Serene Azure Brand Colors</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
            {/* Primary Colors */}
            <div className="space-y-4">
              <h3 className="text-lg font-medium text-ui-text">Primary (Calm Blue)</h3>
              <div className="space-y-2">
                <div className="flex items-center gap-4 p-3 bg-ui-surface rounded-lg border border-ui-border">
                  <div className="w-12 h-12 rounded-md bg-brand-primary"></div>
                  <div>
                    <div className="font-mono text-sm text-ui-text">brand-primary</div>
                    <div className="font-mono text-xs text-ui-muted">#5D8FBD</div>
                    <div className="text-xs text-ui-muted">Tranquil Blue</div>
                  </div>
                </div>
                <div className="flex items-center gap-4 p-3 bg-ui-surface rounded-lg border border-ui-border">
                  <div className="w-12 h-12 rounded-md bg-brand-primary-dark"></div>
                  <div>
                    <div className="font-mono text-sm text-ui-text">brand-primary-dark</div>
                    <div className="font-mono text-xs text-ui-muted">#3A6B9B</div>
                    <div className="text-xs text-ui-muted">Deep Comfort</div>
                  </div>
                </div>
                <div className="flex items-center gap-4 p-3 bg-ui-surface rounded-lg border border-ui-border">
                  <div className="w-12 h-12 rounded-md bg-brand-primary-light"></div>
                  <div>
                    <div className="font-mono text-sm text-ui-text">brand-primary-light</div>
                    <div className="font-mono text-xs text-ui-muted">#A0C4E1</div>
                    <div className="text-xs text-ui-muted">Hazy Blue</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Secondary Colors */}
            <div className="space-y-4">
              <h3 className="text-lg font-medium text-ui-text">Secondary (Soft Blues)</h3>
              <div className="space-y-2">
                <div className="flex items-center gap-4 p-3 bg-ui-surface rounded-lg border border-ui-border">
                  <div className="w-12 h-12 rounded-md bg-brand-secondary"></div>
                  <div>
                    <div className="font-mono text-sm text-ui-text">brand-secondary</div>
                    <div className="font-mono text-xs text-ui-muted">#A0C4E1</div>
                    <div className="text-xs text-ui-muted">Hazy Blue</div>
                  </div>
                </div>
                <div className="flex items-center gap-4 p-3 bg-ui-surface rounded-lg border border-ui-border">
                  <div className="w-12 h-12 rounded-md bg-brand-secondary-dark"></div>
                  <div>
                    <div className="font-mono text-sm text-ui-text">brand-secondary-dark</div>
                    <div className="font-mono text-xs text-ui-muted">#3A6B9B</div>
                    <div className="text-xs text-ui-muted">Deep Comfort</div>
                  </div>
                </div>
                <div className="flex items-center gap-4 p-3 bg-ui-surface rounded-lg border border-ui-border">
                  <div className="w-12 h-12 rounded-md bg-brand-secondary-light"></div>
                  <div>
                    <div className="font-mono text-sm text-ui-text">brand-secondary-light</div>
                    <div className="font-mono text-xs text-ui-muted">#E1EFF9</div>
                    <div className="text-xs text-ui-muted">Soft Sky</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Accent Colors */}
            <div className="space-y-4">
              <h3 className="text-lg font-medium text-ui-text">Accent (Warm Red)</h3>
              <div className="space-y-2">
                <div className="flex items-center gap-4 p-3 bg-ui-surface rounded-lg border border-ui-border">
                  <div className="w-12 h-12 rounded-md bg-brand-accent"></div>
                  <div>
                    <div className="font-mono text-sm text-ui-text">brand-accent</div>
                    <div className="font-mono text-xs text-ui-muted">#A11721</div>
                    <div className="text-xs text-ui-muted">Accent Red</div>
                  </div>
                </div>
                <div className="flex items-center gap-4 p-3 bg-ui-surface rounded-lg border border-ui-border">
                  <div className="w-12 h-12 rounded-md bg-brand-accent-dark"></div>
                  <div>
                    <div className="font-mono text-sm text-ui-text">brand-accent-dark</div>
                    <div className="font-mono text-xs text-ui-muted">#711017</div>
                    <div className="text-xs text-ui-muted">Dark Accent</div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Neutral Colors */}
          <div className="mb-8">
            <h3 className="text-lg font-medium text-ui-text mb-4">Serene Azure Neutral Colors</h3>
            <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
              <div className="text-center">
                <div className="w-16 h-16 mx-auto mb-2 rounded-md bg-ui-bg border border-ui-border"></div>
                <div className="font-mono text-xs text-ui-text">ui-bg</div>
                <div className="font-mono text-xs text-ui-muted">#F5F9FC</div>
                <div className="text-xs text-ui-muted">Polar Mist</div>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 mx-auto mb-2 rounded-md bg-ui-surface border border-ui-border"></div>
                <div className="font-mono text-xs text-ui-text">ui-surface</div>
                <div className="font-mono text-xs text-ui-muted">#E1EFF9</div>
                <div className="text-xs text-ui-muted">Soft Sky</div>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 mx-auto mb-2 rounded-md bg-ui-text"></div>
                <div className="font-mono text-xs text-ui-text">ui-text</div>
                <div className="font-mono text-xs text-ui-muted">#4A4A4A</div>
                <div className="text-xs text-ui-muted">Charcoal Gray</div>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 mx-auto mb-2 rounded-md bg-ui-muted"></div>
                <div className="font-mono text-xs text-ui-text">ui-muted</div>
                <div className="font-mono text-xs text-ui-muted">#767676</div>
                <div className="text-xs text-ui-muted">Dusty Gray</div>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 mx-auto mb-2 rounded-md bg-brand-primary-light border border-ui-text"></div>
                <div className="font-mono text-xs text-ui-text">ui-border</div>
                <div className="font-mono text-xs text-ui-muted">#A0C4E1</div>
                <div className="text-xs text-ui-muted">Hazy Blue</div>
              </div>
            </div>
          </div>
        </section>

        {/* Component Examples */}
        <section className="mb-12">
          <h2 className="text-2xl font-semibold text-ui-text mb-6">Component Examples</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Buttons */}
            <div className="space-y-4">
              <h3 className="text-lg font-medium text-ui-text">Buttons</h3>
              <div className="space-y-3">
                <button className="btn-primary w-full">Primary CTA Button</button>
                <button className="btn-secondary w-full">Secondary Button</button>
                <button className="px-4 py-2 bg-ui-surface border border-ui-border text-ui-text rounded-md hover:bg-ui-bg transition-colors">
                  Outline Button
                </button>
              </div>
            </div>

            {/* Cards */}
            <div className="space-y-4">
              <h3 className="text-lg font-medium text-ui-text">Cards</h3>
              <div className="card p-6">
                <h4 className="text-lg font-semibold text-ui-text mb-2">Card Title</h4>
                <p className="text-ui-muted mb-4">
                  This is a sample card component with the new design tokens.
                </p>
                <button className="btn-primary">Learn More</button>
              </div>
            </div>
          </div>
        </section>

        {/* Typography Scale */}
        <section className="mb-12">
          <h2 className="text-2xl font-semibold text-ui-text mb-6">Typography Scale</h2>

          <div className="space-y-4">
            <div>
              <div className="text-5xl font-bold text-ui-text mb-2">Heading 1 - 3rem</div>
              <div className="text-sm text-ui-muted font-mono">text-5xl (48px)</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-ui-text mb-2">Heading 2 - 2.25rem</div>
              <div className="text-sm text-ui-muted font-mono">text-4xl (36px)</div>
            </div>
            <div>
              <div className="text-3xl font-semibold text-ui-text mb-2">Heading 3 - 1.875rem</div>
              <div className="text-sm text-ui-muted font-mono">text-3xl (30px)</div>
            </div>
            <div>
              <div className="text-2xl font-semibold text-ui-text mb-2">Heading 4 - 1.5rem</div>
              <div className="text-sm text-ui-muted font-mono">text-2xl (24px)</div>
            </div>
            <div>
              <div className="text-xl font-medium text-ui-text mb-2">Heading 5 - 1.25rem</div>
              <div className="text-sm text-ui-muted font-mono">text-xl (20px)</div>
            </div>
            <div>
              <div className="text-lg text-ui-text mb-2">Body Large - 1.125rem</div>
              <div className="text-sm text-ui-muted font-mono">text-lg (18px)</div>
            </div>
            <div>
              <div className="text-base text-ui-text mb-2">Body Text - 1rem</div>
              <div className="text-sm text-ui-muted font-mono">text-base (16px)</div>
            </div>
            <div>
              <div className="text-sm text-ui-text mb-2">Small Text - 0.875rem</div>
              <div className="text-sm text-ui-muted font-mono">text-sm (14px)</div>
            </div>
          </div>
        </section>

        {/* Usage Guidelines */}
        <section>
          <h2 className="text-2xl font-semibold text-ui-text mb-6">Serene Azure Usage Guidelines</h2>

          <div className="card p-6">
            <h3 className="text-lg font-semibold text-ui-text mb-4">Color Usage Rules for Serenity</h3>
            <ul className="space-y-3 text-ui-text">
              <li className="flex items-start gap-2">
                <span className="text-brand-primary">•</span>
                <span>Use <code className="bg-ui-bg px-1 rounded text-sm">brand-primary (#5D8FBD)</code> for primary CTA buttons - creates a calming, trustworthy feel</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-brand-primary-dark">•</span>
                <span>Use <code className="bg-ui-bg px-1 rounded text-sm">brand-primary-dark (#3A6B9B)</code> for hover states and active navigation</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-brand-secondary">•</span>
                <span>Use <code className="bg-ui-bg px-1 rounded text-sm">ui-surface (#E1EFF9)</code> for card backgrounds and secondary content areas</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-ui-text">•</span>
                <span>Use <code className="bg-ui-bg px-1 rounded text-sm">ui-text (#4A4A4A)</code> for primary text - comfortable and easy on the eyes</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-ui-muted">•</span>
                <span>Use <code className="bg-ui-bg px-1 rounded text-sm">ui-muted (#767676)</code> for secondary text, captions, and meta information</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-brand-accent">•</span>
                <span>Use <code className="bg-ui-bg px-1 rounded text-sm">brand-accent (#A11721)</code> sparingly for errors, warnings, and important alerts</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-ui-bg" style={{color: '#FFF9F0'}}>•</span>
                <span>Use <code className="bg-ui-bg px-1 rounded text-sm">accent (#FFF9F0)</code> for subtle accents and breaks in the cool blue palette</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-brand-primary">•</span>
                <span>Prefer semantic color names over hex values in your code for consistency and maintainability</span>
              </li>
            </ul>
          </div>
        </section>
      </div>
    </div>
  );
}
