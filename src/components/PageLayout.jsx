export default function PageLayout({ title, description, children, action }) {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-textMain">{title}</h1>
          {description && <p className="text-sm text-textMuted mt-1">{description}</p>}
        </div>
        {action}
      </div>
      {children}
    </div>
  );
}