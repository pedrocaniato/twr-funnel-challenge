'use client';

import React, { useCallback, useEffect, useState, useMemo } from 'react';
import ReactFlow, {
  Background,
  Controls,
  useNodesState,
  useEdgesState,
  addEdge,
  Connection,
  Edge,
  Panel
} from 'reactflow';
import 'reactflow/dist/style.css';

import { FunnelNode } from '@/components/nodes/FunnelNode';
import { Button } from "@/components/ui/button";
import { cn } from '@/lib/utils';
import { PlusCircle, ChevronRight } from "lucide-react";

const nodeTypes = { funnel: FunnelNode };

const generateMockData = () => ({
  acessos: Math.floor(Math.random() * 8000) + 1000,
  conversao: (Math.random() * 15 + 2).toFixed(1),
});

export default function FunnelBuilder() {
  const [nodes, setNodes, onNodesChange] = useNodesState([]);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);
  const [isLoaded, setIsLoaded] = useState(false);
  const [isPanelOpen, setIsPanelOpen] = useState(true);
  const [lastSaved, setLastSaved] = useState<string>('');

  const onDeleteNode = useCallback((id: string) => {
    setNodes((nds) => nds.filter((node) => node.id !== id));
    setEdges((eds) => eds.filter((edge) => edge.source !== id && edge.target !== id));
  }, [setNodes, setEdges]);

  const onRenameNode = useCallback((id: string, newLabel: string) => {
    setNodes((nds) =>
      nds.map((node) => node.id === id ? { ...node, data: { ...node.data, label: newLabel } } : node)
    );
  }, [setNodes]);

  useEffect(() => {
    const savedNodes = localStorage.getItem('twr-nodes');
    const savedEdges = localStorage.getItem('twr-edges');
    
    if (savedNodes) {
      try { setNodes(JSON.parse(savedNodes)); } catch (e) { console.error(e); }
    }
    if (savedEdges) {
      try { setEdges(JSON.parse(savedEdges)); } catch (e) { console.error(e); }
    }
    
    setIsLoaded(true);
  }, [setNodes, setEdges]);

  useEffect(() => {
    if (!isLoaded) return;

    const timer = setTimeout(() => {
      localStorage.setItem('twr-nodes', JSON.stringify(nodes));
      localStorage.setItem('twr-edges', JSON.stringify(edges));
      setLastSaved(new Date().toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' }));
    }, 500);

    return () => clearTimeout(timer);
  }, [nodes, edges, isLoaded]);

  const onConnect = useCallback((params: Connection | Edge) => 
    setEdges((eds) => addEdge(params, eds)), [setEdges]);

  const addNode = useCallback((label: string) => {
    const id = `node_${Date.now()}`;
    const newNode = {
      id,
      type: 'funnel',
      position: { x: 150, y: 150 },
      data: { label, ...generateMockData() },
    };
    setNodes((nds) => [...nds, newNode]);
  }, [setNodes]);

  const nodesWithHandlers = useMemo(() => 
    nodes.map((node) => ({
      ...node,
      data: { ...node.data, onDelete: onDeleteNode, onRename: onRenameNode },
    })), [nodes, onDeleteNode, onRenameNode]);

  if (!isLoaded) return null;

  return (
    <div className="w-screen h-screen bg-[#f8fafc] antialiased">
      <ReactFlow
        nodes={nodesWithHandlers}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        nodeTypes={nodeTypes}
        fitView
      >
        <Background color="#cbd5e1" gap={20} size={1} />
        <Controls className="bg-white border-slate-200 shadow-md" />

        <Panel position="bottom-right" className="bg-white/80 backdrop-blur-sm border border-slate-200 px-3 py-1.5 rounded-full shadow-sm mb-4 mr-4 flex items-center gap-2">
          <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.6)]" />
          <span className="text-[10px] font-bold text-slate-500 uppercase tracking-tighter">
            {lastSaved ? `Salvo às ${lastSaved}` : 'Sincronizando...'}
          </span>
        </Panel>

        <Panel position="top-left" className="m-4">
          <div className="bg-white border border-slate-200 rounded-2xl px-5 py-3 shadow-sm select-none">
            <p className="text-[10px] font-black text-blue-600 uppercase tracking-[0.2em] mb-0.5">Engine v1.0</p>
            <h1 className="text-lg font-extrabold text-slate-900 tracking-tight leading-none">TWR Builder</h1>
          </div>
        </Panel>

        <Panel position="top-right" className="m-4">
          <div className={cn("relative transition-all duration-300", isPanelOpen ? "w-[280px]" : "w-12 h-12")}>
            
            {!isPanelOpen && (
              <Button
                onClick={() => setIsPanelOpen(true)}
                className="w-12 h-12 rounded-full bg-blue-600 hover:bg-blue-700 text-white shadow-lg animate-in zoom-in duration-300"
              >
                <PlusCircle className="w-6 h-6" />
              </Button>
            )}

            <div className={cn(
              "bg-white border border-slate-200 rounded-[2rem] shadow-2xl p-6 flex flex-col gap-5 origin-top-right transition-all duration-300",
              isPanelOpen ? "scale-100 opacity-100" : "scale-50 opacity-0 pointer-events-none absolute inset-0"
            )}>
              <div className="flex justify-between items-center">
                <div className="space-y-0.5">
                  <span className="text-[10px] font-bold text-blue-500 uppercase tracking-widest">Workspace</span>
                  <h2 className="text-xl font-black text-slate-900 tracking-tight">Etapas</h2>
                </div>
                <Button variant="ghost" size="icon" onClick={() => setIsPanelOpen(false)} className="rounded-full hover:bg-slate-100">
                  <ChevronRight className="w-5 h-5 text-slate-400" />
                </Button>
              </div>

              <div className="flex flex-col gap-2">
                {[
                  { label: 'Anúncio (Ads)', icon: '📢', color: 'hover:bg-sky-50 hover:border-sky-200' },
                  { label: 'Landing Page', icon: '📄', color: 'hover:bg-amber-50 hover:border-amber-200' },
                  { label: 'Formulário', icon: '📝', color: 'hover:bg-emerald-50 hover:border-emerald-200' },
                  { label: 'Página de Checkout', icon: '💳', color: 'hover:bg-rose-50 hover:border-rose-200' },
                  { label: 'Página de Obrigado', icon: '🎉', color: 'hover:bg-purple-50 hover:border-purple-200' },
                ].map((item) => (
                  <Button
                    key={item.label}
                    variant="outline"
                    className={cn("justify-start gap-3 h-14 rounded-2xl border-slate-100 font-bold text-slate-700 transition-all active:scale-95", item.color)}
                    onClick={() => addNode(item.label)}
                  >
                    <span className="text-2xl">{item.icon}</span>
                    <span className="text-xs">{item.label}</span>
                  </Button>
                ))}
              </div>
            </div>
          </div>
        </Panel>
      </ReactFlow>
    </div>
  );
}