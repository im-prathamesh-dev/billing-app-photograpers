export default function KPICard({ title, value, color }) {
  return (
    <div className={`card text-white mb-3`} style={{ background: color }}>
      <div className="card-body">
        <h5 className="card-title">{title}</h5>
        <h3>{value}</h3>
      </div>
    </div>
  );
}
