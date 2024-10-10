'use client'
import React from "react";
import Image from "next/image";
const CardGrid: FC = () => {
  const cards = [
    { title: "Employee Database Management", color: "bg-green-50", image: "/images/calender.png" },
    { title: "Performance Management", color: "bg-pink-50", image: "/images/clock.png" },
    { title: "Employee Onboarding", color: "bg-yellow-50", image: "/images/alert.png" },
    { title: "Leave Tracker", color: "bg-blue-50", image: "/images/database.png" },
    { title: "Timesheets", color: "bg-yellow-50", image: "/images/database.png" },
    { title: "Shift Scheduling", color: "bg-blue-50", image: "/images/calender.png" },
  ];

  return (
    <div className=" min-h-screen flex items-center justify-center">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-14 p-8">
        {cards.map((card, index) => (
          <div
            key={index}
            className={`w-60 h-64 flex flex-col items-center justify-center p-6 rounded-2xl  ${card.color}`}
          >
            <Image src={card.image} alt={card.title} width={120} height={120} className="mb-6"/>
            <h3 className="text-xl font-medium text-gray-700 text-center">
              {card.title}
            </h3>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CardGrid;
