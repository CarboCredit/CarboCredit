import React from 'react';
import './classroom.css';

const Classroom = () => {
  return (
    <div>
      <iframe   
        className="cs-first-dashboard" 
        title="CS First Dashboard"
        src="http://localhost:3002/classroom" 
      />
    </div>
  );
}

export default Classroom;
