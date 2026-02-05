"use client";

import { projects as allProjects } from "../../data/projects";
import ProjectDetailPage from "../../components/projects/vinrad"; 

export default function VinRadPage() {
  const project = allProjects.find((p) => p.slug === "vinrad");

  if (!project) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p>Projekt nebyl nalezen.</p>
      </div>
    );
  }

  return (
    <ProjectDetailPage 
      project={project} 
      isDark={true} 
      lang="CZ" 
    />
  );
}