export default function PageTitle({ t, s }) {
  return (
    <>
      <h2 className="font-display text-[clamp(28px,5vw,46px)] leading-[1.05] font-bold tracking-[-1.5px]">{t}</h2>
      <p className="mb-6 mt-1 text-mut">{s}</p>
    </>
  );
}
