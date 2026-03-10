import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';

interface Skill {
  category: string;
  items: string[];
}

interface Project {
  title: string;
  description: string;
  technologies: string[];
  image?: string;
  link?: string;
  github?: string;
}

interface Experience {
  company: string;
  position: string;
  period: string;
  description: string[];
}

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, CommonModule],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  currentYear = new Date().getFullYear();
  
  profile = {
    name: 'Your Name',
    title: 'Full Stack Developer',
    email: 'your.email@example.com',
    phone: '+1 (123) 456-7890',
    location: 'City, Country',
    github: 'https://github.com/yourusername',
    linkedin: 'https://linkedin.com/in/yourusername',
    about: `Passionate Full Stack Developer with expertise in modern web technologies. 
            I specialize in creating scalable, user-friendly applications with clean code and best practices. 
            With a strong foundation in both frontend and backend development, I love turning complex problems 
            into elegant solutions.`
  };

  skills: Skill[] = [
    {
      category: 'Frontend',
      items: ['Angular', 'React', 'TypeScript', 'JavaScript', 'HTML5', 'CSS3', 'Tailwind CSS', 'Bootstrap']
    },
    {
      category: 'Backend',
      items: ['Node.js', 'Express', 'Python', 'Django', 'REST APIs', 'GraphQL']
    },
    {
      category: 'Database',
      items: ['MongoDB', 'PostgreSQL', 'MySQL', 'Firebase', 'Redis']
    },
    {
      category: 'Tools & Others',
      items: ['Git', 'Docker', 'AWS', 'CI/CD', 'Agile', 'Jest', 'Webpack']
    }
  ];

  projects: Project[] = [
    {
      title: 'E-Commerce Platform',
      description: 'A full-featured e-commerce platform with user authentication, product management, shopping cart, and payment integration.',
      technologies: ['Angular', 'Node.js', 'MongoDB', 'Stripe'],
      link: '#',
      github: '#'
    },
    {
      title: 'Task Management App',
      description: 'Real-time collaborative task management application with drag-and-drop functionality and team collaboration features.',
      technologies: ['React', 'Firebase', 'Material-UI', 'WebSocket'],
      link: '#',
      github: '#'
    },
    {
      title: 'Weather Dashboard',
      description: 'Interactive weather dashboard showing current conditions and forecasts with beautiful visualizations and location search.',
      technologies: ['Angular', 'TypeScript', 'Chart.js', 'Weather API'],
      link: '#',
      github: '#'
    },
    {
      title: 'Social Media Analytics',
      description: 'Analytics platform for tracking social media metrics, engagement rates, and audience insights with comprehensive reports.',
      technologies: ['Python', 'Django', 'PostgreSQL', 'D3.js'],
      link: '#',
      github: '#'
    }
  ];

  experience: Experience[] = [
    {
      company: 'Tech Company Inc.',
      position: 'Senior Full Stack Developer',
      period: '2022 - Present',
      description: [
        'Led development of enterprise web applications serving 100K+ users',
        'Implemented microservices architecture improving system scalability by 60%',
        'Mentored junior developers and conducted code reviews',
        'Collaborated with cross-functional teams using Agile methodology'
      ]
    },
    {
      company: 'Digital Solutions Ltd.',
      position: 'Full Stack Developer',
      period: '2020 - 2022',
      description: [
        'Developed and maintained multiple client-facing web applications',
        'Optimized application performance resulting in 40% faster load times',
        'Integrated third-party APIs and payment gateways',
        'Participated in daily stand-ups and sprint planning sessions'
      ]
    },
    {
      company: 'Startup Ventures',
      position: 'Junior Developer',
      period: '2018 - 2020',
      description: [
        'Built responsive user interfaces using modern frameworks',
        'Implemented RESTful APIs and database schemas',
        'Fixed bugs and improved code quality through testing',
        'Contributed to internal tools and automation scripts'
      ]
    }
  ];

  scrollToSection(sectionId: string) {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }
}
