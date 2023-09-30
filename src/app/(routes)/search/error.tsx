"use client";

import Container from "@/components/Container";
import EmptyState from "@/components/EmptyState";

interface ErrorProps {
  error: { message: string | undefined };
  reset: () => void;
}

function Error({ error, reset: retry }: ErrorProps) {
  return (
    <Container>
      <EmptyState
        title={error?.message || "Something went wrong"}
        description="Something went wrong while searching..."
        actions={[{ action: retry, title: "Retry" }]}
      />
    </Container>
  );
}

export default Error;
