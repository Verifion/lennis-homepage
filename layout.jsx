export const metadata = {
  title: "Restaurant Kasse",
  description: "Restaurant Kassensystem",
};

export default function RootLayout({ children }) {
  return (
    <html lang="de">
      <body style={{ margin: 0, padding: 0 }}>{children}</body>
    </html>
  );
}
