import { Outlet } from "react-router";
import Header from "@/components/Header";

function App() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <Outlet />
    </div>
  );
}

export default App;
