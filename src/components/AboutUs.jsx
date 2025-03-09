import { FaLink, FaUsers, FaRocket } from "react-icons/fa";

const AboutUs = () => {
  return (
    <div className="max-w-5xl mx-auto px-6 py-12">
      {/* Head Section */}
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-gray-800 mb-3">About Linkspark - URL Shortenening Service</h1>
        <p className="text-lg text-gray-600">
          Transform long URLs into short, shareable links with ease!
        </p>
      </div>

      {/* Mission Section */}
      <div className="grid md:grid-cols-3 gap-8 text-center">
        <div className="p-6 border rounded-lg shadow-lg">
          <FaLink className="text-blue-500 text-5xl mx-auto mb-4" />
          <h3 className="text-xl font-semibold text-gray-800 mb-2">Simplify Your Links</h3>
          <p className="text-gray-600">
            We help you create clean, trackable, and user-friendly links for any purpose.
          </p>
        </div>

        <div className="p-6 border rounded-lg shadow-lg">
          <FaUsers className="text-green-500 text-5xl mx-auto mb-4" />
          <h3 className="text-xl font-semibold text-gray-800 mb-2">User-Centric Platform</h3>
          <p className="text-gray-600">
            Our platform provides a medium to ensure ease of use and crucial URL-wise stats for all users.
          </p>
        </div>

        <div className="p-6 border rounded-lg shadow-lg">
          <FaRocket className="text-purple-500 text-5xl mx-auto mb-4" />
          <h3 className="text-xl font-semibold text-gray-800 mb-2">Fast & Reliable</h3>
          <p className="text-gray-600">
            Enjoy lightning-fast URL shortening with secure and stable infrastructure.
          </p>
        </div>
      </div>

      {/* Footer Section */}
      <div className="mt-12 text-center">
        <h2 className="text-2xl font-bold text-gray-800">Join Linkspark Today!</h2>
        <p className="text-gray-600 mt-2">
          Start shortening links and tracking analytics effortlessly.
        </p>
      </div>
    </div>
  );
};

export default AboutUs;
