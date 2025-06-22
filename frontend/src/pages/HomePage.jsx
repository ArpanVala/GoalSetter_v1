import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
  Target, 
  CheckCircle, 
 Lock, 
  BarChart3,
  Edit3,
  Star,
  ArrowRight,
  Play,
  Trophy,
  Filter,
  Github,
  Linkedin,
  Instagram
} from 'lucide-react';

const HomePage = () => {
  const [currentTestimonial, setCurrentTestimonial] = useState(0);

  const features = [
    {
      icon: Filter,
      title: "Smart Organization",
      description: "Custom categories and intelligent priority systems keep your goals perfectly organized",
      color: "from-emerald-500 to-teal-600"
    },
    {
      icon: BarChart3,
      title: "Visual Progress Tracking",
      description: "Beautiful dashboards and progress bars show your achievements in real-time",
      color: "from-blue-500 to-cyan-600"
    },
    {
        icon: Lock,
        title: "Secure Authentication",
        description: "High-level security with JWT authentication and protected routes for your personal data",
        color: "from-pink-500 to-rose-600"
      },
      {
        icon: Edit3,
        title: "Flexible Goal Management",
        description: "Add, edit, delete, and update goals and goal categories with actions support",
        color: "from-yellow-500 to-amber-600"
      },
  ];

  const testimonials = [
    {
      text: "Liked the UI. Simple, Clean and not overwhelming",
      author: "Unil Prajapati",
      role: "Web Developer",
      rating: 5
    },
    {
        text: "GoalSetter completely changed how I approach my personal development. The category system helps me balance work, health, and personal goals effortlessly.",
        author: "Sarah Mitchell",
        role: "Product Manager",
        rating: 5
      },
    {
      text: "I've tried countless goal-tracking apps, but GoalSetter's visual progress tracking keeps me motivated like nothing else. Finally achieved my fitness goals!",
      author: "Marcus Johnson",
      role: "Fitness Enthusiast",
      rating: 5
    },
    {
      text: "The priority system is genius. I can finally focus on what truly matters instead of getting overwhelmed by my endless to-do list.",
      author: "Emily Chen",
      role: "Entrepreneur",
      rating: 5
    }
  ];

  const steps = [
    {
      number: "01",
      title: "Organize",
      description: "Create custom categories for different areas of your life - Career, Health, Personal, Learning",
      icon: Filter
    },
    {
      number: "02", 
      title: "Plan",
      description: "Add goals with priorities and due dates. Our smart system helps you focus on what matters most",
      icon: Target
    },
    {
      number: "03",
      title: "Achieve",
      description: "Track progress with visual dashboards and celebrate every milestone along the way",
      icon: Trophy
    }
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen bg-white  animate-fadeIn">
      {/* Hero Section */}
      <section className="py-10 bg-gradient-to-br from-emerald-50 via-blue-50 to-purple-50">
        <div className="px-4 max-w-[1048px] mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-15">
            {/* aside text content */}
              <div className="space-y-4">
                <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 leading-tight">
                  Turn Your Dreams Into {' '}
                  <span className="bg-gradient-to-r from-teal-400 to-blue-400 bg-clip-text text-transparent">
                     Achievable Goals
                  </span>
                </h1>
                <p className="text-lg md:text-xl text-gray-500 leading-relaxed">
                  The smart way to set, track, and crush your goals with powerful organization tools that actually work.
                </p>
              </div>

                {/* CTA buttons */}
              <div className="flex flex-col sm:flex-row gap-3 ">
              <Link to='/register' className="group bg-gradient-to-r from-teal-500 to-blue-500 px-4 py-2 text-white rounded-lg font-semibold hover:shadow-xl transform hover:scale-105 transition-all duration-300 flex items-center justify-center">Start Achieving Goals Today<ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
                </Link>
                <a href="https://www.youtube.com/watch?v=4GpBHTqaSus" target='_blank'>
                <button className="flex items-center justify-center px-4 py-2 border-2 border-gray-300 rounded-lg font-semibold text-gray-700 hover:border-emerald-500 hover:text-emerald-600 transition-all duration-300">
                  <Play className="w-5 h-5 mr-2" />
                  Watch Demo
                </button>
                </a>
              </div>

              <div className="flex items-center space-x-8 text-sm text-gray-500">
                <div className="flex items-center">
                  <CheckCircle className="w-4 h-4 text-emerald-500 mr-2" />
                  No credit card required
                </div>
                <div className="flex items-center">
                  <CheckCircle className="w-4 h-4 text-emerald-500 mr-2" />
                  Free forever plan
                </div>
              </div>
            </div>

            {/* Hero card */}
            <div className="relative">
              <div className="bg-white rounded-3xl shadow-2xl p-8 transform rotate-2 hover:rotate-0 transition-transform duration-500">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <h3 className="text-lg font-semibold text-gray-500">Your Dashboard</h3>
                    <div className="flex space-x-2">
                      <div className="w-3 h-3 bg-red-400 rounded-full"></div>
                      <div className="w-3 h-3 bg-yellow-400 rounded-full"></div>
                      <div className="w-3 h-3 bg-green-400 rounded-full"></div>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div className="bg-gradient-to-r from-emerald-500 to-teal-600 p-4 rounded-xl text-white">
                      <div className="text-2xl font-bold">12</div>
                      <div className="text-sm opacity-90">Total Goals</div>
                      <div className="w-full bg-white/20 rounded-full h-2 mt-2">
                        <div className="bg-white rounded-full h-2 w-3/4"></div>
                      </div>
                    </div>
                    <div className="bg-gradient-to-r from-blue-500 to-cyan-600 p-4 rounded-xl text-white">
                      <div className="text-2xl font-bold">8</div>
                      <div className="text-sm opacity-90">Completed</div>
                      <div className="w-full bg-white/20 rounded-full h-2 mt-2">
                        <div className="bg-white rounded-full h-2 w-2/3"></div>
                      </div>
                    </div>
                    <div className="bg-gradient-to-r from-purple-500 to-indigo-600 p-4 rounded-xl text-white">
                      <div className="text-2xl font-bold">4</div>
                      <div className="text-sm opacity-90">Categories</div>
                      <div className="w-full bg-white/20 rounded-full h-2 mt-2">
                        <div className="bg-white rounded-full h-2 w-1/2"></div>
                      </div>
                    </div>
                    <div className="bg-gradient-to-r from-orange-500 to-red-600 p-4 rounded-xl text-white">
                      <div className="text-2xl font-bold">2</div>
                      <div className="text-sm opacity-90">Due Soon</div>
                      <div className="w-full bg-white/20 rounded-full h-2 mt-2">
                        <div className="bg-white rounded-full h-2 w-1/4"></div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="absolute -top-4 right-0 w-10 h-10 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full flex items-center justify-center animate-bounce shadow-lg">
                <Trophy className="w-5 h-5 text-white" />
              </div>
            </div>
          </div>
        </div>
      </section>

    <section className=' hidden max-w-[1048px] mx-auto px-4 my-7'>
    <div className="bg-yellow-50 border border-yellow-400 text-sm rounded-lg p-4">
                <p className="text-yellow-800 font-medium">
                  ⚠️ 67% of people abandon their goals within the first month. Why? Because they lack a system.
                </p>
              </div>

    </section>
      {/* Features Section */}
      <section id="features" className="mt-15 bg-white">
        <div className="max-w-[1048px] mx-auto px-4">
          <div className="text-center mb-10">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Everything You Need to{' '}
              <span className="bg-gradient-to-r from-teal-400 to-blue-400 bg-clip-text text-transparent">
                Succeed
              </span>
            </h2>
            <p className="text-md md:text-lg text-gray-600 max-w-3xl mx-auto">
              GoalSetter gives you the complete goal management system that successful people use to stay on track and achieve more.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {features.map((feature, index) => (
              <div key={index} className="group bg-white rounded-lg p-6 border-2 border-gray-100 transition-all duration-300 hover:-translate-y-1">
                <div className={`inline-flex items-center justify-center w-10 h-10 bg-gradient-to-r ${feature.color} rounded-xl mb-3`}>
                  <feature.icon className="w-5 h-5 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900">{feature.title}</h3>
                <p className="text-gray-600 leading-relaxed">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section id="how-it-works" className="mt-15 py-15 bg-gray-50">
        <div className="max-w-[1048px] mx-auto px-4">
          <div className="text-center mb-10">
            <h2 className="text-4xl font-bold text-gray-900 mb-2">How It Works</h2>
            <p className="text-lg text-gray-600">Three simple steps to goal achievement success</p>
          </div>

          <div className="grid md:grid-cols-3 gap-10">
            {steps.map((step, index) => (
              <div key={index} className="relative text-center group">
                <div className="inline-flex items-center justify-center w-18 h-18 bg-gradient-to-r from-emerald-500 to-teal-600 rounded-full mb-4 group-hover:scale-110 transition-transform duration-300">
                  <step.icon className="w-8 h-8 text-white" />
                </div>

                <h3 className="text-2xl font-bold text-gray-900 mb-2">{step.title}</h3>
                <p className="text-gray-600">{step.description}</p>
                
                {index < steps.length - 1 && (
                  <div className="hidden md:block absolute top-10 left-full w-full">
                    <ArrowRight className="w-8 h-8 text-emerald-300 mx-auto" />
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section id="testimonials" className="py-15 bg-gradient-to-br from-emerald-50 to-blue-50">
        <div className="max-w-[1048px] mx-auto px-4">
          <div className="text-center mb-10">
            <h2 className="text-4xl font-bold text-gray-900 mb-2">What Our Users Say</h2>
            <p className="text-xl text-gray-600">Real results from real people</p>
          </div>

          <div className="bg-white rounded-3xl p-8 shadow-2xl">
            <div className="text-center">
              <div className="flex justify-center mb-5">
                {[...Array(testimonials[currentTestimonial].rating)].map((_, i) => (
                  <Star key={i} className="w-6 h-6 text-yellow-400 fill-current" />
                ))}
              </div>
              <blockquote className="text-xl text-gray-700 font-medium mb-5 leading-relaxed">
                "{testimonials[currentTestimonial].text}"
              </blockquote>
              <div>
                <div className="font-bold text-gray-900 text-xl">
                  {testimonials[currentTestimonial].author}
                </div>
                <div className="text-gray-600">
                  {testimonials[currentTestimonial].role}
                </div>
              </div>
            </div>

            <div className="flex justify-center mt-6 space-x-3">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentTestimonial(index)}
                  className={`w-3 h-3 rounded-full transition-all duration-300 ${
                    index === currentTestimonial ? 'bg-emerald-500' : 'bg-gray-300'
                  }`}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-20 bg-gradient-to-tr from-teal-400 to-blue-500">
        <div className="max-w-[1048px] mx-auto px-4  text-center">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Ready to Transform Your Life?
          </h2>
          <p className="text-xl text-emerald-100 mb-8">
            Join the goal-setting revolution and start achieving more than you ever thought possible
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-8">
            <Link to='/register' className="group bg-linear-to-r from-blue-200 to-teal-100 text-gray-700 px-6 py-3 rounded-xl font-bold text-lg hover:bg-gray-50 hover:shadow-xl transform hover:scale-105 transition-all duration-300 flex items-center">
              Get Started Free Today
              <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
            </Link>
            <a href="https://www.youtube.com/watch?v=4GpBHTqaSus" target='_blank'>
            <button className="border-2 border-white text-white px-6 py-3 rounded-xl font-bold text-lg hover:bg-white hover:text-emerald-600 transition-all duration-300">
              Watch Demo First
            </button>
            </a>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-5">
        <div className="max-w-[1048px] mx-auto px-4">  
          <div className="text-center text-gray-400 text-sm flex items-center justify-between gap-2">
            <p>&copy; 2025 GoalSetter.</p>
            <div className='flex items-center gap-6'>
            <a href="https://github.com/ArpanVala" target='_blank'><Github className='w-5 h-5 hover:text-teal-500'/></a>
            <a href="https://linkedin.com/in/arpanvala" target='_blank'><Linkedin className='w-5 h-5 hover:text-teal-500'/></a>
            <a href="https://www.instagram.com/arpanvala05/" target='_blank'><Instagram className='w-5 h-5 hover:text-teal-500'/></a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default HomePage;