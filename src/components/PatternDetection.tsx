import React from 'react';
import '../styles/PatternDetection.css';
import {PatternsProps} from "../model/props";
import {Pattern} from "../model/models";

const PatternItem = ({ pattern }: { pattern: Pattern }) => {
  return (
    <div className={`pattern-item--medium`}>
      <div className="pattern-item__header">
        <h4 className="pattern-item__type">
          {pattern.type}
        </h4>
        <span className={`pattern-item__severity pattern-item__severity--medium`}>
          MEDIUM
        </span>
      </div>
      <p className="pattern-item__message">{pattern.metric}</p>
      <p className="pattern-item__timestamp">
        {new Date(pattern.timestamp).toLocaleTimeString()}
      </p>
    </div>
  );
};

const PatternDetection: React.FC<PatternsProps> = ({ patterns }) => {
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