"use client";

import EmptyState from "@/components/EmptyState";
import { FC } from "react";

interface ErrorProps {
  error: Error;
  reset: () => void;
}

const Error: FC<ErrorProps> = ({ error, reset }) => {
  return (
    <div className="text-center">
      <EmptyState
        title={error.message}
        description={
          "Something went wrong while we were trying to fetch series."
        }
        actions={[
          { title: "Try again", action: reset },
          { title: "Home", path: "/" },
        ]}
      />
    </div>
  );
};

export default Error;
