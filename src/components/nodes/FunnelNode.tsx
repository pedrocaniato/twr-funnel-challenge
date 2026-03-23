import { Handle, Position, NodeProps } from 'reactflow';
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { MousePointer2, Users, Trash2, Megaphone, FileText, CheckSquare, ShoppingCart, PartyPopper } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

const getNodeConfig = (label: string) => {
  const l = label.toLowerCase();
  if (l.includes('ads') || l.includes('anúncio')) return { icon: Megaphone, color: 'text-sky-600', bgColor: 'bg-sky-50', borderColor: 'group-hover:border-sky-300' };
  if (l.includes('landing')) return { icon: FileText, color: 'text-amber-600', bgColor: 'bg-amber-50', borderColor: 'group-hover:border-amber-300' };
  if (l.includes('form')) return { icon: CheckSquare, color: 'text-emerald-600', bgColor: 'bg-emerald-50', borderColor: 'group-hover:border-emerald-300' };
  if (l.includes('check')) return { icon: ShoppingCart, color: 'text-rose-600', bgColor: 'bg-rose-50', borderColor: 'group-hover:border-rose-300' };
  if (l.includes('obrigado')) return { icon: PartyPopper, color: 'text-purple-600', bgColor: 'bg-purple-50', borderColor: 'group-hover:border-purple-300' };
  return { icon: MousePointer2, color: 'text-slate-600', bgColor: 'bg-slate-50', borderColor: 'group-hover:border-slate-300' };
};

export function FunnelNode({ id, data }: NodeProps) {
  const config = getNodeConfig(data.label);
  const Icon = config.icon;

  return (
    <div className={cn(
      "group relative rounded-xl bg-white border border-slate-200 min-w-[240px] transition-all duration-300 shadow-sm hover:shadow-xl",
      config.borderColor
    )}>
      <Button 
        variant="destructive" 
        size="icon" 
        className="nodrag absolute -top-3 -right-3 w-7 h-7 rounded-full opacity-0 group-hover:opacity-100 transition-all duration-300 scale-75 group-hover:scale-100 z-20 shadow-lg"
        onClick={(e) => { e.stopPropagation(); data.onDelete(id); }}
      >
        <Trash2 className="w-4 h-4" />
      </Button>

      <Handle type="target" position={Position.Top} className="w-3 h-3 bg-slate-300 border-2 border-white !-top-1.5" />
      <Handle type="source" position={Position.Bottom} className="w-3 h-3 bg-blue-500 border-2 border-white !-bottom-1.5 hover:scale-125 transition-transform" />
      
      <Card className="border-none shadow-none bg-transparent overflow-hidden">
        <div className={cn("px-4 py-2 border-b border-slate-100 flex items-center gap-3", config.bgColor)}>
          <div className={cn("p-1.5 rounded-lg bg-white shadow-inner", config.color)}>
            <Icon className="w-5 h-5 stroke-[2.5]" />
          </div>
          <Input 
            value={data.label} 
            onChange={(e) => data.onRename(id, e.target.value)}
            className="nodrag nopan h-7 text-sm font-bold border-none focus-visible:ring-0 p-0 bg-transparent hover:bg-white/50 transition-colors cursor-text"
            onKeyDown={(e) => e.stopPropagation()}
          />
        </div>
        <CardContent className="p-4 pt-3 flex flex-col gap-3">
          <div className="flex justify-between items-end">
            <span className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider flex items-center gap-1.5">
              <Users className="w-3.5 h-3.5 text-slate-400" /> ACESSOS
            </span>
            <span className="text-xl font-extrabold text-slate-950 font-mono leading-none tracking-tight">
              {data.acessos.toLocaleString('pt-BR')}
            </span>
          </div>
          <div className="flex justify-between items-center bg-slate-50 rounded-lg px-3 py-1.5 border border-slate-100">
            <span className="text-xs font-medium text-slate-600 italic">Conversão</span>
            <Badge variant="secondary" className="bg-emerald-100 text-emerald-800 hover:bg-emerald-100 py-0.5 px-2 text-xs font-bold font-mono rounded-full">
              {data.conversao}%
            </Badge>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}