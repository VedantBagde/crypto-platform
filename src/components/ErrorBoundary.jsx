import React, { Component } from 'react';

class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error("Error Boundary caught:", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="flex flex-col items-center justify-center h-screen bg-red-900/20 p-8">
          <h2 className="text-2xl font-bold mb-4">Something went wrong</h2>
          <p className="text-red-300 mb-6">
            {this.state.error?.message || 'Unknown error occurred'}
          </p>
          <button 
            className="px-6 py-3 bg-red-700 rounded-lg hover:bg-red-600 transition-colors"
            onClick={() => window.location.reload()}
          >
            Reload Application
          </button>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;