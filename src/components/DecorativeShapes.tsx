const DecorativeShapes = () => {
  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
      {/* Top Left - Green blob with stroke */}
      <svg 
        className="absolute -top-32 -left-32 w-[500px] h-[500px]" 
        viewBox="0 0 400 400"
        style={{ opacity: 0.85 }}
      >
        <path 
          d="M0,150 Q50,50 150,80 Q200,100 220,180 Q200,250 150,280 Q80,300 20,250 Q-10,200 0,150 Z" 
          fill="hsl(142, 50%, 45%)"
          stroke="hsl(142, 60%, 35%)"
          strokeWidth="3"
        />
      </svg>
      
      {/* Top Right - Beige blob */}
      <svg 
        className="absolute -top-24 -right-24 w-[450px] h-[450px]" 
        viewBox="0 0 400 400"
        style={{ opacity: 0.7 }}
      >
        <path 
          d="M250,0 Q350,50 380,150 Q390,220 350,280 Q300,320 240,300 Q180,280 180,220 Q180,150 220,100 Q240,50 250,0 Z" 
          fill="hsl(20, 25%, 85%)"
        />
      </svg>

      {/* Top Right - Dark gray blob with green stroke */}
      <svg 
        className="absolute top-0 -right-20 w-[400px] h-[400px]" 
        viewBox="0 0 400 400"
        style={{ opacity: 0.8 }}
      >
        <path 
          d="M300,20 Q380,80 390,160 Q380,220 340,250 Q290,280 250,260 Q220,240 230,190 Q240,140 270,100 Q290,60 300,20 Z" 
          fill="hsl(210, 15%, 30%)"
          stroke="hsl(142, 60%, 35%)"
          strokeWidth="2"
        />
      </svg>

      {/* Bottom Left - Dark gray blob */}
      <svg 
        className="absolute -bottom-28 -left-28 w-[480px] h-[480px]" 
        viewBox="0 0 400 400"
        style={{ opacity: 0.75 }}
      >
        <path 
          d="M0,280 Q40,200 120,220 Q180,230 200,280 Q210,340 170,370 Q110,400 50,380 Q-10,350 0,280 Z" 
          fill="hsl(210, 15%, 30%)"
        />
      </svg>

      {/* Bottom Left - Beige blob with green stroke */}
      <svg 
        className="absolute -bottom-16 left-0 w-[420px] h-[420px]" 
        viewBox="0 0 400 400"
        style={{ opacity: 0.65 }}
      >
        <path 
          d="M20,300 Q80,240 140,260 Q180,280 170,330 Q150,370 100,380 Q40,390 10,350 Q-5,320 20,300 Z" 
          fill="hsl(20, 25%, 85%)"
          stroke="hsl(142, 60%, 35%)"
          strokeWidth="2"
        />
      </svg>

      {/* Bottom Right - Green blob */}
      <svg 
        className="absolute -bottom-36 -right-36 w-[520px] h-[520px]" 
        viewBox="0 0 400 400"
        style={{ opacity: 0.8 }}
      >
        <path 
          d="M300,250 Q380,280 390,340 Q380,390 330,400 Q260,410 220,380 Q180,350 200,300 Q220,260 270,250 Q290,245 300,250 Z" 
          fill="hsl(142, 50%, 45%)"
          stroke="hsl(142, 60%, 35%)"
          strokeWidth="3"
        />
      </svg>
    </div>
  );
};

export default DecorativeShapes;
