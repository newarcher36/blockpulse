import React from 'react';
import '../styles/PatternDetection.css';

const PatternItem = ({ pattern }) => {
  const severityClass = `pattern-item--${pattern.severity}`;
  
  return (
    <div className={`pattern-item ${severityClass}`}>
      <div className="pattern-item__header">
        <h4 className="pattern-item__type">
          {pattern.type.replace('_', ' ')}
        </h4>
        <span className={`pattern-item__severity pattern-item__severity--${pattern.severity}`}>
          {pattern.severity}
        </span>
      </div>
      <p className="pattern-item__message">{pattern.message}</p>
      <p className="pattern-item__timestamp">
        {new Date(pattern.timestamp).toLocaleTimeString()}
      </p>
    </div>
  );
};

const PatternDetection = ({ patterns }) => {
  return (
    <div className="pattern-detection">
      <h3 className="pattern-detection__title">Pattern Detection</h3>
      <div className="pattern-detection__content">
        {patterns.length === 0 ? (
          <p className="pattern-detection__empty">No patterns detected yet...</p>
        ) : (
          <div className="pattern-detection__list">
            {patterns.map((pattern, index) => (
              <PatternItem key={index} pattern={pattern} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default PatternDetection;