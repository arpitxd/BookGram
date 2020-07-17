import React from 'react';
import PropTypes from 'prop-types';

class ErrorBoundary extends React.Component {
    constructor(props) {
        super(props);
        this.state = { hasError: false };
    }

    static getDerivedStateFromError(error) {
        return { hasError: true };
      }

    render() {
        if (this.state.hasError) {
            return <div style={{position: 'relative', top: '100px', left: '40%'}}>Something went Wrong. Please Login again</div>;
        } else {
            return this.props.children;
        }
    }
}

export default ErrorBoundary;
ErrorBoundary.propTypes = {
    children: PropTypes.oneOfType([PropTypes.array, PropTypes.object])
};
