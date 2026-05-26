import { AutomationRequestWizard } from '@/components/client/AutomationRequestWizard'

export default function NewAutomationPage({
  searchParams,
}: {
  searchParams: { type?: string }
}) {
  return (
    <div className="p-8 max-w-3xl">
      <div className="mb-8">
        <p className="text-brand-gold uppercase tracking-widest text-xs font-semibold mb-2">
          Client Portal
        </p>
        <h1 className="text-3xl font-display font-light text-brand-offwhite">
          Request an Automation
        </h1>
        <p className="text-brand-muted mt-2">
          Choose a service, fill in your requirements, and we'll have it configured within the listed timeframe.
        </p>
      </div>
      <AutomationRequestWizard defaultType={searchParams.type} />
    </div>
  )
}
