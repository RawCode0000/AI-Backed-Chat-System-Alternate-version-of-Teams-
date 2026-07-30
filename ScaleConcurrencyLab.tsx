import React, { useState, useEffect } from 'react';
import {
  Users,
  Activity,
  Server,
  Zap,
  Globe,
  Database,
  Lock,
  LogIn,
  LogOut,
  ShieldCheck,
  Cpu,
  Radio,
  Layers,
  BarChart2,
  RefreshCw,
  CheckCircle2,
  AlertTriangle,
  Play,
  Pause
} from 'lucide-react';
import { auth, googleProvider, signInWithPopup, signOut, onAuthStateChanged, signInWithEmailAndPassword, createUserWithEmailAndPassword, FirebaseUser } from '../../lib/firebase';

export const ScaleConcurrencyLab: React.FC = () => {
  // Concurrency stats
  const [activeUserCount, setActiveUserCount] = useState(1248);
  const [messageThroughput, setMessageThroughput] = useState(142);
  const [dbPoolCount, setDbPoolCount] = useState(850);
  const [cacheHitRate, setCacheHitRate] = useState(98.6);
  const [latencyMs, setLatencyMs] = useState(14);
  const [isTrafficSimulating, setIsTrafficSimulating] = useState(true);

  // Firebase Auth State
  const [firebaseUser, setFirebaseUser] = useState<FirebaseUser | null>(null);
  const [authEmail, setAuthEmail] = useState('');
  const [authPassword, setAuthPassword] = useState('');
  const [authError, setAuthError] = useState<string | null>(null);
  const [authSuccessMsg, setAuthSuccessMsg] = useState<string | null>(null);
  const [isAuthLoading, setIsAuthLoading] = useState(false);

  // Monitor Auth State
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setFirebaseUser(user);
    });
    return () => unsubscribe();
  }, []);

  // Real-time Traffic Fluctuation Simulator for 1000+ Users
  useEffect(() => {
    if (!isTrafficSimulating) return;

    const interval = setInterval(() => {
      setActiveUserCount((prev) => Math.floor(1200 + Math.random() * 120));
      setMessageThroughput((prev) => Math.floor(130 + Math.random() * 40));
      setLatencyMs((prev) => Math.floor(10 + Math.random() * 8));
    }, 2000);

    return () => clearInterval(interval);
  }, [isTrafficSimulating]);

  // Google Sign In
  const handleGoogleSignIn = async () => {
    setIsAuthLoading(true);
    setAuthError(null);
    try {
      await signInWithPopup(auth, googleProvider);
      setAuthSuccessMsg('Successfully authenticated with Google Auth via Firebase!');
    } catch (err: any) {
      console.error('Google Sign-In Error:', err);
      setAuthError(err.message || 'Google Sign-In failed');
    } finally {
      setIsAuthLoading(false);
    }
  };

  // Email Sign In / Sign Up
  const handleEmailAuth = async (isSignUp: boolean) => {
    if (!authEmail || !authPassword) {
      setAuthError('Please enter email and password.');
      return;
    }
    setIsAuthLoading(true);
    setAuthError(null);
    try {
      if (isSignUp) {
        await createUserWithEmailAndPassword(auth, authEmail, authPassword);
        setAuthSuccessMsg('Account created and signed in with Firebase Auth!');
      } else {
        await signInWithEmailAndPassword(auth, authEmail, authPassword);
        setAuthSuccessMsg('Signed in successfully!');
      }
    } catch (err: any) {
      console.error('Email Auth Error:', err);
      setAuthError(err.message || 'Authentication failed');
    } finally {
      setIsAuthLoading(false);
    }
  };

  // Sign Out
  const handleSignOut = async () => {
    await signOut(auth);
    setAuthSuccessMsg('Signed out safely.');
  };

  return (
    <div className="flex-1 flex flex-col h-[calc(100vh-3rem)] bg-[#0B0E14] text-slate-100 overflow-y-auto p-4 space-y-4">
      {/* Top Banner */}
      <div className="bg-gradient-to-r from-indigo-950/60 via-[#111622] to-purple-950/60 rounded-xl border border-indigo-500/30 p-4 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center space-x-2">
            <span className="flex h-2.5 w-2.5 relative">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500"></span>
            </span>
            <h1 className="text-base font-bold text-slate-100">
              1,000+ Concurrent Users Scale Center & Firebase Infrastructure
            </h1>
          </div>
          <p className="text-xs text-slate-400 mt-1">
            Real-time connection load balancer, Firestore persistent database sharding, and Google Firebase Authentication
          </p>
        </div>

        <button
          onClick={() => setIsTrafficSimulating(!isTrafficSimulating)}
          className={`px-3 py-1.5 rounded-lg text-xs font-bold font-mono flex items-center space-x-2 border transition-all ${
            isTrafficSimulating
              ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40 hover:bg-emerald-500/30'
              : 'bg-amber-500/20 text-amber-300 border-amber-500/40 hover:bg-amber-500/30'
          }`}
        >
          {isTrafficSimulating ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
          <span>{isTrafficSimulating ? 'Simulating 1,000+ Active Stream' : 'Traffic Simulator Paused'}</span>
        </button>
      </div>

      {/* Metrics Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
        <div className="bg-[#111622] rounded-xl border border-[#1E2638] p-3.5 space-y-1">
          <div className="flex items-center justify-between text-xs text-slate-400">
            <span>Active Concurrent Sockets</span>
            <Users className="w-4 h-4 text-indigo-400" />
          </div>
          <p className="text-2xl font-black font-mono text-indigo-300">{activeUserCount.toLocaleString()}</p>
          <p className="text-[10px] text-emerald-400 font-mono">100% Load Balanced Across 3 Regions</p>
        </div>

        <div className="bg-[#111622] rounded-xl border border-[#1E2638] p-3.5 space-y-1">
          <div className="flex items-center justify-between text-xs text-slate-400">
            <span>Message Stream Rate</span>
            <Zap className="w-4 h-4 text-purple-400" />
          </div>
          <p className="text-2xl font-black font-mono text-purple-300">{messageThroughput} msg/sec</p>
          <p className="text-[10px] text-slate-400 font-mono">Firestore Auto-Sharded (16 Partitions)</p>
        </div>

        <div className="bg-[#111622] rounded-xl border border-[#1E2638] p-3.5 space-y-1">
          <div className="flex items-center justify-between text-xs text-slate-400">
            <span>DB Pool / Connections</span>
            <Database className="w-4 h-4 text-emerald-400" />
          </div>
          <p className="text-2xl font-black font-mono text-emerald-300">{dbPoolCount} / 1000</p>
          <p className="text-[10px] text-emerald-400 font-mono">Persistence: Firebase Firestore</p>
        </div>

        <div className="bg-[#111622] rounded-xl border border-[#1E2638] p-3.5 space-y-1">
          <div className="flex items-center justify-between text-xs text-slate-400">
            <span>Roundtrip Latency</span>
            <Activity className="w-4 h-4 text-sky-400" />
          </div>
          <p className="text-2xl font-black font-mono text-sky-300">{latencyMs} ms</p>
          <p className="text-[10px] text-sky-400 font-mono">Cache Hit Rate: {cacheHitRate}%</p>
        </div>
      </div>

      {/* Main Two Column Area: Firebase Auth & Cluster Topology */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {/* Firebase Authentication Panel */}
        <div className="bg-[#111622] rounded-xl border border-[#1E2638] p-4 space-y-4">
          <div className="flex items-center justify-between border-b border-[#1E2638] pb-3">
            <h2 className="text-sm font-bold text-slate-200 flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-indigo-400" />
              Firebase Authentication & Security Center
            </h2>
            <span className="text-[10px] font-mono text-indigo-400 bg-indigo-500/10 px-2 py-0.5 rounded border border-indigo-500/20">
               celestial-footing-dmbw7
            </span>
          </div>

          {firebaseUser ? (
            <div className="bg-emerald-950/20 border border-emerald-500/30 rounded-lg p-3 space-y-2">
              <div className="flex items-center space-x-3">
                <img
                  src={firebaseUser.photoURL || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80'}
                  alt={firebaseUser.displayName || 'User'}
                  className="w-10 h-10 rounded-full border border-emerald-500/40 object-cover"
                />
                <div>
                  <p className="text-xs font-bold text-slate-100">{firebaseUser.displayName || 'Authenticated Firebase User'}</p>
                  <p className="text-[10px] font-mono text-emerald-400">{firebaseUser.email}</p>
                  <p className="text-[9px] font-mono text-slate-400">UID: {firebaseUser.uid.slice(0, 16)}...</p>
                </div>
              </div>

              <button
                onClick={handleSignOut}
                className="w-full py-1.5 bg-rose-600/20 hover:bg-rose-600/30 text-rose-300 border border-rose-500/30 rounded text-xs font-semibold flex items-center justify-center space-x-1.5 transition-all"
              >
                <LogOut className="w-3.5 h-3.5" />
                <span>Sign Out Firebase Session</span>
              </button>
            </div>
          ) : (
            <div className="space-y-3">
              <p className="text-xs text-slate-400">
                Authenticate with Firebase Auth to secure high-concurrency messages, tasks, and team analytics in Firestore.
              </p>

              {/* Google Sign-In Button */}
              <button
                onClick={handleGoogleSignIn}
                disabled={isAuthLoading}
                className="w-full py-2 bg-white hover:bg-slate-100 text-slate-900 rounded-lg text-xs font-bold flex items-center justify-center space-x-2 transition-all shadow-xs"
              >
                <svg className="w-4 h-4" viewBox="0 0 24 24">
                  <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                  <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                  <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"/>
                  <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"/>
                </svg>
                <span>Sign In with Google Auth</span>
              </button>

              <div className="relative flex py-1 items-center">
                <div className="flex-grow border-t border-[#1E2638]"></div>
                <span className="flex-shrink mx-2 text-[10px] text-slate-500 font-mono">OR EMAIL AUTH</span>
                <div className="flex-grow border-t border-[#1E2638]"></div>
              </div>

              {/* Email Form */}
              <div className="space-y-2">
                <input
                  type="email"
                  placeholder="Email address"
                  value={authEmail}
                  onChange={(e) => setAuthEmail(e.target.value)}
                  className="w-full bg-[#151C2C] border border-[#1E2638] rounded p-2 text-xs text-slate-200 focus:outline-none"
                />
                <input
                  type="password"
                  placeholder="Password"
                  value={authPassword}
                  onChange={(e) => setAuthPassword(e.target.value)}
                  className="w-full bg-[#151C2C] border border-[#1E2638] rounded p-2 text-xs text-slate-200 focus:outline-none"
                />

                <div className="grid grid-cols-2 gap-2">
                  <button
                    onClick={() => handleEmailAuth(false)}
                    disabled={isAuthLoading}
                    className="py-1.5 bg-indigo-600 hover:bg-indigo-500 text-white rounded text-xs font-semibold"
                  >
                    Sign In
                  </button>
                  <button
                    onClick={() => handleEmailAuth(true)}
                    disabled={isAuthLoading}
                    className="py-1.5 bg-[#151C2C] hover:bg-[#1f2a40] text-slate-300 border border-[#1E2638] rounded text-xs font-semibold"
                  >
                    Create Account
                  </button>
                </div>
              </div>
            </div>
          )}

          {authError && (
            <p className="text-xs text-rose-400 bg-rose-500/10 p-2 rounded border border-rose-500/20">{authError}</p>
          )}

          {authSuccessMsg && (
            <p className="text-xs text-emerald-400 bg-emerald-500/10 p-2 rounded border border-emerald-500/20">{authSuccessMsg}</p>
          )}
        </div>

        {/* Distributed Region Status */}
        <div className="bg-[#111622] rounded-xl border border-[#1E2638] p-4 space-y-3">
          <div className="flex items-center justify-between border-b border-[#1E2638] pb-2">
            <h2 className="text-sm font-bold text-slate-200 flex items-center gap-2">
              <Globe className="w-4 h-4 text-indigo-400" />
              Global Region Cluster Replicas
            </h2>
            <span className="text-[10px] font-mono text-emerald-400">3/3 Regions Active</span>
          </div>

          <div className="space-y-2">
            <div className="bg-[#151C2C] p-2.5 rounded-lg border border-[#1E2638] flex items-center justify-between">
              <div>
                <p className="text-xs font-bold text-slate-200">us-central1 (Iowa)</p>
                <p className="text-[10px] text-slate-400 font-mono">Primary Write Leader • 420 Sockets</p>
              </div>
              <span className="text-[10px] font-mono text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20">
                8 ms
              </span>
            </div>

            <div className="bg-[#151C2C] p-2.5 rounded-lg border border-[#1E2638] flex items-center justify-between">
              <div>
                <p className="text-xs font-bold text-slate-200">europe-west1 (Belgium)</p>
                <p className="text-[10px] text-slate-400 font-mono">Secondary Replica • 412 Sockets</p>
              </div>
              <span className="text-[10px] font-mono text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20">
                12 ms
              </span>
            </div>

            <div className="bg-[#151C2C] p-2.5 rounded-lg border border-[#1E2638] flex items-center justify-between">
              <div>
                <p className="text-xs font-bold text-slate-200">asia-east1 (Taiwan)</p>
                <p className="text-[10px] text-slate-400 font-mono">Secondary Replica • 416 Sockets</p>
              </div>
              <span className="text-[10px] font-mono text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20">
                18 ms
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
