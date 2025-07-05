import { ReactNode } from "react";

import "../globals.css";

export default function authLayout({ children }: { children: ReactNode }) {
  return (
    <div className="authLayout">
      <div className="authFormWrapper w-full flex items-center px-4 text-white">
        {children}
      </div>
      <div className="authImg" />
    </div>
  );
}
