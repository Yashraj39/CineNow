import React from "react";

export const ContactUs = () => {
  return (
    <div className="p-10">
      {/* Header Section */}
      <div className="text-center mb-10">
        <h1 className="text-4xl font-bold mb-4">Contact Us</h1>
        <p className="text-lg text-gray-600">
          We’d love to hear from you! Whether you have a question about
          bookings, feedback, or anything else, our team is ready to answer all
          your questions.
        </p>
      </div>

      {/* Contact Info Section */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
        <div className="bg-gray-100 p-6 rounded-2xl shadow-md text-center">
          <h2 className="text-xl font-semibold mb-2">📍 Our Location</h2>
          <p className="text-gray-700">123 Movie Street, Film City, India</p>
        </div>
        <div className="bg-gray-100 p-6 rounded-2xl shadow-md text-center">
          <h2 className="text-xl font-semibold mb-2">📞 Phone</h2>
          <p className="text-gray-700">+91 98765 43210</p>
        </div>
        <div className="bg-gray-100 p-6 rounded-2xl shadow-md text-center">
          <h2 className="text-xl font-semibold mb-2">📧 Email</h2>
          <p className="text-gray-700">support@moviebookings.com</p>
        </div>
      </div>

      {/* Contact Form Section */}
      <div className="max-w-3xl mx-auto bg-white p-8 rounded-2xl shadow-lg mb-12">
        <h2 className="text-2xl font-bold mb-6 text-center">Send us a Message</h2>
        <form className="grid grid-cols-1 gap-6">
          <div>
            <label className="block mb-2 font-medium">Full Name</label>
            <input
              type="text"
              placeholder="Enter your name"
              className="w-full p-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>
          <div>
            <label className="block mb-2 font-medium">Email</label>
            <input
              type="email"
              placeholder="Enter your email"
              className="w-full p-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>
          <div>
            <label className="block mb-2 font-medium">Message</label>
            <textarea
              rows="4"
              placeholder="Write your message..."
              className="w-full p-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400"
            ></textarea>
          </div>
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-3 rounded-xl hover:bg-blue-700 transition"
          >
            Send Message
          </button>
        </form>
      </div>

      {/* Map or Extra Info Section */}
      <div className="text-center">
        <h2 className="text-2xl font-bold mb-4">Find Us on the Map</h2>
        <div className="w-full h-64 rounded-2xl overflow-hidden shadow-lg">
          <iframe
            title="map"
            className="w-full h-full"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3770.9096229799406!2d72.8776556149005!3d19.076090987087437!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3be7c6309a2a1c81%3A0x7b2a9f6aeb54b07!2sFilm%20City%2C%20Mumbai%2C%20India!5e0!3m2!1sen!2sin!4v1632133033772!5m2!1sen!2sin"
            allowFullScreen=""
            loading="lazy"
          ></iframe>
        </div>
      </div>
    </div>
  );
};
