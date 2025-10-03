import pooja from './pooja.png';
import pooja2 from './Pooja2.jpg';
import logo from './logo.png';
import cursor from './cursor.png';
import image from './3d image.png';
import header from './header-shapes.png'

import logonav from './image.png'
import logo2 from './logo2.png'
import bluecircle from './bluecircles.png'
import flowerbraccet from './flower braccet.svg'
import circle from './circle.png'
import orangestar from './orangestar.png'
import purpleflower from './purpleflower.png'
import spin from './spin.png'
import pooja1 from './Pooja1.jpg'

import ruthwik from './ruthwik.png'


import express from './Express.png'
import sql from './Sql.jpg'
import react from './React.png'
import tailwind from './Tailwind.png'
import javascript from './JavaScript.png'
import profile from './Ruthwik Profile.jpg'
import spring from './Springboot.png'
import mainbanner from '../assets/Mainbanner.jpeg';
import resume from './Nagaruthwik_Full_Stack_resume.pdf'
import hostel from './hostel.png'
import ecommers from "./store_image.jpg"
import resume_fullstack from "./Nagaruthwik_Fullstack_Resume.pdf"
import otSchedular from './otScheduler.png';
import cloudy from './cloudy.png';

import { FaLinkedin } from "react-icons/fa";
import { FaSquareInstagram, FaGithub } from "react-icons/fa6";
import { CiPhone } from "react-icons/ci";
import { MdEmail } from "react-icons/md";

export const images = {
    pooja1,
    pooja,
    pooja2,
    logo,
    cursor,
    image,
    header,
    bluecircle,
    flowerbraccet,
    circle,
    orangestar,
    purpleflower,
    spin,
    ruthwik


}



export const logos = {
    logonav,
    logo2
}

export const contact = [
    {
        name: "email",
        detail: "nagaruthwikmerugu162@gmail.com",
        icon: MdEmail,
    },
    {
        name: "mobile",
        detail: "9182216089",
        icon: CiPhone,
    }
]

export const links = [
    {
        name: "LinkedIn",
        href: "https://linkedin.com/in/nagaruthwikmerugu/",
        icon: FaLinkedin,
    },
    {
        name: "Instagram",
        href: "https://www.instagram.com/m.n.ruthwik/",
        icon: FaSquareInstagram,
    },
    {
        name: "Github",
        href: "https://github.com/ruthwik162/",
        icon: FaGithub,
    },
];


export const assets = {
    express,
    spring,
    sql,
    react,
    tailwind,
    javascript,
    profile,
    mainbanner,
    resume,
    hostel,
    ecommers,
    image,
    resume_fullstack,
    otSchedular,
    cloudy

}
export const pdf = [

]



export const dummyImages = [
    {
        img: react,
        name: "React"
    },
    {
        img: javascript,
        name: "Java Script"
    },
    {
        img: tailwind,
        name: "Tailwind"
    },
    {
        img: spring,
        name: "Spring"
    },
    {
        img: express,
        name: "Express"
    },
    {
        img: sql,
        name: "MySQL"
    }
]

export const projects = [
    {
        _id: "teacher-student-appointment",
        image: "https://plus.unsplash.com/premium_vector-1682298541598-7683a95289e9?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0",
        title: "Student-Teacher Appointment Scheduler",
        description: "Comprehensive appointment scheduling platform for educational institutions, enabling seamless booking and management of student-teacher meetings.",
        maindesc: `
The Student-Teacher Appointment Scheduler is a full-featured web application designed to streamline the process of booking meetings between students and teachers. 
It allows students to view available time slots, book appointments, and receive email notifications. Teachers can manage their schedule, approve or decline requests, and monitor upcoming meetings.
Built with React for a dynamic frontend, Node.js for the backend, and MongoDB for data persistence, the platform provides real-time updates and ensures a seamless user experience. Tailwind CSS ensures a responsive and modern interface suitable for all devices.
    `,
        role: "Fullstack Developer",
        stacks: [
            { name: "React" },
            { name: "Node.js" },
            { name: "MongoDB" },
            { name: "Tailwind" }
        ],
        url: "https://teacher-student-appointment-a7hf.onrender.com/"
    },
    {
        _id: "operation-theatre-scheduler",
        image: "https://plus.unsplash.com/premium_vector-1682298570780-c416aa7b710f?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0",
        title: "Operation Theatre Scheduler",
        description: "Operation theatre scheduling system with real-time updates, resource management, and analytics dashboard for optimized hospital workflows.",
        maindesc: `
The Operation Theatre Scheduler is a hospital management tool that optimizes surgical workflows by scheduling operations, assigning medical staff, and managing OT resources in real-time.
Doctors, nurses, and support staff are automatically allocated based on department, role, and availability. The system sends email notifications, maintains activity logs, and ensures no scheduling conflicts.
Developed using React, Node.js, and MongoDB, the platform offers a responsive and intuitive interface with real-time data updates, improving efficiency and reducing human error in critical hospital operations.
    `,
        role: "Fullstack Developer",
        stacks: [
            { name: "React" },
            { name: "Node.js" },
            { name: "MongoDB" },
            { name: "Tailwind" }
        ],
        url: "https://operartion-theatre-schedular.vercel.app/"
    },
    {
        _id: "mallareddy-university-hostel",
        image: "https://media.istockphoto.com/id/2196521057/vector/hostel-check-in-isolated-cartoon-vector-illustrations.webp?a=1&b=1&s=612x612&w=0&k=20&c=DNzwPGcWP-ysAR8oKZSOhTsKaNKCP5VosdSMd_PKdEg=",
        title: "Mallareddy University Hostel",
        description: "Mallareddy university website with interactive campus map, event calendar, and integrated student portal for enhanced user experience.",
        maindesc: `
The Mallareddy University Hostel project is a complete student accommodation management system. 
It allows students to book rooms, choose plans (Basic, Standard, Premium), and view hostel block details. Administrators can manage rooms, assign beds, and track occupancy in real-time.
The system is fully integrated with a student portal, featuring an interactive campus map and event calendar. Built using React, Node.js, and MongoDB with Tailwind CSS, it offers a responsive, user-friendly interface for both students and university staff.
    `,
        role: "Fullstack Developer",
        stacks: [
            { name: "React" },
            { name: "Node.js" },
            { name: "MongoDB" },
            { name: "Tailwind" }
        ],
        url: "https://malla-reddy-university.vercel.app/"
    },
    {
        _id: "e-commerce-platform",
        image: assets.ecommers,
        title: "e-Commerce Platform",
        description: "E-commerce platform with AI-driven product recommendations, dynamic pricing, and seamless checkout experience.",
        maindesc: `
This E-commerce Platform is designed to deliver a modern, responsive, and personalized online shopping experience. 
It features AI-driven product recommendations, dynamic pricing algorithms, secure payment integration, and a seamless checkout process.
Users can browse products, filter by category, and manage their cart with ease. The platform is built with React for the frontend, Node.js for backend APIs, MongoDB for database management, and Tailwind CSS for responsive design.
It provides analytics dashboards for admins to monitor sales, customer behavior, and inventory in real-time.
    `,
        role: "Fullstack Developer",
        stacks: [
            { name: "React" },
            { name: "Node.js" },
            { name: "MongoDB" },
            { name: "Tailwind" }
        ],
        url: "https://e-commerce-ten-rose-60.vercel.app/"
    }
];