'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Download, FileJson, FileSpreadsheet, Check, X } from 'lucide-react';
import { TimeRange, ExportFormat } from '@/lib/analytics/types';

interface ExportButtonProps {
  range: TimeRange;
}

export default function ExportButton({ range }: ExportButtonProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [isExporting, setIsExporting] = useState(false);
  const [success, setSuccess] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  async function handleExport(format: ExportFormat) {
    setIsExporting(true);
    setError(null);
    setSuccess(null);

    try {
      const password = sessionStorage.getItem('analytics_auth');
      const res = await fetch(`/api/analytics/export?format=${format}&range=${range}`, {
        headers: { 'x-analytics-password': password || '' },
      });

      if (!res.ok) {
        throw new Error('Export failed');
      }

      // Get filename from Content-Disposition header
      const contentDisposition = res.headers.get('Content-Disposition');
      const filenameMatch = contentDisposition?.match(/filename="(.+)"/);
      const filename = filenameMatch?.[1] || `analytics-export.${format}`;

      // Create download
      const blob = await res.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = filename;
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
      document.body.removeChild(a);

      setSuccess(`Exported as ${format.toUpperCase()}`);
      setTimeout(() => {
        setSuccess(null);
        setIsOpen(false);
      }, 2000);
    } catch {
      setError('Export failed');
      setTimeout(() => setError(null), 3000);
    } finally {
      setIsExporting(false);
    }
  }

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 px-4 py-2 bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl text-white/70 hover:text-white transition-colors"
      >
        <Download className="w-4 h-4" />
        <span className="hidden sm:inline">Export</span>
      </button>

      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              className="fixed inset-0 z-40"
            />

            {/* Dropdown */}
            <motion.div
              initial={{ opacity: 0, y: -10, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -10, scale: 0.95 }}
              transition={{ duration: 0.15 }}
              className="absolute right-0 mt-2 w-48 z-50 rounded-xl border border-white/10 bg-[#1a1a1a] backdrop-blur-xl shadow-2xl overflow-hidden"
            >
              <div className="p-2">
                <p className="text-white/40 text-xs px-3 py-2 uppercase tracking-wider">
                  Export Format
                </p>

                {success ? (
                  <div className="flex items-center gap-2 px-3 py-2 text-green-400">
                    <Check className="w-4 h-4" />
                    <span className="text-sm">{success}</span>
                  </div>
                ) : error ? (
                  <div className="flex items-center gap-2 px-3 py-2 text-red-400">
                    <X className="w-4 h-4" />
                    <span className="text-sm">{error}</span>
                  </div>
                ) : (
                  <>
                    <button
                      onClick={() => handleExport('json')}
                      disabled={isExporting}
                      className="flex items-center gap-3 w-full px-3 py-2 rounded-lg text-white/70 hover:text-white hover:bg-white/5 transition-colors disabled:opacity-50"
                    >
                      <FileJson className="w-4 h-4 text-blue-400" />
                      <span className="text-sm">JSON</span>
                    </button>

                    <button
                      onClick={() => handleExport('csv')}
                      disabled={isExporting}
                      className="flex items-center gap-3 w-full px-3 py-2 rounded-lg text-white/70 hover:text-white hover:bg-white/5 transition-colors disabled:opacity-50"
                    >
                      <FileSpreadsheet className="w-4 h-4 text-green-400" />
                      <span className="text-sm">CSV</span>
                    </button>
                  </>
                )}
              </div>

              <div className="border-t border-white/5 px-4 py-2">
                <p className="text-white/30 text-xs">
                  Exporting: {range === 'all' ? 'All time' : `Last ${range}`}
                </p>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
