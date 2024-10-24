import React from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
// import './AboutUs.css'; // Assuming you have some styles for the page

const AboutUs = () => {
  return (
    <div className="container about-us-container">
      <h1 className="text-center my-4">About Us</h1>
      <p>
        Welcome to the <strong>Library Management System</strong>, a comprehensive solution designed to streamline the management of libraries of all sizes. Our platform empowers librarians, members, and administrators to seamlessly manage books, borrowers, and library resources with ease and efficiency.
      </p>

      <h2 className="mt-4">Our Mission</h2>
      <p>
        Our mission is to revolutionize the way libraries operate by providing a user-friendly and efficient management system. We strive to make library management tasks faster and more accurate, allowing librarians to focus more on enriching the reading and learning experiences of their communities.
      </p>

      <h2 className="mt-4">What We Offer</h2>
      <p>Our Library Management System offers a wide range of features, including:</p>
      <ul className="list-group mb-4">
        <li className="list-group-item">Easy book cataloging and tracking</li>
        <li className="list-group-item">Borrower and member management</li>
        <li className="list-group-item">Real-time overdue tracking and notifications</li>
        <li className="list-group-item">Efficient reservation and renewal processes</li>
        <li className="list-group-item">Detailed reporting and analytics on library usage</li>
      </ul>

      <h2 className="mt-4">Why Choose Us?</h2>
      <p>We are committed to simplifying library operations by providing:</p>
      <ul className="list-group mb-4">
        <li className="list-group-item">An intuitive interface for both librarians and library members</li>
        <li className="list-group-item">Seamless integration with digital libraries and online resources</li>
        <li className="list-group-item">24/7 customer support to assist with any issues</li>
        <li className="list-group-item">Customizable features tailored to your library’s specific needs</li>
        <li className="list-group-item">Secure and scalable infrastructure that grows with your library</li>
      </ul>

      <h2 className="mt-4">Join Us in Enhancing Library Management</h2>
      <p>
        Whether you’re managing a small community library or a large university library, our system is built to cater to your unique needs. We believe that libraries play a crucial role in education and community development, and we’re here to support that mission with innovative technology.
      </p>

      <p>Thank you for choosing our Library Management System. Together, let’s create a better future for libraries and their users.</p>
    </div>
  );
}

export default AboutUs;