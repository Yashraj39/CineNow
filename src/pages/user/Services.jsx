import React from "react";
import { Link } from "react-router-dom";

export const Services = () => {
    const services = [
        {
            id: 1,
            title: "Movie Ticket Booking",
            description:
                "Easily book movie tickets online with real-time seat selection and instant confirmation.",
            icon: "🎟️",
        },
        {
            id: 2,
            title: "Exclusive Offers",
            description:
                "Enjoy discounts, cashback, and special deals on your favorite movies.",
            icon: "💸",
        },
        {
            id: 3,
            title: "Food & Beverages",
            description:
                "Pre-order snacks and drinks while booking tickets to enjoy a hassle-free movie experience.",
            icon: "🍿",
        },
        {
            id: 4,
            title: "Nearby Theatres",
            description:
                "Find theatres near you with the best shows and seat availability.",
            icon: "📍",
        },
        {
            id: 5,
            title: "24/7 Support",
            description:
                "Our support team is available around the clock to help you anytime.",
            icon: "📞",
        },
    ];

    return (
        <div className="p-8">
            {/* Hero Section */}
            <div className="text-center mb-12">
                <h1 className="text-4xl font-bold mb-4">Our Services</h1>
                <p className="text-gray-600 max-w-2xl mx-auto">
                    We make your movie experience smoother, faster, and more enjoyable with
                    our easy-to-use services. From ticket booking to food, we’ve got you
                    covered.
                </p>
            </div>

            {/* Services Section */}
            <div className="grid md:grid-cols-3 gap-6 mb-16">
                {services.map((s) => (
                    <div
                        key={s.id}
                        className="p-6 border rounded-2xl shadow hover:shadow-lg transition bg-white text-center"
                    >
                        <div className="text-5xl mb-4">{s.icon}</div>
                        <h2 className="text-xl font-semibold mb-2">{s.title}</h2>
                        <p className="text-gray-600">{s.description}</p>
                    </div>
                ))}
            </div>

            {/* Why Choose Us Section */}
            <div className="bg-gray-100 p-8 rounded-2xl mb-16">
                <h2 className="text-2xl font-bold mb-4 text-center">Why Choose Us?</h2>
                <ul className="space-y-3 text-gray-700 max-w-2xl mx-auto">
                    <li>✅ Simple and fast booking process</li>
                    <li>✅ Best deals and offers on tickets</li>
                    <li>✅ Real-time seat availability updates</li>
                    <li>✅ Food ordering along with tickets</li>
                    <li>✅ Friendly 24/7 customer support</li>
                </ul>
            </div>

            {/* Call to Action */}
            <div className="text-center">
                <h2 className="text-2xl font-bold mb-4">Ready for your next movie?</h2>
                <p className="text-gray-600 mb-6">
                    Book your tickets now and enjoy a seamless movie-going experience with us!
                </p>
                <Link to="/" >
                <button className="px-6 py-3 bg-blue-600 text-white rounded-lg shadow hover:bg-blue-700 transition" >
                    Book Now
                </button>
                </Link>
            </div>
        </div>
    );
};
