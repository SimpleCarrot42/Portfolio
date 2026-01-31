"use client";

// Define the slug for data filtering
const projectName = "books";

// 1. Import the projects data
import { projects as allProjects } from "../../data/projects";

// 2. STATIC IMPORT (No variables allowed here)
import ProjectDetailPage from "../../components/projects/books"; 

export default function ProjectPage() {
  // Find the project data object
  const project = allProjects.find((p) => p.slug === projectName);

  if (!project) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p>The project "{projectName}" was not found in data/projects.js</p>
      </div>
    );
  }

  return (
    <ProjectDetailPage 
      project={project} 
      isDark={true} 
      lang="EN" 
    />
  );
}