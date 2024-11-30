import React from 'react';

const CarboCredit = () => {
  return (
    <div className="carbo-credit-page">
      <header className="header">
        <h1>CarboCredit Community Support Initiative</h1>
        <p>Empowering Small Communities and Schools in Pakistan</p>
      </header>
      
      <section className="introduction">
        <h2>About the Initiative</h2>
        <p>
          CarboCredit is committed to supporting small communities and schools in Pakistan by providing 
          resources and guidance to develop their Computer Science (CS) programs. Our goal is to empower 
          the next generation of innovators and technologists in underrepresented areas.
        </p>
      </section>
      
      <section className="program-details">
        <h2>Program Details</h2>
        <ul>
          <li>
            <strong>Educational Resources:</strong> Access to high-quality, free resources for learning 
            programming, web development, and more.
          </li>
          <li>
            <strong>Teacher Training:</strong> Workshops and training sessions for teachers to help them 
            deliver effective CS education.
          </li>
          <li>
            <strong>Community Engagement:</strong> Encouraging community involvement to create a supportive 
            environment for students and teachers alike.
          </li>
          <li>
            <strong>Continuous Support:</strong> Ongoing support through online communities and periodic 
            check-ins to ensure successful program implementation.
          </li>
        </ul>
      </section>
      
      <section className="audience">
        <h2>Who We Support</h2>
        <p>
          Our initiative focuses on schools, community centers, and educational organizations in rural 
          and underserved areas of Pakistan. We aim to provide equal opportunities for students to 
          explore and excel in the field of computer science.
        </p>
      </section>
      
      <section className="get-involved">
        <h2>Get Involved</h2>
        <p>
          If you are an educational institution or a community organization in Pakistan looking to develop 
          your CS program, we invite you to join us. Together, we can make a difference in the lives of 
          many young students.
        </p>
        <button className="apply-button">Apply Now</button>
      </section>
      
      <footer className="footer">
        <p>Contact us: support@carbocredit.com</p>
        <p>Follow us on social media for updates and news about our initiatives.</p>
      </footer>
    </div>
  );
}

export default CarboCredit;
