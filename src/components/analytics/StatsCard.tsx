'use client';

import { motion } from 'framer-motion';
import { LucideIcon } from 'lucide-react';

interface StatsCardProps {
  title: string;
  value: string | number;
  icon: LucideIcon;
  trend?: string;
  color?: 'purple' | 'blue' | 'green' | 'orange' | 'red';
  delay?: number;
}

const colorClasses = {
  purple: {
    bg: 'bg-purple-500/20',
    border: 'border-purple-500/30',
    icon: 'text-purple-400',
    trend: 'text-purple-400',
  },
  blue: {
    bg: 'bg-blue-500/20',
    border: 'border-blue-500/30',
    icon: 'text-blue-400',
    trend: 'text-blue-400',
  },
  green: {
    bg: 'bg-green-500/20',
    border: 'border-green-500/30',
    icon: 'text-green-400',
    trend: 'text-green-400',
  },
  orange: {
    bg: 'bg-orange-500/20',
    border: 'border-orange-500/30',
    icon: 'text-orange-400',
    trend: 'text-orange-400',
  },
  red: {
    bg: 'bg-red-500/20',
    border: 'border-red-500/30',
    icon: 'text-red-400',
    trend: 'text-red-400',
  },
};

export default function StatsCard({
  title,
  value,
  icon: Icon,
  trend,
  color = 'purple',
  delay = 0,
}: StatsCardProps) {
  const colors = colorClasses[color];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay }}
      className="relative overflow-hidden rounded-2xl border border-white/10 bg-white/5 backdrop-blur-xl p-6"
    >
      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-white/5 via-transparent to-transparent pointer-events-none" />

      <div className="relative z-10">
        <div className="flex items-start justify-between">
          <div className={`p-3 rounded-xl ${colors.bg} ${colors.border} border`}>
            <Icon className={`w-5 h-5 ${colors.icon}`} />
          </div>

          {trend && (
            <span
              className={`text-sm font-medium ${
                trend.startsWith('+') ? 'text-green-400' : trend.startsWith('-') ? 'text-red-400' : colors.trend
              }`}
            >
              {trend}
            </span>
          )}
        </div>

        <div className="mt-4">
          <h3 className="text-white/50 text-sm font-medium">{title}</h3>
          <p className="text-3xl font-bold text-white mt-1">{value}</p>
        </div>
      </div>
    </motion.div>
  );
}
