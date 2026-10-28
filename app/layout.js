export const metadata = {

  title: "My Tasks",
  description: "Simple shared task board",

};

export default function RootLayout({ children }) {
  
  return (
    <html lang="en">
      <body>{children}</body>

    </html>
  );
}
