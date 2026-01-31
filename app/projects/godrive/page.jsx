"use client";

// 1. Go back two steps to reach the 'app' folder, then into 'data'
import { projects as allProjects } from "../../data/projects";

// 2. Go back two steps to reach the 'app' folder, then into 'components'
import ProjectDetailPage from "../../components/projects/godrive"; 

export default function GoDrivePage() {
  const project = allProjects.find((p) => p.slug === "godrive");

  if (!project) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p>Project "godrive" not found in data/projects.js</p>
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