const DecorativeShapes = () => {
  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
      {/* Top Left */}
      <svg 
        className="absolute -top-20 -left-20 w-64 h-64 opacity-40" 
        viewBox="0 0 200 200"
      >
        <path 
          d="M0,100 Q50,20 100,50 T200,100 L200,0 L0,0 Z" 
          fill="hsl(var(--primary))"
        />
      </svg>
      
      {/* Top Right */}
      <svg 
        className="absolute -top-16 -right-16 w-56 h-56 opacity-30" 
        viewBox="0 0 200 200"
      >
        <circle cx="100" cy="100" r="80" fill="hsl(var(--muted))" />
        <circle cx="100" cy="100" r="75" fill="none" stroke="hsl(var(--primary))" strokeWidth="2" />
      </svg>

      {/* Bottom Left */}
      <svg 
        className="absolute -bottom-24 -left-24 w-72 h-72 opacity-35" 
        viewBox="0 0 200 200"
      >
        <ellipse cx="50" cy="150" rx="80" ry="60" fill="hsl(var(--muted))" />
        <path 
          d="M20,120 Q50,80 100,100 T180,130" 
          fill="none" 
          stroke="hsl(var(--primary))" 
          strokeWidth="2"
        />
      </svg>

      {/* Bottom Right */}
      <svg 
        className="absolute -bottom-20 -right-20 w-64 h-64 opacity-40" 
        viewBox="0 0 200 200"
      >
        <path 
          d="M200,100 Q150,180 100,150 T0,100 L0,200 L200,200 Z" 
          fill="hsl(var(--primary))"
        />
      </svg>
    </div>
  );
};

export default DecorativeShapes;
