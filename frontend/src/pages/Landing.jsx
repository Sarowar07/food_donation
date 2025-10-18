import { Link } from "react-router-dom";

const Landing = () => {
  return (
    <div className="bg-white text-black min-h-screen">
      
      <section className="relative bg-blue-500 text-white h-50vh flex flex-col justify-center items-center text-center px-4">
        <h1 className="text-5xl font-bold mb-4">No One Should Go Hungry</h1>
        <p className="text-xl mb-3 max-w-xl">
          Every day, countless meals go uneaten while millions sleep hungry. Through our platform, restaurants share their surplus food, volunteers deliver it with compassion, and NGOs transform it into nourishment for those who need it most — creating a beautiful chain of giving that turns waste into hope.
        </p>
        <div className="flex space-x-4">
          <Link to="/create" className="px-6 py-3 mb-3 bg-white text-blue-500 font-semibold rounded shadow hover:bg-gray-200 transition">
           Donate Food
          </Link>
          <Link to="/accept" className="px-6 py-3 mb-3 bg-white text-blue-500 font-semibold rounded shadow hover:bg-gray-200 transition">
            Receive Help
          </Link>
        </div>
      </section>

      <section className="flex flex-wrap justify-center mt-12 gap-6 px-4">
        <Link to="/signin">
          <div className="bg-blue-400 h-60 w-60 p-5 rounded-lg shadow-lg hover:scale-105 transition-transform">
            <h2 className="font-bold text-3xl mb-3">Share a Meal</h2>
            <p>Restaurants can donate surplus food to feed those in need. Make a difference today!</p>
          </div>
        </Link>
        <Link to="/signin">
          <div className="bg-blue-400 h-60 w-60 p-5 rounded-lg shadow-lg hover:scale-105 transition-transform">
            <h2 className="font-bold text-3xl mb-3">Receive Help</h2>
            <p>NGOs can pick up free meals from restaurants and serve people in need.</p>
          </div>
        </Link>
        <Link to="/signin">
          <div className="bg-blue-400 h-60 w-60 p-5 rounded-lg shadow-lg hover:scale-105 transition-transform">
            <h2 className="font-bold text-3xl mb-3">Volunteer</h2>
            <p>Help deliver meals and make a real impact in your community.</p>
          </div>
        </Link>
      </section>

      <section className="text-center mt-20 px-4 ">
        <h2 className="text-4xl font-bold mb-10">Our Impact</h2>
        <div className="flex flex-wrap justify-center gap-10">
          <div>
            <h3 className="text-3xl font-bold">500+</h3>
            <p>Meals Delivered</p>
          </div>
          <div>
            <h3 className="text-3xl font-bold">200+</h3>
            <p>Restaurants Participating</p>
          </div>
          <div>
            <h3 className="text-3xl font-bold">1000+</h3>
            <p>Volunteers Helping</p>
          </div>
        </div>
      </section>

      <section className="mt-20 px-4 text-center bg-blue-400 h-60 py-10">
        <h2 className="text-4xl font-bold mb-10">How It Works</h2>
        <div className="flex flex-wrap justify-center gap-8">
          <div className="max-w-xs">
            <h3 className="font-semibold text-2xl mb-2">1. Register</h3>
            <p>Restaurants, NGOs, and volunteers register to participate in the program.</p>
          </div>
          <div className="max-w-xs">
            <h3 className="font-semibold text-2xl mb-2">2. Donate / Collect</h3>
            <p>Restaurants donate surplus food; NGOs collect it to serve those in need.</p>
          </div>
          <div className="max-w-xs">
            <h3 className="font-semibold text-2xl mb-2">3. Deliver</h3>
            <p>Volunteers help deliver food, ensuring it reaches those who need it most.</p>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="mt-20 px-4 text-center">
        <h2 className="text-4xl font-bold mb-10">What People Say</h2>
        <div className="flex flex-wrap justify-center gap-8">
          <div className="max-w-xs bg-gray-200 p-6 rounded shadow">
            <p>“It feels amazing to know our extra food now reaches those who truly need it."</p>
            <p className="mt-4 font-semibold">- Restaurant Owner</p>
          </div>
          <div className="max-w-xs bg-gray-200 p-6 rounded shadow">
            <p>"Each time I hand over a meal, I see the difference we’re making together — it’s truly rewarding."</p>
            <p className="mt-4 font-semibold">- Volunteer</p>
          </div>
        </div>
      </section>
   <section className="">
    <h1 className="text-center text-4xl font-bold p-4">Gallery</h1>
    <div className="flex h-100 w-full ">
      <img src="photo1.jpg" className="flex-1 w-1/3 object-cover" />
  <img src="photo2.jpg" className="flex-1 w-1/3 object-cover" />
  <img src="photo3.jpg" className="flex-1 w-1/3 object-cover" />
    </div>
   </section>

      <footer className="mt-20 bg-blue-400 text-gray-800 text-center py-6">
        <p> 2025 Food Donation Platform. All rights reserved.</p>
      </footer>
    </div>
  );
}

export default Landing;
