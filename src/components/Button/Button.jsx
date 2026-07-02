const baseClasses =
  'inline-flex items-center gap-2 rounded-lg px-4 py-2 text-sm font-semibold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50'

const variantClasses = {
  primary: 'bg-slate-900 text-white hover:bg-slate-700 focus-visible:ring-slate-900',
  secondary:
    'bg-white text-slate-900 ring-1 ring-inset ring-slate-300 hover:bg-slate-50 focus-visible:ring-slate-400',
}

export function Button({
  children,
  variant = 'primary',
  disabled = false,
  onClick,
  icon: Icon,
}) {
  const classes = `${baseClasses} ${variantClasses[variant] ?? variantClasses.primary}`

  return (
    <button type="button" className={classes} disabled={disabled} onClick={onClick}>
      {Icon ? <Icon className="h-4 w-4 shrink-0" aria-hidden="true" focusable="false" /> : null}
      <span>{children}</span>
    </button>
  )
}
