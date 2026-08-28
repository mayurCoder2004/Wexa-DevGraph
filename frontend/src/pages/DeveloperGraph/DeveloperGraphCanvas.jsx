import { useMemo } from "react";
import {
  ReactFlow,
  Background,
  Controls,
  MiniMap,
  Handle,
  Position,
} from "@xyflow/react";

import "@xyflow/react/dist/style.css";

function GraphNode({ data }) {
  return (
    <div className="min-w-[170px] rounded-xl border border-slate-700 bg-slate-900 px-4 py-3 shadow-xl">
      <Handle
        type="target"
        position={Position.Top}
        className="!bg-slate-500"
      />

      <p className="text-xs font-medium uppercase tracking-wide text-slate-500">
        {data.type}
      </p>

      <p className="mt-1 text-sm font-semibold text-white">
        {data.label}
      </p>

      {data.category && (
        <p className="mt-1 text-xs text-slate-400">
          {data.category}
        </p>
      )}

      <Handle
        type="source"
        position={Position.Bottom}
        className="!bg-slate-500"
      />
    </div>
  );
}

function DeveloperGraphCanvas({ data }) {
  const { nodes, edges } = useMemo(() => {
    if (!data?.developer) {
      return { nodes: [], edges: [] };
    }

    const developer = data.developer;
    const skills = data.skills || [];
    const projects = data.projects || [];
    const technologies = data.technologies || [];

    const nodes = [];
    const edges = [];

    // Developer node
    nodes.push({
      id: `developer-${developer.id}`,
      type: "graphNode",
      position: { x: 450, y: 300 },
      data: {
        type: "Developer",
        label: developer.name,
        category: developer.role,
      },
    });

    // Skill nodes
    skills.forEach((skill, index) => {
      const angle =
        (index / Math.max(skills.length, 1)) * Math.PI * 2;

      const radius = 280;

      const x =
        450 + Math.cos(angle) * radius;

      const y =
        300 + Math.sin(angle) * radius;

      nodes.push({
        id: `skill-${skill.id}`,
        type: "graphNode",
        position: { x, y },
        data: {
          type: "Skill",
          label: skill.name,
          category: skill.category,
        },
      });

      edges.push({
        id: `developer-skill-${developer.id}-${skill.id}`,
        source: `developer-${developer.id}`,
        target: `skill-${skill.id}`,
        label: "HAS_SKILL",
        animated: true,
      });
    });

    // Project nodes
    projects.forEach((project, index) => {
      const x = 850;
      const y = 80 + index * 130;

      nodes.push({
        id: `project-${project.id}`,
        type: "graphNode",
        position: { x, y },
        data: {
          type: "Project",
          label: project.name,
          category: project.category,
        },
      });

      edges.push({
        id: `developer-project-${developer.id}-${project.id}`,
        source: `developer-${developer.id}`,
        target: `project-${project.id}`,
        label: "WORKED_ON",
      });
    });

    // Technology nodes
    technologies.forEach((technology, index) => {
      const x = 50;
      const y = 80 + index * 90;

      nodes.push({
        id: `technology-${technology.id}`,
        type: "graphNode",
        position: { x, y },
        data: {
          type: "Technology",
          label: technology.name,
          category: technology.category,
        },
      });

      edges.push({
        id: `developer-technology-${developer.id}-${technology.id}`,
        source: `developer-${developer.id}`,
        target: `technology-${technology.id}`,
        label: "USES",
      });
    });

    return { nodes, edges };
  }, [data]);

  const nodeTypes = useMemo(
    () => ({
      graphNode: GraphNode,
    }),
    []
  );

  return (
    <div className="graph-canvas mt-6 h-[700px] overflow-hidden rounded-xl border border-slate-800 bg-slate-950">
      <ReactFlow
        nodes={nodes}
        edges={edges}
        nodeTypes={nodeTypes}
        fitView
        fitViewOptions={{
          padding: 0.2,
        }}
        defaultEdgeOptions={{
          style: {
            strokeWidth: 1.5,
          },
        }}
      >
        <Background />
        <Controls />
        <MiniMap />
      </ReactFlow>
    </div>
  );
}

export default DeveloperGraphCanvas;
