// Lightweight background components - no heavy animations

export function TechGrid() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {/* Static grid lines - GPU friendly */}
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `
            linear-gradient(to right, white 1px, transparent 1px),
            linear-gradient(to bottom, white 1px, transparent 1px)
          `,
          backgroundSize: '60px 60px',
        }}
      />
    </div>
  );
}

export function FloatingCode() {
  const codeSnippets = [
    "const build = () => {}",
    "npm run dev",
    "git push origin main",
    "export default App",
    "async function fetch()",
    "<Component />",
    "return { success }",
    "import React from",
    "useState(null)",
    "className=''",
  ];

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {codeSnippets.map((code, i) => (
        <motion.div
          key={i}
          className="absolute font-mono text-[10px] text-white/[0.03] whitespace-nowrap"
          style={{
            left: `${(i * 13) % 100}%`,
            top: `${(i * 17) % 100}%`,
          }}
          animate={{
            opacity: [0.02, 0.05, 0.02],
            y: [0, -20, 0],
          }}
          transition={{
            duration: 6 + i,
            repeat: Infinity,
            ease: "easeInOut",
            delay: i * 0.5,
          }}
        >
          {code}
        </motion.div>
      ))}
    </div>
  );
}

export function GlowingOrb() {
  return (
    <motion.div
      className="absolute w-[600px] h-[600px] rounded-full pointer-events-none"
      style={{
        background: "radial-gradient(circle, rgba(255,255,255,0.03) 0%, transparent 70%)",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
      }}
      animate={{
        scale: [1, 1.1, 1],
        opacity: [0.5, 0.8, 0.5],
      }}
      transition={{
        duration: 8,
        repeat: Infinity,
        ease: "easeInOut",
      }}
    />
  );
}

export function NoiseTexture() {
  // Lightweight grain effect using CSS only - no SVG filter
  return (
    <div
      className="absolute inset-0 pointer-events-none opacity-[0.02]"
      style={{
        backgroundImage: `url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAyCAYAAAAeP4ixAAAABHNCSVQICAgIfAhkiAAAAAlwSFlzAAALEwAACxMBAJqcGAAAAY5JREFUaIHt2c0OgjAQBOD5/5/2oB48ePCkJ5944YCxQGnZnSmQ7CTEqPTrFCjwOQDwRJIAAJJ6VO4p6h5Tf1H3mPqLusfUX9Q9pv6i7jH1F3WPqb+oe0z9Rd1j6i/qHlN/UfeY+ou6x9Rf1D2m/qLuMfUXdY+pv6h7TP1F3WPqL+oeU39R95j6i7rH1F/UPab+ou4x9Rd1j6m/qHtM/UXdY+ov6h5Tf1H3mPqLusfUX9Q9pv6i7jH1F3WP4XmfKwC8EQkAgCTJ7inqHlN/UfeY+ou6x9Rf1D2m/qLuMfUXdY+pv6h7TP1F3WPqL+oeU39R95j6i7rH1F/UPab+ou4x9Rd1j6m/qHtM/UXdY+ov6h5Tf1H3mPqLusfUX9Q9pv6i7jH1F3WPqb+oe0z9Rd1j6i/qHlN/UfeY+ou6x9Rf1D2m/qLuMfUXdY+pv6h7TP1F3WPqL+oeU39R95j6i7rH1F/UPab+ou4x9Rd1j6m/qHsM/y7zAwDeAOBNEgAAknpU7inqHvPyF3e/vAG8AQAAAB5JRU5ErkJggg==")`,
      }}
    />
  );
}

interface TechBackgroundProps {
  children?: React.ReactNode;
  variant?: "default" | "minimal" | "intense";
}

export function TechBackground({ children, variant = "default" }: TechBackgroundProps) {
  return (
    <div className="relative min-h-screen bg-[#121212] text-white overflow-hidden">
      <TechGrid />
      {variant !== "minimal" && <FloatingCode />}
      <GlowingOrb />
      <NoiseTexture />
      <div className="relative z-10">{children}</div>
    </div>
  );
}
