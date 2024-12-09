import React from 'react';
import { PlayCircle, BookOpen, Download, Star, Clock } from 'lucide-react';

function VIAcademyPage() {
  const courses = [
    {
      title: "Low Poly Modeling Fundamentals",
      description: "Learn the basics of creating efficient low poly models",
      duration: "2 hours",
      level: "Beginner",
      rating: 4.8,
      students: 1234,
      image: "https://source.unsplash.com/800x600/?3d,modeling"
    },
    {
      title: "Advanced Optimization Techniques",
      description: "Master the art of optimizing 3D models for performance",
      duration: "3 hours",
      level: "Advanced",
      rating: 4.9,
      students: 856,
      image: "https://source.unsplash.com/800x600/?3d,design"
    },
    {
      title: "Material Creation Workshop",
      description: "Create professional materials for your 3D models",
      duration: "2.5 hours",
      level: "Intermediate",
      rating: 4.7,
      students: 978,
      image: "https://source.unsplash.com/800x600/?texture,material"
    }
  ];

  const tutorials = [
    {
      title: "Quick Start Guide",
      type: "Video",
      duration: "15 min",
      icon: PlayCircle
    },
    {
      title: "Best Practices Manual",
      type: "Document",
      duration: "30 min read",
      icon: BookOpen
    },
    {
      title: "Resource Pack",
      type: "Download",
      size: "1.2 GB",
      icon: Download
    }
  ];

  return (
    <div className="min-h-screen bg-white pt-28">
      {/* Hero Section */}
      <section className="bg-gray-900 text-white py-16">
        <div className="max-w-[1400px] mx-auto px-6">
          <h1 className="text-4xl font-light mb-4">VI-Academy</h1>
          <p className="text-xl text-gray-400 mb-8">
            Master the art of 3D modeling with our comprehensive courses and tutorials
          </p>
          <div className="grid grid-cols-4 gap-8 mt-12">
            <div className="text-center">
              <PlayCircle className="h-8 w-8 mx-auto mb-4" />
              <h3 className="font-medium mb-2">Video Courses</h3>
              <p className="text-gray-400">Learn at your own pace</p>
            </div>
            <div className="text-center">
              <BookOpen className="h-8 w-8 mx-auto mb-4" />
              <h3 className="font-medium mb-2">Documentation</h3>
              <p className="text-gray-400">Detailed guides & manuals</p>
            </div>
            <div className="text-center">
              <Star className="h-8 w-8 mx-auto mb-4" />
              <h3 className="font-medium mb-2">Expert Support</h3>
              <p className="text-gray-400">Get help when you need it</p>
            </div>
            <div className="text-center">
              <Clock className="h-8 w-8 mx-auto mb-4" />
              <h3 className="font-medium mb-2">Self-Paced</h3>
              <p className="text-gray-400">Learn on your schedule</p>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Courses */}
      <section className="py-16">
        <div className="max-w-[1400px] mx-auto px-6">
          <h2 className="text-3xl font-light mb-12">Featured Courses</h2>
          <div className="grid grid-cols-3 gap-8">
            {courses.map((course, idx) => (
              <div key={idx} className="bg-white rounded-lg overflow-hidden shadow-lg">
                <img
                  src={course.image}
                  alt={course.title}
                  className="w-full h-48 object-cover"
                />
                <div className="p-6">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm text-gray-500">{course.level}</span>
                    <div className="flex items-center">
                      <Star className="h-4 w-4 text-yellow-400 mr-1" />
                      <span className="text-sm">{course.rating}</span>
                    </div>
                  </div>
                  <h3 className="text-xl font-medium mb-2">{course.title}</h3>
                  <p className="text-gray-600 mb-4">{course.description}</p>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center text-sm text-gray-500">
                      <Clock className="h-4 w-4 mr-1" />
                      {course.duration}
                    </div>
                    <span className="text-sm text-gray-500">
                      {course.students} students
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Quick Start Resources */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-[1400px] mx-auto px-6">
          <h2 className="text-3xl font-light mb-12">Quick Start Resources</h2>
          <div className="grid grid-cols-3 gap-8">
            {tutorials.map((tutorial, idx) => (
              <div key={idx} className="bg-white p-6 rounded-lg shadow-sm">
                <tutorial.icon className="h-8 w-8 mb-4" />
                <h3 className="text-xl font-medium mb-2">{tutorial.title}</h3>
                <div className="flex items-center text-sm text-gray-500">
                  {tutorial.duration || tutorial.size}
                </div>
                <button className="mt-4 text-blue-600 hover:text-blue-700">
                  Access Now →
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

export default VIAcademyPage;