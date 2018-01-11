import React from 'react';

const Landing = () => {
  return (
    <div className="landing" style={{ textAlign: 'center' }}>
      <h1>
        Make client feedback<br /> great again.
      </h1>
      <p>
        BackFeed is a simple, straightforward approach to requesting user feedback.
      </p>
      <br />
      <a href="/auth/google" className="btn yellow darken-2">Get Started</a>
    </div>
  );
};

export default Landing;
