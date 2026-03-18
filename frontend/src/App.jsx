import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Plus, Search, Trash2, Edit3, Save, X,
  Calendar, ArrowUpDown, ChevronLeft, ChevronRight,
  LayoutDashboard, Settings, User, LogOut, Loader2, Scroll,
  Moon, Sun, Clock, FileText, Filter, GraduationCap, Briefcase, Award, Download
} from 'lucide-react';
import axios from 'axios';

// API base URL
const BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';
const API_URL = `${BASE_URL}/notes`;
const RESUME_URL = `${BASE_URL}/resume`;

// --- Sidebar ---
const Sidebar = ({ onAddClick, currentView, setView }) => (
  <aside className="fixed left-0 top-0 h-screen w-72 bg-black border-r border-border-color p-6 flex flex-col gap-10 hidden lg:flex z-50">
    <div className="flex items-center gap-3">
      <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center shadow-[0_0_20px_rgba(255,255,255,0.1)]">
        <Scroll className="text-black w-6 h-6" />
      </div>
      <h1 className="text-xl font-bold tracking-tight text-white">Student Pro</h1>
    </div>

    <nav className="flex-1 flex flex-col gap-2">
      <div className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest px-2 mb-2">Workspace</div>
      <SidebarItem
        icon={<LayoutDashboard size={20} />}
        label="My Notes"
        active={currentView === 'notes'}
        onClick={() => setView('notes')}
      />
      <SidebarItem
        icon={<FileText size={20} />}
        label="Resume Builder"
        active={currentView === 'resume'}
        onClick={() => setView('resume')}
      />
      <SidebarItem
        icon={<Settings size={20} />}
        label="Settings"
        active={currentView === 'settings'}
        onClick={() => setView('settings')}
      />

      <div className="mt-8 text-[10px] font-bold text-zinc-500 uppercase tracking-widest px-2 mb-2">Actions</div>
      <button
        onClick={onAddClick}
        className="flex items-center gap-3 px-4 py-3.5 w-full bg-white text-black rounded-xl font-bold transition-all hover:scale-[1.02] active:scale-95 shadow-xl shadow-white/5"
      >
        <Plus size={20} strokeWidth={3} />
        Create Note
      </button>
    </nav>

    <div className="pt-6 border-t border-border-color flex items-center gap-4">
      <div className="w-10 h-10 rounded-full bg-zinc-800 flex items-center justify-center text-xs font-bold border border-zinc-700">ST</div>
      <div className="flex-1 overflow-hidden">
        <p className="text-sm font-semibold truncate">Student User</p>
        <p className="text-[11px] text-zinc-500 font-mono">Premium Account</p>
      </div>
      <button className="text-zinc-500 hover:text-red-500 transition-colors">
        <LogOut size={18} />
      </button>
    </div>
  </aside>
);

const SidebarItem = ({ icon, label, active = false, onClick }) => (
  <button
    onClick={onClick}
    className={`flex items-center gap-3.5 px-4 py-3 rounded-xl transition-all duration-200 group w-full text-left ${active ? 'bg-border-color text-white' : 'text-zinc-500 hover:text-white hover:bg-accent-secondary'}`}
  >
    <span className={`${active ? 'text-white' : 'group-hover:text-white '}`}>{icon}</span>
    <span className="text-sm font-semibold">{label}</span>
  </button>
);

// --- Resume Component ---
const ResumeView = () => {
  const [formData, setFormData] = useState({
    name: 'Student User',
    email: 'student@example.com',
    phone: '+998 90 123 45 67',
    education: 'Tashkent University of Information Technologies',
    experience: 'Junior Web Developer at TechCorp',
    skills: 'React, Node.js, PostgreSQL, Tailwind CSS'
  });
  const [loading, setLoading] = useState(true);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    const fetchResume = async () => {
      try {
        const res = await axios.get(RESUME_URL);
        if (res.data) setFormData(res.data);
      } catch (err) {
        console.error('Resume fetch error:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchResume();
  }, []);

  const handleSave = async () => {
    try {
      setLoading(true);
      await axios.post(RESUME_URL, formData);
      setSaved(true);
      setTimeout(() => setSaved(false), 3000);
    } catch (err) {
      alert('Failed to save resume');
    } finally {
      setLoading(false);
    }
  };

  if (loading && !formData.name) return <div className="h-96 flex items-center justify-center"><Loader2 className="animate-spin text-zinc-500" size={40} /></div>;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="flex flex-col gap-8"
    >
      <header className="flex justify-between items-center">
        <div>
          <h2 className="text-3xl font-bold tracking-tight text-white">Resume Builder</h2>
          <p className="text-zinc-500 mt-1 font-medium">Create and preview your professional resume.</p>
        </div>
        <button
          onClick={handleSave}
          disabled={loading}
          className={`flex items-center gap-2 px-6 py-3 rounded-xl font-bold transition-all ${saved ? 'bg-green-500 text-white' : 'bg-white text-black hover:scale-105 active:scale-95'}`}
        >
          {loading ? <Loader2 className="animate-spin" size={18} /> : saved ? <Save size={18} /> : <Save size={18} />}
          {saved ? 'Changes Saved' : 'Save Resume'}
        </button>
      </header>

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-10">
        <div className="bg-bg-secondary border border-border-color rounded-3xl p-8 flex flex-col gap-6">
          <h3 className="text-lg font-bold text-white flex items-center gap-2">
            <Edit3 size={18} /> Edit Details
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <InputGroup label="Full Name" value={formData.name} onChange={(v) => setFormData({ ...formData, name: v })} />
            <InputGroup label="Email" value={formData.email} onChange={(v) => setFormData({ ...formData, email: v })} />
            <InputGroup label="Phone" value={formData.phone} onChange={(v) => setFormData({ ...formData, phone: v })} />
            <InputGroup label="Education" value={formData.education} onChange={(v) => setFormData({ ...formData, education: v })} />
          </div>
          <div className="flex flex-col gap-2">
            <label className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest">Experience</label>
            <textarea
              value={formData.experience}
              onChange={(e) => setFormData({ ...formData, experience: e.target.value })}
              className="bg-black border border-border-color rounded-xl p-4 text-sm focus:outline-none focus:border-white h-32 resize-none"
            />
          </div>
          <div className="flex flex-col gap-2">
            <label className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest">Skills (comma separated)</label>
            <textarea
              value={formData.skills}
              onChange={(e) => setFormData({ ...formData, skills: e.target.value })}
              className="bg-black border border-border-color rounded-xl p-4 text-sm focus:outline-none focus:border-white h-24 resize-none"
            />
          </div>
        </div>

        <div className="bg-white text-black rounded-3xl p-10 min-h-[600px] shadow-2xl flex flex-col gap-8 relative overflow-hidden">
          <div className="absolute top-10 right-10 text-zinc-300">
            <Scroll size={80} strokeWidth={1} opacity={0.1} />
          </div>

          <div className="border-b-4 border-black pb-8">
            <h1 className="text-4xl font-black uppercase tracking-tighter">{formData.name}</h1>
            <div className="flex flex-wrap gap-4 mt-4 text-sm font-bold text-zinc-600">
              <span className="flex items-center gap-1"><User size={14} /> {formData.email}</span>
              <span className="flex items-center gap-1"><Calendar size={14} /> {formData.phone}</span>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            <div className="md:col-span-2 flex flex-col gap-8">
              <section>
                <h3 className="text-xs font-black uppercase tracking-[0.2em] text-zinc-400 mb-4 flex items-center gap-2">
                  <Briefcase size={14} /> Experience
                </h3>
                <p className="text-lg font-bold leading-relaxed">{formData.experience}</p>
              </section>

              <section>
                <h3 className="text-xs font-black uppercase tracking-[0.2em] text-zinc-400 mb-4 flex items-center gap-2">
                  <GraduationCap size={14} /> Education
                </h3>
                <p className="text-lg font-bold leading-relaxed">{formData.education}</p>
              </section>
            </div>

            <div className="flex flex-col gap-8 border-l border-zinc-100 pl-8">
              <section>
                <h3 className="text-xs font-black uppercase tracking-[0.2em] text-zinc-400 mb-4 flex items-center gap-2">
                  <Award size={14} /> Skills
                </h3>
                <div className="flex flex-wrap gap-2">
                  {formData.skills.split(',').map((skill, i) => (
                    <span key={i} className="px-3 py-1 bg-zinc-100 text-[10px] font-black uppercase tracking-wider rounded-full">
                      {skill.trim()}
                    </span>
                  ))}
                </div>
              </section>
            </div>
          </div>

          <button
            className="mt-auto absolute bottom-8 right-8 p-4 bg-black text-white rounded-full hover:scale-110 active:scale-95 transition-all shadow-xl"
            onClick={() => window.print()}
          >
            <Download size={20} />
          </button>
        </div>
      </div>
    </motion.div>
  );
};

const InputGroup = ({ label, value, onChange }) => (
  <div className="flex flex-col gap-2">
    <label className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest">{label}</label>
    <input
      type="text"
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="bg-black border border-border-color rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-white transition-all"
    />
  </div>
);

// --- Settings Component ---
const SettingsView = ({ onClearAll }) => (
  <motion.div
    initial={{ opacity: 0, x: -20 }}
    animate={{ opacity: 1, x: 0 }}
    className="flex flex-col gap-8 max-w-4xl"
  >
    <header>
      <h2 className="text-3xl font-bold tracking-tight text-white">Settings</h2>
      <p className="text-zinc-500 mt-1 font-medium">Manage your account preferences and application settings.</p>
    </header>

    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <div className="bg-bg-secondary border border-border-color rounded-3xl p-8 flex flex-col gap-6">
        <h3 className="text-lg font-bold text-white flex items-center gap-2">
          <User size={18} /> Profile Settings
        </h3>
        <div className="flex items-center gap-4 py-4">
          <div className="w-16 h-16 rounded-full bg-zinc-800 flex items-center justify-center text-xl font-bold border-2 border-zinc-700">ST</div>
          <div>
            <p className="text-white font-bold text-lg">Student User</p>
            <p className="text-zinc-500 text-sm">premium@studentpro.com</p>
          </div>
        </div>
        <button className="w-full py-3 bg-border-color hover:bg-bg-secondary rounded-xl text-sm font-bold transition-all border border-border-color">
          Edit Profile
        </button>
      </div>

      <div className="bg-bg-secondary border border-border-color rounded-3xl p-8 flex flex-col gap-6">
        <h3 className="text-lg font-bold text-white flex items-center gap-2">
          <Moon size={18} /> Appearance
        </h3>
        <div className="flex flex-col gap-4">
          <div className="flex items-center justify-between p-4 bg-black border border-border-color rounded-2xl">
            <span className="text-sm font-medium">Dark Mode</span>
            <div className="w-12 h-6 bg-white rounded-full flex items-center px-1">
              <div className="w-4 h-4 bg-black rounded-full ml-auto"></div>
            </div>
          </div>
          <div className="flex items-center justify-between p-4 bg-black border border-border-color rounded-2xl opacity-50">
            <span className="text-sm font-medium">Glassmorphism</span>
            <div className="w-12 h-6 bg-zinc-800 rounded-full flex items-center px-1">
              <div className="w-4 h-4 bg-zinc-600 rounded-full"></div>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-bg-secondary border border-border-color rounded-3xl p-8 flex flex-col gap-6 md:col-span-2">
        <h3 className="text-lg font-bold flex items-center gap-2 text-red-500">
          <Trash2 size={18} /> Danger Zone
        </h3>
        <div className="flex items-center justify-between">
          <div>
            <p className="text-white font-bold">Clear All Notes</p>
            <p className="text-zinc-500 text-xs mt-1">Permanently remove all your saved notes from the database.</p>
          </div>
          <button
            onClick={onClearAll}
            className="px-6 py-3 bg-red-500/10 text-red-500 hover:bg-red-500 hover:text-white rounded-xl text-sm font-bold transition-all border border-red-500/20"
          >
            Delete Everything
          </button>
        </div>
      </div>
    </div>
  </motion.div>
);

// --- Note Card ---
const NoteCard = ({ note, onEdit, onDelete }) => (
  <motion.div
    layout
    initial={{ opacity: 0, scale: 0.95 }}
    animate={{ opacity: 1, scale: 1 }}
    exit={{ opacity: 0, scale: 0.9 }}
    whileHover={{ y: -5 }}
    className="bg-bg-secondary border border-border-color rounded-2xl p-6 flex flex-col gap-4 relative group hover:border-[#333333] transition-all duration-300 shadow-xl"
  >
    <div className="flex justify-between items-start">
      <div className="flex items-center gap-2 text-[10px] font-mono text-zinc-500 bg-bg-primary px-3 py-1 rounded-full border border-border-color">
        <Calendar size={10} />
        {new Date(note.createdAt).toLocaleDateString()}
      </div>
      <div className="flex gap-1.5 opacity-0 group-hover:opacity-100 transition-opacity">
        <button onClick={() => onEdit(note)} className="p-2 bg-border-color hover:bg-white hover:text-black rounded-lg transition-all text-zinc-400">
          <Edit3 size={15} />
        </button>
        <button onClick={() => onDelete(note.id)} className="p-2 bg-border-color hover:bg-red-500/10 hover:text-red-500 rounded-lg transition-all text-zinc-400">
          <Trash2 size={15} />
        </button>
      </div>
    </div>

    <div>
      <h3 className="text-lg font-bold line-clamp-1 text-white tracking-tight">{note.title}</h3>
      <p className="text-sm text-zinc-400 mt-2 line-clamp-4 leading-relaxed font-medium">{note.text}</p>
    </div>

    <div className="mt-auto pt-4 border-t border-border-color flex items-center justify-between text-[10px] text-zinc-600 font-mono">
      <span className="flex items-center gap-1"><Clock size={10} /> {new Date(note.updatedAt).getHours()}:{new Date(note.updatedAt).getMinutes().toString().padStart(2, '0')}</span>
      <span>ID: {note.id.slice(0, 8)}...</span>
    </div>
  </motion.div>
);

// --- Modal ---
const NoteModal = ({ isOpen, onClose, onSubmit, editingNote }) => {
  const [title, setTitle] = useState('');
  const [text, setText] = useState('');

  useEffect(() => {
    if (editingNote) {
      setTitle(editingNote.title);
      setText(editingNote.text);
    } else {
      setTitle('');
      setText('');
    }
  }, [editingNote, isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-100 flex items-center justify-center p-4 bg-black/90 backdrop-blur-sm px-6">
      <motion.div
        initial={{ opacity: 0, scale: 0.9, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.9, y: 20 }}
        className="bg-bg-secondary border border-border-color w-full max-w-2xl rounded-3xl p-8 shadow-2xl relative overflow-hidden"
      >
        <div className="flex justify-between items-center mb-8">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-zinc-900 rounded-lg border border-zinc-800">
              <FileText className="text-white" size={20} />
            </div>
            <h2 className="text-2xl font-bold text-white tracking-tight">{editingNote ? 'Edit Note' : 'Create New Note'}</h2>
          </div>
          <button onClick={onClose} className="p-2.5 hover:bg-zinc-900 rounded-full transition-colors text-zinc-400 hover:text-white">
            <X size={20} />
          </button>
        </div>

        <form onSubmit={(e) => { e.preventDefault(); onSubmit({ title, text, id: editingNote?.id }); }} className="flex flex-col gap-6">
          <div className="flex flex-col gap-2.5">
            <label className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest">Title</label>
            <input
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Give your note a title..."
              required
              className="bg-black border border-border-color rounded-2xl px-5 py-4 text-sm focus:outline-none focus:border-white transition-all text-white placeholder-zinc-700"
            />
          </div>

          <div className="flex flex-col gap-2.5">
            <label className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest">Content</label>
            <textarea
              value={text}
              onChange={(e) => setText(e.target.value)}
              placeholder="What's on your mind?..."
              rows={8}
              required
              className="bg-black border border-border-color rounded-2xl px-5 py-4 text-sm focus:outline-none focus:border-white transition-all text-white resize-none placeholder-zinc-700 leading-relaxed"
            />
          </div>

          <button
            type="submit"
            className="mt-2 bg-white text-black font-bold py-4.5 rounded-2xl flex items-center justify-center gap-3 hover:scale-[1.01] active:scale-95 transition-all shadow-xl shadow-white/5"
          >
            <Save size={20} />
            {editingNote ? 'Save Changes' : 'Publish Note'}
          </button>
        </form>
      </motion.div>
    </div>
  );
};

// --- App ---
function App() {
  const [view, setView] = useState('notes'); // 'notes', 'resume', 'settings'
  const [notes, setNotes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [sort, setSort] = useState('DESC');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingNote, setEditingNote] = useState(null);

  const fetchNotes = useCallback(async () => {
    if (view !== 'notes') return;
    try {
      setLoading(true);
      const res = await axios.get(`${API_URL}?page=${page}&q=${search}&sort=${sort}`);
      setNotes(res.data.notes);
      setTotalPages(res.data.totalPages);
    } catch (err) {
      console.error('Fetch error:', err);
    } finally {
      setLoading(false);
    }
  }, [page, search, sort, view]);

  useEffect(() => {
    const timer = setTimeout(() => fetchNotes(), 400);
    return () => clearTimeout(timer);
  }, [fetchNotes]);

  const handleAddOrEdit = async (data) => {
    try {
      if (data.id) {
        await axios.put(`${API_URL}/${data.id}`, { title: data.title, text: data.text });
      } else {
        await axios.post(API_URL, { title: data.title, text: data.text });
      }
      setIsModalOpen(false);
      setEditingNote(null);
      fetchNotes();
      setView('notes'); // Switch to notes view after adding
    } catch (err) {
      alert(err.response?.data?.message || 'Something went wrong');
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Delete this note permanentely?')) {
      try {
        await axios.delete(`${API_URL}/${id}`);
        fetchNotes();
      } catch (err) {
        console.error('Delete error:', err);
      }
    }
  };

  const handleClearAll = async () => {
    if (window.confirm('Are you absolutely sure you want to delete ALL notes? This cannot be undone.')) {
      try {
        await axios.delete(API_URL);
        fetchNotes();
        alert('All notes have been cleared.');
      } catch (err) {
        console.error('Clear error:', err);
        alert('Failed to clear notes.');
      }
    }
  };

  return (
    <div className="bg-black min-h-screen text-white flex overflow-x-hidden">
      <Sidebar
        currentView={view}
        setView={setView}
        onAddClick={() => { setEditingNote(null); setIsModalOpen(true); }}
      />

      <main className="flex-1 lg:ml-72 min-h-screen flex flex-col p-6 md:p-10 gap-8">

        {view === 'notes' && (
          <>
            {/* Top Header */}
            <header className="flex flex-col md:flex-row items-center justify-between gap-6">
              <div>
                <h2 className="text-3xl font-bold tracking-tight">Your Dashboard</h2>
                <p className="text-zinc-500 mt-1 font-medium italic">Welcome back, Student User.</p>
              </div>

              <div className="flex items-center gap-3 w-full md:w-auto">
                <div className="relative flex-1 md:w-80">
                  <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-600" size={18} />
                  <input
                    type="text"
                    placeholder="Search metadata..."
                    value={search}
                    onChange={(e) => { setSearch(e.target.value); setPage(1); }}
                    className="bg-bg-secondary border border-border-color rounded-xl pl-12 pr-4 py-3 w-full focus:outline-none focus:border-white transition-all text-sm placeholder-zinc-700"
                  />
                </div>
                <button
                  onClick={() => setSort(s => s === 'DESC' ? 'ASC' : 'DESC')}
                  className="p-3 bg-bg-secondary border border-border-color rounded-xl hover:border-zinc-500 transition-colors"
                  title="Toggle Sort"
                >
                  <Filter size={18} className={sort === 'ASC' ? 'text-white' : 'text-zinc-500'} />
                </button>
                <button
                  onClick={() => { setEditingNote(null); setIsModalOpen(true); }}
                  className="lg:hidden p-3 bg-white text-black rounded-xl"
                >
                  <Plus size={20} />
                </button>
              </div>
            </header>

            {/* Note Grid */}
            <div className="flex-1">
              {loading ? (
                <div className="h-full flex flex-col items-center justify-center gap-4 py-32">
                  <Loader2 className="animate-spin text-zinc-500" size={40} />
                  <p className="text-xs font-mono text-zinc-600 uppercase tracking-widest animate-pulse">Syncing Database...</p>
                </div>
              ) : (
                <div className="flex flex-col gap-10">
                  {notes.length > 0 ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
                      <AnimatePresence mode="popLayout">
                        {notes.map((note) => (
                          <NoteCard
                            key={note.id}
                            note={note}
                            onEdit={(n) => { setEditingNote(n); setIsModalOpen(true); }}
                            onDelete={handleDelete}
                          />
                        ))}
                      </AnimatePresence>
                    </div>
                  ) : (
                    <div className="flex flex-col items-center justify-center py-40 text-center">
                      <div className="w-24 h-24 bg-zinc-900 rounded-full flex items-center justify-center mb-6 border border-zinc-800 border-dashed">
                        <FileText className="text-zinc-700" size={40} />
                      </div>
                      <h3 className="text-xl font-bold">No Records Found</h3>
                      <p className="text-zinc-500 text-sm max-w-xs mt-2">
                        {search ? `Your search for "${search}" yielded no results.` : "It looks like you haven't composed any notes yet."}
                      </p>
                    </div>
                  )}

                  {/* Pagination */}
                  {totalPages > 1 && (
                    <div className="flex items-center justify-center gap-6 pt-10 border-t border-border-color">
                      <button
                        disabled={page === 1}
                        onClick={() => setPage(p => Math.max(1, p - 1))}
                        className="flex items-center gap-2 text-sm font-bold text-zinc-500 hover:text-white transition-colors disabled:opacity-20"
                      >
                        <ChevronLeft size={18} /> Prev
                      </button>
                      <div className="flex items-center gap-3">
                        {[...Array(totalPages)].map((_, i) => (
                          <button
                            key={i}
                            onClick={() => setPage(i + 1)}
                            className={`w-8 h-8 rounded-lg text-xs font-bold transition-all ${page === i + 1 ? 'bg-white text-black' : 'hover:bg-zinc-900 text-zinc-500'}`}
                          >
                            {i + 1}
                          </button>
                        ))}
                      </div>
                      <button
                        disabled={page === totalPages}
                        onClick={() => setPage(p => Math.min(totalPages, p + 1))}
                        className="flex items-center gap-2 text-sm font-bold text-zinc-500 hover:text-white transition-colors disabled:opacity-20"
                      >
                        Next <ChevronRight size={18} />
                      </button>
                    </div>
                  )}
                </div>
              )}
            </div>
          </>
        )}

        {view === 'resume' && <ResumeView />}
        {view === 'settings' && <SettingsView onClearAll={handleClearAll} />}
      </main>

      <NoteModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmit={handleAddOrEdit}
        editingNote={editingNote}
      />
    </div>
  );
}

export default App;
