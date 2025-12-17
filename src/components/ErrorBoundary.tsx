import type { ReactNode } from "react";
import { Component } from "react";

type Props = {
  fallback?: ReactNode;
  children: ReactNode;
};

type State = {
  hasError: boolean;
};

export default class ErrorBoundary extends Component<Props, State> {
  state: State = { hasError: false };

  static getDerivedStateFromError(): State {
    return { hasError: true };
  }

  render() {
    if (this.state.hasError) {
      return (
        this.props.fallback ?? (
          <div className="w-full h-full flex items-center justify-center rounded-2xl border border-border bg-muted/30 text-muted-foreground">
            3D preview unavailable
          </div>
        )
      );
    }

    return this.props.children;
  }
}
