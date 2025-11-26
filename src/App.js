import React, { useState, useRef, useEffect, useMemo } from 'react';
import LuminaBackend from './services/luminaBackend';
import { 
  Upload, X, Copy, Image as ImageIcon, Loader2, Zap, Terminal, Check, 
  Trash2, Film, Camera, Wand2, Download, Aperture, Command, ChevronRight, 
  Layers, Palette, Sparkles, Maximize2, Minimize2, Search, Heart, Share2, 
  MoreHorizontal, Star, Hexagon, Info, ArrowUpRight, Grid, List, Play,
  Square, RectangleHorizontal, RectangleVertical, Monitor, Smartphone, BookOpen,
  RefreshCw, LayoutTemplate, FileText, FileJson, ClipboardCopy, Save, UserCheck,
  PaintBucket, Plus, Settings2, Edit3, XCircle, ExternalLink, ChevronDown, ChevronUp, ArrowLeft,
  HeartCrack, Smile, Flame, BrainCircuit, Sword, Ghost, Tv, FlaskConical, Globe, ArrowRight,
  Import, Sidebar as SidebarIcon, Home, Code2, Cpu, ScanFace, LayoutDashboard, Menu, MousePointer2
} from 'lucide-react';

// --- Configuration ---
const GALLERY_API_URL = process.env.REACT_APP_GALLERY_API || "https://comfyarts.com/api/gallery";
const GALLERY_PAGE_SIZE = 20;

// Rest of the file continues exactly as in paste.txt...
