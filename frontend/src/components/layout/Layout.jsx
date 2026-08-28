import Sidebar from "./Sidebar";

function Layout({ children }) {
  return (
    <div className="min-h-screen app-bg app-text transition-colors duration-200">
      <Sidebar />

      <main className="ml-64 min-h-screen app-bg">
        {children}
      </main>
    </div>
  );
}

export default Layout;
