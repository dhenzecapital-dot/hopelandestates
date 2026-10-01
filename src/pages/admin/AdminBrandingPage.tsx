import React, { useState } from 'react';
import {
  Download,
  Copy,
  Check,
  ShieldCheck,
  CheckCircle2,
  XCircle,
  Palette,
  FileText,
  ExternalLink,
  Layers,
  Sparkles
} from 'lucide-react';
import {
  OFFICIAL_LOGO_PATH,
  OFFICIAL_LOGO_TRANSPARENT_PATH,
  OFFICIAL_LOGO_MASTER_PATH,
  OFFICIAL_EMBLEM_TRANSPARENT_PATH
} from '../../components/HopelandLogo.tsx';

interface ColorItem {
  name: string;
  hex: string;
  rgb: string;
  role: string;
  textDark?: boolean;
}

export const AdminBrandingPage: React.FC = () => {
  const [copiedHex, setCopiedHex] = useState<string | null>(null);
  const [previewBg, setPreviewBg] = useState<'navy' | 'white' | 'checker'>('white');

  const brandColors: ColorItem[] = [
    {
      name: 'Primary Navy Blue',
      hex: '#0B2345',
      rgb: 'rgb(11, 35, 69)',
      role: 'Primary brand authority, main navigation, headers, dark corporate surfaces'
    },
    {
      name: 'Secondary Navy',
      hex: '#163A63',
      rgb: 'rgb(22, 58, 99)',
      role: 'Sub-headers, structural borders, card accents, hover states'
    },
    {
      name: 'Corporate Gold',
      hex: '#C49A32',
      rgb: 'rgb(196, 154, 50)',
      role: 'Signature corporate accent, key CTA buttons, prestige icons, architectural emblem'
    },
    {
      name: 'Light Gold',
      hex: '#D8B65B',
      rgb: 'rgb(216, 182, 91)',
      role: 'Secondary gold accent, active menu indicators, highlights, hover effects',
      textDark: true
    },
    {
      name: 'White',
      hex: '#FFFFFF',
      rgb: 'rgb(255, 255, 255)',
      role: 'Pristine base containers, clean card backgrounds, logo badge surface',
      textDark: true
    },
    {
      name: 'Light Background',
      hex: '#F7F8FA',
      rgb: 'rgb(247, 248, 250)',
      role: 'Universal page background, secondary card fills, content separation',
      textDark: true
    },
    {
      name: 'Dark Text',
      hex: '#17263A',
      rgb: 'rgb(23, 38, 58)',
      role: 'Primary editorial typography, headings, high-contrast readable text'
    },
    {
      name: 'Muted Gray',
      hex: '#697586',
      rgb: 'rgb(105, 117, 134)',
      role: 'Supporting body copy, metadata, timestamps, subtitles, secondary borders'
    }
  ];

  const handleCopy = (hex: string) => {
    navigator.clipboard.writeText(hex);
    setCopiedHex(hex);
    setTimeout(() => setCopiedHex(null), 2500);
  };

  return (
    <div className="p-6 sm:p-8 space-y-8 max-w-6xl mx-auto font-sans">
      {/* Page Header */}
      <div className="border-b border-[#163A63] pb-6 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2.5 text-xs text-[#C49A32] font-semibold uppercase tracking-wider mb-1">
            <ShieldCheck className="w-4 h-4" />
            <span>Corporate Identity & Brand Standards</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-serif font-bold text-white tracking-tight">
            Official Brand Assets & Guidelines
          </h1>
          <p className="text-sm text-slate-300 mt-1 max-w-2xl">
            Centralized brand repository for Hopeland Estates and Realty Corporation. Official logos, color palette, typography hierarchy, and institutional usage rules.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <a
            href={OFFICIAL_LOGO_PATH}
            download="hopeland-official-logo.png"
            className="h-10 px-4 bg-[#C49A32] hover:bg-[#D8B65B] text-[#0B2345] rounded font-semibold text-xs uppercase tracking-wider flex items-center gap-2 transition-colors shadow-sm"
          >
            <Download className="w-4 h-4" />
            <span>Download Master Logo (HD)</span>
          </a>
        </div>
      </div>

      {/* Official Corporate Logo Display */}
      <div className="bg-[#0B2345] border border-[#163A63] rounded-lg p-6 sm:p-8 space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#163A63] pb-4">
          <div>
            <h2 className="text-lg font-serif font-bold text-white flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-[#C49A32]" />
              <span>Official Corporate Logo</span>
            </h2>
            <p className="text-xs text-slate-400 mt-0.5">
              The single source of truth for Hopeland Estates and Realty Corporation branding.
            </p>
          </div>

          <div className="flex items-center gap-2 text-xs">
            <span className="text-slate-400 mr-1">Preview Background:</span>
            <button
              onClick={() => setPreviewBg('white')}
              className={`px-3 py-1.5 rounded text-xs font-medium transition-colors ${
                previewBg === 'white'
                  ? 'bg-white text-slate-900 font-semibold shadow-xs'
                  : 'bg-[#163A63] text-slate-300 hover:text-white'
              }`}
            >
              White
            </button>
            <button
              onClick={() => setPreviewBg('navy')}
              className={`px-3 py-1.5 rounded text-xs font-medium transition-colors ${
                previewBg === 'navy'
                  ? 'bg-[#071A33] text-[#D8B65B] font-semibold border border-[#C49A32]/40'
                  : 'bg-[#163A63] text-slate-300 hover:text-white'
              }`}
            >
              Navy (#0B2345)
            </button>
            <button
              onClick={() => setPreviewBg('checker')}
              className={`px-3 py-1.5 rounded text-xs font-medium transition-colors ${
                previewBg === 'checker'
                  ? 'bg-slate-700 text-white font-semibold'
                  : 'bg-[#163A63] text-slate-300 hover:text-white'
              }`}
            >
              Checkerboard
            </button>
          </div>
        </div>

        {/* Logo Preview Canvas */}
        <div
          className={`w-full min-h-[340px] rounded-lg p-8 flex items-center justify-center transition-colors border border-slate-700/50 ${
            previewBg === 'white'
              ? 'bg-white'
              : previewBg === 'navy'
              ? 'bg-[#0B2345]'
              : 'bg-[radial-gradient(#cbd5e1_1px,transparent_1px)] [background-size:16px_16px] bg-slate-200'
          }`}
        >
          <div className="max-w-md w-full flex flex-col items-center justify-center text-center">
            <img
              src={OFFICIAL_LOGO_PATH}
              alt="Hopeland Estates and Realty Corporation Official Logo"
              className="max-h-72 w-auto object-contain transition-all"
            />
          </div>
        </div>

        {/* Technical Asset Specs */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 pt-2">
          <div className="bg-[#07172F] p-4 rounded border border-[#163A63]/60">
            <p className="text-[11px] text-slate-400 uppercase tracking-wider font-semibold">Master Format</p>
            <p className="text-sm font-bold text-white mt-1">High-Definition PNG</p>
            <p className="text-xs text-slate-500 font-mono mt-0.5">1024 x 1024 px · 300 DPI</p>
          </div>
          <div className="bg-[#07172F] p-4 rounded border border-[#163A63]/60">
            <p className="text-[11px] text-slate-400 uppercase tracking-wider font-semibold">Asset File Path</p>
            <p className="text-xs font-mono text-[#D8B65B] mt-1 truncate" title="/assets/branding/hopeland-official-logo.png">
              /assets/branding/...
            </p>
            <p className="text-xs text-slate-500 mt-0.5">Centralized Public Route</p>
          </div>
          <div className="bg-[#07172F] p-4 rounded border border-[#163A63]/60">
            <p className="text-[11px] text-slate-400 uppercase tracking-wider font-semibold">Brand Monogram</p>
            <p className="text-sm font-bold text-white mt-1">Architectural 'H'</p>
            <p className="text-xs text-slate-500 mt-0.5">Twin towers & gable home</p>
          </div>
          <div className="bg-[#07172F] p-4 rounded border border-[#163A63]/60">
            <p className="text-[11px] text-slate-400 uppercase tracking-wider font-semibold">Official Tagline</p>
            <p className="text-xs font-serif font-bold text-[#C49A32] mt-1 leading-snug">
              "Building Strong Foundations for Better Tomorrows."
            </p>
          </div>
        </div>

        {/* Direct Download Actions */}
        <div className="flex flex-wrap gap-3 pt-2 border-t border-[#163A63]">
          <a
            href={OFFICIAL_LOGO_MASTER_PATH}
            download="hopeland-official-logo-master.png"
            className="px-4 py-2 bg-[#163A63] hover:bg-[#1f4a7a] text-white text-xs font-semibold rounded flex items-center gap-2 transition-colors"
          >
            <Download className="w-3.5 h-3.5 text-[#C49A32]" />
            <span>Download Master PNG (1024px)</span>
          </a>
          <a
            href={OFFICIAL_LOGO_TRANSPARENT_PATH}
            download="hopeland-official-logo-transparent.png"
            className="px-4 py-2 bg-[#163A63] hover:bg-[#1f4a7a] text-white text-xs font-semibold rounded flex items-center gap-2 transition-colors"
          >
            <Download className="w-3.5 h-3.5 text-[#C49A32]" />
            <span>Download Transparent PNG</span>
          </a>
          <a
            href={OFFICIAL_EMBLEM_TRANSPARENT_PATH}
            download="hopeland-emblem-transparent.png"
            className="px-4 py-2 bg-[#07172F] hover:bg-[#163A63] text-slate-300 hover:text-white border border-[#163A63] text-xs font-medium rounded flex items-center gap-2 transition-colors"
          >
            <Download className="w-3.5 h-3.5 text-slate-400" />
            <span>Download Emblem Asset</span>
          </a>
        </div>
      </div>

      {/* Corporate Color Palette */}
      <div className="bg-[#0B2345] border border-[#163A63] rounded-lg p-6 sm:p-8 space-y-6">
        <div className="border-b border-[#163A63] pb-4">
          <h2 className="text-lg font-serif font-bold text-white flex items-center gap-2">
            <Palette className="w-5 h-5 text-[#C49A32]" />
            <span>Corporate Color Palette</span>
          </h2>
          <p className="text-xs text-slate-400 mt-0.5">
            Strict palette tokens for all web properties, documents, investment teasers, and marketing collateral.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {brandColors.map((color) => {
            const isCopied = copiedHex === color.hex;
            return (
              <div
                key={color.hex}
                className="bg-[#07172F] border border-[#163A63]/60 rounded-lg overflow-hidden flex flex-col justify-between group hover:border-[#C49A32]/60 transition-colors"
              >
                {/* Color Swatch */}
                <div
                  className="h-24 w-full p-3 flex items-start justify-end transition-transform group-hover:scale-[1.01]"
                  style={{ backgroundColor: color.hex }}
                >
                  <button
                    onClick={() => handleCopy(color.hex)}
                    className={`p-1.5 rounded text-xs transition-colors shadow-xs ${
                      color.textDark
                        ? 'bg-slate-900/80 text-white hover:bg-slate-900'
                        : 'bg-white/90 text-slate-900 hover:bg-white'
                    }`}
                    title="Copy hex code"
                  >
                    {isCopied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                  </button>
                </div>

                {/* Details */}
                <div className="p-4 space-y-2">
                  <div className="flex items-center justify-between">
                    <h3 className="text-xs font-bold text-white font-serif">{color.name}</h3>
                    <span className="text-[11px] font-mono text-[#D8B65B] font-semibold">{color.hex}</span>
                  </div>
                  <p className="text-[10.5px] font-mono text-slate-400">{color.rgb}</p>
                  <p className="text-[11px] text-slate-300 leading-relaxed pt-1 border-t border-slate-800">
                    {color.role}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Brand Typography & Hierarchy */}
      <div className="bg-[#0B2345] border border-[#163A63] rounded-lg p-6 sm:p-8 space-y-6">
        <div className="border-b border-[#163A63] pb-4">
          <h2 className="text-lg font-serif font-bold text-white flex items-center gap-2">
            <FileText className="w-5 h-5 text-[#C49A32]" />
            <span>Corporate Typography Guidelines</span>
          </h2>
          <p className="text-xs text-slate-400 mt-0.5">
            Institutional typographical system reflecting prestige, precision, and architectural balance.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-[#07172F] p-5 rounded-lg border border-[#163A63]/60 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs uppercase tracking-wider text-[#C49A32] font-semibold">Primary Display</span>
              <span className="text-[11px] font-mono text-slate-400">Cinzel / Serif</span>
            </div>
            <p className="text-2xl font-serif font-bold text-white tracking-wide">
              HOPELAND
            </p>
            <p className="text-xs text-slate-300 leading-relaxed">
              Used for primary corporate logotype, key headlines, project hero titles, and prestigious section banners.
            </p>
            <div className="text-[11px] font-mono text-slate-400 pt-2 border-t border-slate-800">
              Weights: 600 SemiBold, 700 Bold, 800 ExtraBold
            </div>
          </div>

          <div className="bg-[#07172F] p-5 rounded-lg border border-[#163A63]/60 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs uppercase tracking-wider text-[#C49A32] font-semibold">Interface & Body</span>
              <span className="text-[11px] font-mono text-slate-400">Plus Jakarta Sans</span>
            </div>
            <p className="text-xl font-sans font-semibold text-white">
              Building Strong Foundations
            </p>
            <p className="text-xs text-slate-300 leading-relaxed">
              Modern sans-serif utilized for corporate body text, user interfaces, navigation items, buttons, and data tables.
            </p>
            <div className="text-[11px] font-mono text-slate-400 pt-2 border-t border-slate-800">
              Weights: 300 Light, 400 Regular, 500 Medium, 600 SemiBold
            </div>
          </div>

          <div className="bg-[#07172F] p-5 rounded-lg border border-[#163A63]/60 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs uppercase tracking-wider text-[#C49A32] font-semibold">Editorial Accent</span>
              <span className="text-[11px] font-mono text-slate-400">Cormorant Garamond</span>
            </div>
            <p className="text-xl font-serif italic text-[#D8B65B]">
              "Integrity in every development."
            </p>
            <p className="text-xs text-slate-300 leading-relaxed">
              Refined editorial serif applied to executive quotes, philosophy callouts, and institutional pull-quotes.
            </p>
            <div className="text-[11px] font-mono text-slate-400 pt-2 border-t border-slate-800">
              Weights: 400 Italic, 600 SemiBold
            </div>
          </div>
        </div>
      </div>

      {/* Brand Usage Rules: DOs and DON'Ts */}
      <div className="bg-[#0B2345] border border-[#163A63] rounded-lg p-6 sm:p-8 space-y-6">
        <div className="border-b border-[#163A63] pb-4">
          <h2 className="text-lg font-serif font-bold text-white flex items-center gap-2">
            <Layers className="w-5 h-5 text-[#C49A32]" />
            <span>Brand Usage Rules (Do's & Don'ts)</span>
          </h2>
          <p className="text-xs text-slate-400 mt-0.5">
            Strict compliance standards ensuring visual consistency across all corporate media.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* DOs */}
          <div className="bg-[#07172F] p-5 rounded-lg border border-emerald-800/40 space-y-3">
            <div className="flex items-center gap-2 text-emerald-400 font-semibold text-xs uppercase tracking-wider">
              <CheckCircle2 className="w-4 h-4" />
              <span>Approved Usage (Do's)</span>
            </div>
            <ul className="space-y-2.5 text-xs text-slate-300">
              <li className="flex items-start gap-2">
                <span className="text-emerald-400 mt-0.5 font-bold">✓</span>
                <span>Always use the official master PNG asset from <code className="font-mono text-[11px] text-[#D8B65B]">/assets/branding/hopeland-official-logo.png</code>.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-emerald-400 mt-0.5 font-bold">✓</span>
                <span>Preserve intrinsic aspect ratio and natural 1024x1024 proportions at all times with <code className="font-mono text-[11px] text-[#D8B65B]">object-fit: contain</code>.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-emerald-400 mt-0.5 font-bold">✓</span>
                <span>When placing the logo on dark navy backgrounds, house it within a crisp, rounded white badge container for authentic presentation.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-emerald-400 mt-0.5 font-bold">✓</span>
                <span>Ensure generous breathing room around the logo (minimum 16px horizontal and vertical padding).</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-emerald-400 mt-0.5 font-bold">✓</span>
                <span>Pair exclusively with the official corporate tagline: <em>"BUILDING STRONG FOUNDATIONS FOR BETTER TOMORROWS."</em></span>
              </li>
            </ul>
          </div>

          {/* DON'Ts */}
          <div className="bg-[#07172F] p-5 rounded-lg border border-rose-800/40 space-y-3">
            <div className="flex items-center gap-2 text-rose-400 font-semibold text-xs uppercase tracking-wider">
              <XCircle className="w-4 h-4" />
              <span>Prohibited Practices (Don'ts)</span>
            </div>
            <ul className="space-y-2.5 text-xs text-slate-300">
              <li className="flex items-start gap-2">
                <span className="text-rose-400 mt-0.5 font-bold">✗</span>
                <span>Do NOT recreate, regenerate, or replace the architectural emblem with approximate CSS shapes or third-party clip art.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-rose-400 mt-0.5 font-bold">✗</span>
                <span>Do NOT stretch, squeeze, rotate, or alter the horizontal and vertical aspect ratios of the logo.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-rose-400 mt-0.5 font-bold">✗</span>
                <span>Do NOT apply unapproved drop shadows, colored halos, neon glows, or filters directly over the logo.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-rose-400 mt-0.5 font-bold">✗</span>
                <span>Do NOT modify the corporate colors (#0B2345 navy and #C49A32 gold) to arbitrary non-brand shades.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-rose-400 mt-0.5 font-bold">✗</span>
                <span>Do NOT replace the official lettering typography or re-typeset "HOPELAND ESTATES AND REALTY CORPORATION".</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};
