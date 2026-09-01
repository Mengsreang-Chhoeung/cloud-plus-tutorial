export const dynamic = "force-dynamic";

export default function Home() {
  const message = process.env.APP_MESSAGE || "Hello from Run App!";

  return (
    <div>
      <h1>{message}</h1>
      <p>Served by Next.js on Run App.</p>
    </div>
  );
}
