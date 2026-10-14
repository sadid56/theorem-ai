import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { ToastProvider, useToast } from "./context/ToastContext";
import { QueryProvider } from "@repo/query";
import App from "./App";
import "./index.css";
import { AuthProvider } from "@repo/auth";

function AppRoot() {
  const toast = useToast();
  return (
    <QueryProvider toast={toast}>
      <AuthProvider>
        <App />
      </AuthProvider>
    </QueryProvider>
  );
}

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ToastProvider>
      <AppRoot />
    </ToastProvider>
  </StrictMode>,
);
