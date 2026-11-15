const base =
  "inline-flex min-h-11 items-center justify-center gap-2 rounded-lg px-5 text-sm font-semibold transition-colors duration-150 focus-visible:outline-2 focus-visible:outline-offset-2";

/** Navy primary action. */
export const btnPrimary = `${base} bg-primary text-primary-foreground hover:bg-primary/90`;
/** Orange purchase action: dark text keeps contrast above 4.5:1. */
export const btnSignal = `${base} bg-signal text-on-signal hover:bg-signal/90`;
/** White secondary action with a control-strength border. */
export const btnSecondary = `${base} border border-input bg-white text-primary hover:bg-secondary`;
