import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Building2, 
  LayoutDashboard, 
  ShieldCheck, 
  AlertTriangle, 
  HelpCircle, 
  LogOut, 
  Bell, 
  Settings,
  ChevronRight,
  Fingerprint,
  ScanFace,
  Key,
  IdCard,
  ArrowUp,
  ArrowDown,
  CheckCircle2,
  MoveUp,
  Terminal,
  Activity,
  Plus
} from 'lucide-react';
import { cn } from './lib/utils';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from 'recharts';

// --- Types ---

type View = 'login' | 'selection' | 'monitoring';

interface User {
  name: string;
  id: string;
  clearance: string;
}

// --- Mock Data ---

const MOCK_USER: User = {
  name: 'John Doe',
  id: 'VX-7729',
  clearance: 'Level 4'
};

const TRAFFIC_DATA = [
  { time: '08:00', load: 40 },
  { time: '10:00', load: 65 },
  { time: '12:00', load: 95 },
  { time: '14:00', load: 75 },
  { time: '16:00', load: 50 },
  { time: '18:00', load: 30 },
  { time: '20:00', load: 85 },
];

const ELEVATORS = [
  { id: 'UNIT-A', floor: 42, status: 'ascending', speed: '4.2 m/s', load: '120 kg' },
  { id: 'UNIT-B', floor: 8, status: 'stationary', speed: '0.0 m/s', load: '0 kg' },
  { id: 'UNIT-C', floor: 15, status: 'descending', speed: '2.8 m/s', load: '320 kg' },
  { id: 'UNIT-D', floor: '--', status: 'alert', speed: '0.0 m/s', load: '0 kg', msg: 'DOOR OBSTRUCTION' },
  { id: 'UNIT-E', floor: 64, status: 'ascending', speed: '5.1 m/s', load: '450 kg' },
  { id: 'UNIT-F', floor: 'LL2', status: 'stationary', speed: '0.0 m/s', load: '0 kg' },
  { id: 'UNIT-G', floor: 22, status: 'descending', speed: '1.2 m/s', load: '85 kg' },
  { id: 'UNIT-H', floor: 4, status: 'ascending', speed: '3.9 m/s', load: '210 kg' },
];

// --- Components ---

function Sidebar({ activeView, setView, onLogout }: { activeView: View; setView: (v: View) => void; onLogout: () => void }) {
  return (
    <aside className="fixed left-0 top-0 h-screen w-72 bg-surface-container-lowest/80 backdrop-blur-xl border-r border-outline-variant/50 py-10 flex flex-col z-40 hidden md:flex">
      <div className="px-8 mb-10 mt-12">
        <div className="flex items-center gap-3 mb-2">
          <div className="w-3 h-3 rounded-full bg-primary shadow-[0_0_8px_rgba(0,76,237,0.5)]" />
          <span className="font-display font-bold text-primary tracking-tight">Terminal 01</span>
        </div>
        <p className="font-display text-[10px] uppercase tracking-widest text-outline">System Status: Optimal</p>
      </div>

      <nav className="flex-1 space-y-1">
        <button 
          onClick={() => setView('selection')}
          className={cn(
            "w-full flex items-center gap-4 py-4 px-8 transition-all active:translate-x-1",
            activeView === 'selection' ? "bg-primary-container/10 text-primary border-r-4 border-primary" : "text-outline hover:text-primary hover:bg-surface-variant/30"
          )}
        >
          <Building2 size={20} />
          <span className="font-display text-xs uppercase font-bold tracking-widest">Selection</span>
        </button>
        <button 
          onClick={() => setView('monitoring')}
          className={cn(
            "w-full flex items-center gap-4 py-4 px-8 transition-all active:translate-x-1",
            activeView === 'monitoring' ? "bg-primary-container/10 text-primary border-r-4 border-primary" : "text-outline hover:text-primary hover:bg-surface-variant/30"
          )}
        >
          <LayoutDashboard size={20} />
          <span className="font-display text-xs uppercase font-bold tracking-widest">Monitoring</span>
        </button>
        <button className="w-full flex items-center gap-4 py-4 px-8 text-outline hover:text-primary hover:bg-surface-variant/30 transition-all">
          <ShieldCheck size={20} />
          <span className="font-display text-xs uppercase font-bold tracking-widest">Security</span>
        </button>
        <button className="w-full flex items-center gap-4 py-4 px-8 text-outline hover:text-primary hover:bg-surface-variant/30 transition-all">
          <AlertTriangle size={20} />
          <span className="font-display text-xs uppercase font-bold tracking-widest">Emergency</span>
        </button>
      </nav>

      <div className="px-8 pb-4">
        <button className="w-full py-4 bg-primary text-white text-xs uppercase font-bold tracking-widest rounded-lg hover:brightness-110 active:scale-[0.98] transition-all">
          Request Access
        </button>
      </div>

      <div className="border-t border-outline-variant/30 pt-4 space-y-1">
        <button className="w-full flex items-center gap-4 py-2 px-8 text-outline hover:text-primary transition-all">
          <HelpCircle size={18} />
          <span className="font-display text-xs uppercase font-bold tracking-widest">Help</span>
        </button>
        <button onClick={onLogout} className="w-full flex items-center gap-4 py-2 px-8 text-outline hover:text-red-600 transition-all">
          <LogOut size={18} />
          <span className="font-display text-xs uppercase font-bold tracking-widest">Logout</span>
        </button>
      </div>
    </aside>
  );
}

function Header() {
  return (
    <header className="fixed top-0 w-full h-16 bg-surface/70 backdrop-blur-md border-b border-outline-variant/50 shadow-sm flex justify-between items-center px-8 z-50">
      <div className="flex items-center gap-4">
        <span className="font-display text-2xl font-bold tracking-tighter text-primary">ElevatorOS v2.4</span>
        <div className="hidden md:block w-px h-6 bg-outline-variant/50 mx-2" />
        <h1 className="hidden md:block font-display text-lg font-medium text-on-surface">Bảng Điều khiển Cá nhân</h1>
      </div>
      <div className="flex items-center gap-6">
        <div className="flex gap-2">
          <button className="p-2 text-outline hover:bg-primary-container/20 transition-colors rounded">
            <Bell size={20} />
          </button>
          <button className="p-2 text-outline hover:bg-primary-container/20 transition-colors rounded">
            <Settings size={20} />
          </button>
        </div>
        <div className="flex items-center gap-3 bg-surface-container-high/50 border border-outline-variant rounded-full pl-1 pr-4 py-1">
          <img 
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuB8Ys9xcZrJ2f5Ai-sgTjzP6JAENgljQgeAYCXUBFEWv5gkDMGX6SuUm1Df7trtDAV_cLCs8Htp0ct416oR5xTTihWIPzxdxGHyKn943zAlIR778wDH8jY6etSNALugu2Y46bux2Lv_d1Ev4XsMCIkWduadgszOFumAC1kVvor5i8pMWDHijT_jg40HieHaDzxvCQ6g08QMgYlIG9fAIfkPYrHuBnNf8KNu_m0u-F2NQ4GfZCTTdnfXSCNaRbKdRmf6jrGdLkipgxs" 
            alt="User" 
            className="w-8 h-8 rounded-full border border-outline-variant"
          />
          <div className="flex flex-col">
            <span className="text-[10px] font-bold uppercase tracking-widest leading-none">John Doe</span>
            <span className="text-[8px] text-primary font-bold uppercase tracking-tighter">Level 4 Clearance</span>
          </div>
        </div>
      </div>
    </header>
  );
}

// --- Views ---

function LoginView({ onLogin }: { onLogin: () => void }) {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-8 relative overflow-hidden">
      {/* Background Accents */}
      <div className="fixed top-12 left-12 opacity-30"><Plus size={24} className="text-outline" /></div>
      <div className="fixed top-12 right-12 opacity-30"><Plus size={24} className="text-outline" /></div>
      <div className="fixed bottom-12 left-12 opacity-30"><Plus size={24} className="text-outline" /></div>
      <div className="fixed bottom-12 right-12 opacity-30"><Plus size={24} className="text-outline" /></div>
      
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="glass-panel w-full max-w-[440px] p-10 flex flex-col gap-10 relative z-10"
      >
        <div className="flex flex-col gap-4">
          <div className="flex items-center gap-3">
            <Terminal className="text-primary" size={32} />
            <span className="font-display text-2xl font-bold tracking-tighter text-primary">ElevatorOS v2.4</span>
          </div>
          <div className="tech-line-h" />
          <h1 className="font-display text-3xl font-bold text-on-surface">Đăng nhập Hệ thống Thang máy</h1>
          <p className="text-outline text-sm">Terminal 01 • North Wing Hub Authentication</p>
        </div>

        <form className="flex flex-col gap-8" onSubmit={(e) => { e.preventDefault(); onLogin(); }}>
          <div className="space-y-6">
            <div className="space-y-2">
              <label className="text-[10px] uppercase font-bold tracking-[0.2em] text-outline">Employee ID</label>
              <div className="relative flex items-center group">
                <IdCard className="absolute left-4 text-outline group-focus-within:text-primary transition-colors" size={20} />
                <input 
                  type="text" 
                  placeholder="ENTER UID" 
                  className="w-full pl-12 pr-4 py-4 bg-surface-container-lowest border border-outline-variant focus:border-primary focus:ring-0 outline-none transition-all font-display text-sm uppercase tracking-widest placeholder:text-outline/50"
                />
              </div>
            </div>
            <div className="space-y-2">
              <label className="text-[10px] uppercase font-bold tracking-[0.2em] text-outline">Secure Key</label>
              <div className="relative flex items-center group">
                <Key className="absolute left-4 text-outline group-focus-within:text-primary transition-colors" size={20} />
                <input 
                  type="password" 
                  placeholder="••••••••" 
                  className="w-full pl-12 pr-4 py-4 bg-surface-container-lowest border border-outline-variant focus:border-primary focus:ring-0 outline-none transition-all font-display text-sm tracking-widest placeholder:text-outline/50"
                />
              </div>
            </div>
          </div>

          <button type="submit" className="bg-primary text-white py-4 font-display text-sm font-bold uppercase tracking-widest flex items-center justify-center gap-3 hover:bg-primary-container active:scale-[0.98] transition-all">
            Access System
            <CheckCircle2 size={18} />
          </button>
        </form>

        <div className="flex items-center gap-4">
          <div className="tech-line-h" />
          <span className="text-[10px] font-bold text-outline uppercase tracking-widest whitespace-nowrap">Alt Auth</span>
          <div className="tech-line-h" />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <button className="flex items-center justify-center gap-2 py-4 border border-outline-variant text-[10px] font-bold uppercase tracking-widest hover:border-primary hover:text-primary transition-colors">
            <Fingerprint size={16} /> Fingerprint
          </button>
          <button className="flex items-center justify-center gap-2 py-4 border border-outline-variant text-[10px] font-bold uppercase tracking-widest hover:border-primary hover:text-primary transition-colors">
            <ScanFace size={16} /> Face ID
          </button>
        </div>
      </motion.div>

      <footer className="fixed bottom-8 w-full px-12 flex justify-between items-end opacity-60">
        <div className="flex flex-col">
          <span className="text-[10px] font-bold uppercase tracking-widest text-outline">System ID</span>
          <span className="font-display text-xs text-on-surface">E-NODE-7729-ALPHA</span>
        </div>
        <div className="flex flex-col items-end">
          <div className="flex items-center gap-2 mb-1">
            <div className="w-1.5 h-1.5 rounded-full bg-primary" />
            <span className="text-[10px] font-bold text-primary uppercase tracking-widest">Secure Connection Active</span>
          </div>
          <span className="text-[10px] font-bold uppercase tracking-widest text-outline">Firmware v2.4.102-REV_04</span>
        </div>
      </footer>
    </div>
  );
}

function SelectionView() {
  const [selectedFloor, setSelectedFloor] = useState<number | null>(12);
  const floors = [
    { num: 5, label: 'Lobby & Services', type: 'Public Access', status: 'Current' },
    { num: 12, label: 'Marketing', type: 'Your Floor', status: 'Main Node' },
    { num: 18, label: 'Research Dept', type: 'Restricted', status: 'Authorized' },
    { num: 24, label: 'Executive Suites', type: 'Admin Only', status: 'Secured' },
  ];

  return (
    <div className="flex-1 max-w-7xl mx-auto pt-20 pb-32">
      <motion.section 
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        className="mb-12 flex flex-col md:flex-row md:items-end justify-between gap-8"
      >
        <div>
          <p className="text-[10px] uppercase font-bold tracking-[0.2em] text-primary mb-2">Status: Authenticated</p>
          <h2 className="font-display text-5xl font-bold mb-4 tracking-tighter">Chào mừng, John Doe</h2>
          <p className="text-outline text-lg max-w-lg">
            Hệ thống đã xác định các tầng được phép truy cập của bạn.<br/>
            <span className="font-bold text-on-surface">Vị trí hiện tại: Tầng 05</span>
          </p>
        </div>

        <div className="glass-panel p-6 rounded-xl border-l-[6px] border-l-primary flex items-center gap-6">
          <div className="bg-primary/10 p-3 rounded-lg text-primary">
            <Bell size={24} />
          </div>
          <div>
            <p className="text-[10px] uppercase font-bold tracking-widest text-outline mb-1">Arrival Notification</p>
            <p className="font-display text-xl font-bold">Elevator 4 is arriving</p>
          </div>
        </div>
      </motion.section>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 relative">
        <div className="absolute -top-3 -left-3 opacity-30"><Plus size={14} className="text-outline" /></div>
        <div className="absolute -top-3 -right-3 opacity-30"><Plus size={14} className="text-outline" /></div>

        {floors.map((floor) => (
          <motion.div 
            key={floor.num}
            whileHover={{ y: -5 }}
            onClick={() => setSelectedFloor(floor.num)}
            className={cn(
              "glass-panel p-10 rounded-xl flex flex-col items-center justify-center text-center cursor-pointer transition-all border-2 relative overflow-hidden",
              selectedFloor === floor.num ? "border-primary bg-primary-container/5 shadow-lg" : "border-transparent hover:border-primary/30"
            )}
          >
            {selectedFloor === floor.num && (
              <div className="absolute top-4 right-4 text-primary">
                <CheckCircle2 size={24} />
              </div>
            )}
            <span className={cn("text-[10px] uppercase font-bold tracking-[0.2em] mb-2", selectedFloor === floor.num ? "text-primary" : "text-outline")}>
              {selectedFloor === floor.num ? 'Active Selection' : 'Level'}
            </span>
            <span className={cn("font-display text-[84px] font-bold leading-none mb-4 tracking-tighter", selectedFloor === floor.num ? "text-primary" : "text-on-surface")}>
              {floor.num < 10 ? `0${floor.num}` : floor.num}
            </span>
            <div className={cn("w-10 h-px mb-6", selectedFloor === floor.num ? "bg-primary/30" : "bg-outline-variant")} />
            <span className={cn("font-display text-xl font-bold mb-4", selectedFloor === floor.num ? "text-primary" : "text-on-surface")}>
              {floor.label}
            </span>
            <div className={cn(
              "px-3 py-1 rounded text-[10px] font-bold uppercase tracking-widest",
              selectedFloor === floor.num ? "bg-primary text-white" : "bg-surface-container text-outline"
            )}>
              {floor.type}
            </div>
          </motion.div>
        ))}
      </div>

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="mt-12 flex flex-col items-center gap-6"
      >
        <div className="text-center">
          <p className="text-[10px] uppercase font-bold tracking-[0.2em] text-outline mb-2">Command Confirmed</p>
          <p className="text-outline text-base italic">Proceeding to Marketing Division</p>
        </div>
        <button className="group relative px-20 py-8 bg-primary text-white rounded-full overflow-hidden shadow-[0_0_30px_rgba(0,62,199,0.3)] hover:scale-105 active:scale-[0.98] transition-all flex items-center justify-center gap-6">
          <span className="font-display text-4xl font-bold tracking-[0.2em]">NEXT</span>
          <MoveUp size={32} className="group-hover:translate-x-2 transition-transform" />
          <div className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity" />
        </button>
      </motion.div>

      <footer className="fixed bottom-0 left-0 lg:left-72 right-0 glass-panel border-t border-outline-variant/30 py-6 px-12 z-50">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center gap-12">
          <div className="flex items-center gap-8 shrink-0">
            <div className="text-right">
              <p className="text-[10px] uppercase font-bold tracking-widest text-outline mb-1">Current</p>
              <p className="font-display text-xl font-bold">LOBBY</p>
            </div>
            <ChevronRight className="text-primary" />
            <div>
              <p className="text-[10px] uppercase font-bold tracking-widest text-outline mb-1">Destination</p>
              <p className="font-display text-xl font-bold">LEVEL 12</p>
            </div>
          </div>

          <div className="flex-1 w-full flex flex-col gap-2">
            <div className="flex justify-between text-[10px] font-bold uppercase tracking-widest text-outline">
              <span>In Transit: 42%</span>
              <span>Est: 14s</span>
            </div>
            <div className="h-2 w-full bg-surface-container rounded-full overflow-hidden relative">
              <motion.div 
                initial={{ width: 0 }}
                animate={{ width: '42%' }}
                className="absolute top-0 left-0 h-full bg-primary shadow-[0_0_8px_rgba(0,76,237,0.5)]" 
              />
            </div>
          </div>

          <div className="hidden md:flex items-center gap-4 shrink-0">
            <div className="flex flex-col items-end">
              <p className="text-[10px] uppercase font-bold tracking-widest text-outline mb-1">System</p>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-primary animate-pulse" />
                <p className="font-display text-xs font-bold">Elevator 04 - Active</p>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

function MonitoringView() {
  return (
    <div className="flex-1 max-w-7xl mx-auto pt-20 pb-16">
      <div className="mb-10 flex justify-between items-end">
        <div>
          <h2 className="font-display text-4xl font-bold mb-2 tracking-tighter">Real-time Live Monitoring</h2>
          <p className="text-outline">Active monitoring session for North Wing Vertical Transports</p>
        </div>
        <div className="flex gap-8">
          <div className="text-right">
            <div className="text-[10px] uppercase font-bold tracking-widest text-outline mb-1">Uptime</div>
            <div className="font-display text-primary font-bold">124d 04h 12m</div>
          </div>
          <div className="w-px h-8 bg-outline-variant/30" />
          <div className="text-right">
            <div className="text-[10px] uppercase font-bold tracking-widest text-outline mb-1">Load Factor</div>
            <div className="font-display text-primary font-bold">68.4%</div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
        {ELEVATORS.map((el, i) => (
          <motion.div 
            key={el.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.05 }}
            className={cn(
              "glass-panel p-6 relative overflow-hidden group border-2 transition-all",
              el.status === 'alert' ? "border-red-500/30 bg-red-500/5" : "border-outline-variant/20 hover:border-primary/40"
            )}
          >
            <div className="flex justify-between items-start mb-6">
              <div>
                <span className="text-[10px] uppercase font-bold tracking-widest text-outline">Unit ID</span>
                <div className="font-display text-lg font-bold text-primary">{el.id}</div>
              </div>
              <div className={cn(
                "px-3 py-1 rounded text-[8px] font-bold uppercase tracking-widest",
                el.status === 'alert' ? "bg-red-500 text-white animate-pulse" : "bg-surface-container text-outline"
              )}>
                {el.status === 'ascending' && <span className="flex items-center gap-1"><ArrowUp size={8} /> ASCENDING</span>}
                {el.status === 'descending' && <span className="flex items-center gap-1"><ArrowDown size={8} /> DESCENDING</span>}
                {el.status === 'stationary' && 'STATIONARY'}
                {el.status === 'alert' && 'ALERT'}
              </div>
            </div>

            <div className="flex items-baseline gap-2 mb-4">
              <span className={cn("text-5xl font-display font-bold tracking-tighter", el.status === 'alert' ? "text-red-500" : "text-on-surface")}>
                {el.floor}
              </span>
              <span className={cn("text-[10px] font-bold uppercase tracking-widest", el.status === 'alert' ? "text-red-500" : "text-outline")}>Floor</span>
            </div>

            {el.msg && (
              <div className="mb-4 text-[10px] font-bold text-red-500 bg-red-500/10 p-2 flex items-center gap-2">
                <AlertTriangle size={12} /> {el.msg}
              </div>
            )}

            <div className="grid grid-cols-2 border-t border-outline-variant/30 pt-3">
              <div>
                <div className="text-[8px] uppercase font-bold tracking-widest text-outline mb-1">Speed</div>
                <div className="font-display text-xs font-bold leading-none">{el.speed}</div>
              </div>
              <div>
                 {el.status === 'alert' ? (
                   <button className="bg-red-500 text-white text-[8px] font-bold py-2 px-3 rounded w-full active:scale-95 transition-all">RESET</button>
                 ) : (
                  <>
                    <div className="text-[8px] uppercase font-bold tracking-widest text-outline mb-1">Load</div>
                    <div className="font-display text-xs font-bold leading-none">{el.load}</div>
                  </>
                 )}
              </div>
            </div>
            
            <div className="absolute bottom-0 left-0 w-full h-1 bg-outline-variant/10">
              <motion.div 
                initial={{ width: 0 }}
                animate={{ width: el.status === 'stationary' ? '10%' : '60%' }}
                className={cn("h-full", el.status === 'alert' ? "bg-red-500" : "bg-primary")} 
              />
            </div>
          </motion.div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 glass-panel p-8 rounded-xl h-[400px] flex flex-col">
          <div className="flex justify-between items-center mb-8">
            <h3 className="font-display text-xl font-bold flex items-center gap-3">
              <Activity className="text-primary" />
              Building Vertical Cross-section
            </h3>
            <div className="flex gap-4">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-sm bg-primary" />
                <span className="text-[10px] font-bold uppercase tracking-widest text-outline">Active</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-sm bg-red-500" />
                <span className="text-[10px] font-bold uppercase tracking-widest text-outline">Error</span>
              </div>
            </div>
          </div>

          <div className="flex-grow border border-outline-variant/20 bg-surface-container-low/30 rounded-lg p-6 relative flex gap-4 overflow-hidden">
             {['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H'].map((id, i) => (
               <div key={id} className="flex-1 border-x border-dashed border-outline-variant/20 relative">
                 <motion.div 
                    initial={{ bottom: `${10 * i}%` }}
                    animate={{ bottom: `${(15 * i + 10) % 80}%` }}
                    transition={{ duration: 5 + i, repeat: Infinity, repeatType: 'reverse' }}
                    className={cn(
                      "absolute left-1 right-1 h-3 flex items-center justify-center font-display text-[6px] font-bold text-white shadow-lg rounded-sm",
                      id === 'D' ? "bg-red-500" : "bg-primary"
                    )}
                 >
                   {id}
                 </motion.div>
               </div>
             ))}
             {/* Floor Lines */}
             <div className="absolute inset-0 flex flex-col justify-between py-6 px-1 pointer-events-none opacity-5">
               {Array.from({length: 10}).map((_, i) => (
                 <div key={i} className="w-full h-px bg-on-surface" />
               ))}
             </div>
          </div>
        </div>

        <div className="glass-panel p-8 rounded-xl flex flex-col">
          <h3 className="font-display text-xl font-bold mb-8">Peak Traffic Flow</h3>
          <div className="flex-grow">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={TRAFFIC_DATA}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="rgba(0,0,0,0.05)" />
                <XAxis dataKey="time" fontSize={8} tick={{ fill: '#737688' }} />
                <YAxis hide />
                <Tooltip 
                  cursor={{ fill: 'rgba(0,0,0,0.05)' }}
                  contentStyle={{ backgroundColor: '#fff', border: '1px solid #c3c5d9', fontSize: '10px' }}
                />
                <Bar 
                  dataKey="load" 
                  fill="#003ec7" 
                  radius={[2, 2, 0, 0]}
                  activeBar={{ fill: '#0052ff' }}
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
          <div className="mt-8 p-4 bg-primary/5 rounded-lg border border-primary/20">
            <p className="text-[10px] font-bold text-primary uppercase tracking-widest mb-1">Peak Detected</p>
            <p className="text-outline text-xs leading-relaxed">Zone 4 (Sky Lobby) currently at 94% capacity. Optimized routes applied.</p>
          </div>
        </div>
      </div>
    </div>
  );
}

// --- Main App ---

export default function App() {
  const [activeView, setView] = useState<View>('login');
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    if (activeView !== 'login') {
      setIsAuthenticated(true);
    }
  }, [activeView]);

  const handleLogin = () => {
    setView('selection');
    setIsAuthenticated(true);
  };

  const handleLogout = () => {
    setView('login');
    setIsAuthenticated(false);
  };

  return (
    <div className={cn("min-h-screen transition-colors duration-500 font-sans", activeView === 'login' ? "dark" : "")}>
      <AnimatePresence mode="wait">
        {activeView === 'login' ? (
          <motion.div 
            key="login"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <LoginView onLogin={handleLogin} />
          </motion.div>
        ) : (
          <motion.div 
            key="dashboard"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="pt-16 md:pl-72"
          >
            <Sidebar activeView={activeView} setView={setView} onLogout={handleLogout} />
            <Header />
            <main className="p-8">
              <AnimatePresence mode="wait">
                {activeView === 'selection' && (
                  <motion.div 
                    key="selection"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                  >
                    <SelectionView />
                  </motion.div>
                )}
                {activeView === 'monitoring' && (
                  <motion.div 
                    key="monitoring"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                  >
                    <MonitoringView />
                  </motion.div>
                )}
              </AnimatePresence>
            </main>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
