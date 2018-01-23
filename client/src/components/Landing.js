import React from 'react';

const Landing = () => {
  return (
    <div className="landing" style={{ textAlign: 'center' }}>
      <h1>
        Feedback is vital.
      </h1>
      <p>
        BackFeed is a simple, straightforward approach to sending surveys to your clients.
      </p>
      <br />
      <a href="/auth/google" className="btn yellow darken-2">Get Started</a>
    </div>
  );
};

export default Landing;
