import { Navigate } from "react-router-dom";
import { useUser } from "../context/UserContext";

export default function AdminRoute({ children }) {
  const { user, loading } = useUser();

  if (loading) return null; // o un spinner
  if (!user || user.role !== "admin") {
    return <Navigate to="/" replace />;
  }

  return children;
}
