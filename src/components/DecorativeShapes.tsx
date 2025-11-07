const DecorativeShapes = () => {
  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
      {/* Top Left - Quarter circle GREEN with wavy edge */}
      <svg 
        className="absolute top-0 left-0 w-[250px] h-[250px]" 
        viewBox="0 0 200 200"
        style={{ opacity: 0.6 }}
      >
        <path 
          d="M 0 0 L 0 200 Q 20 180 40 170 Q 60 160 80 150 Q 100 140 120 120 Q 140 100 150 80 Q 160 60 170 40 Q 180 20 200 0 Z" 
          fill="#407b41"
        />
        {/* Gray irregular stripe */}
        <path 
          d="M 15 150 Q 30 130 45 120 Q 55 110 65 100 Q 80 85 95 75 Q 110 65 120 50 Q 130 40 140 25" 
          fill="none"
          stroke="#3e4345"
          strokeWidth="3"
          opacity="0.7"
        />
      </svg>

      {/* Top Right - Quarter circle GRAY with wavy edge */}
      <svg 
        className="absolute top-0 right-0 w-[250px] h-[250px]" 
        viewBox="0 0 200 200"
        style={{ opacity: 0.6 }}
      >
        <path 
          d="M 200 0 L 200 200 Q 180 180 170 160 Q 160 140 150 120 Q 140 100 120 80 Q 100 60 80 50 Q 60 40 40 30 Q 20 20 0 0 Z" 
          fill="#3e4345"
        />
        {/* Green irregular stripe */}
        <path 
          d="M 185 150 Q 170 135 155 120 Q 145 105 130 95 Q 115 80 100 70 Q 85 60 70 45 Q 60 35 50 25" 
          fill="none"
          stroke="#407b41"
          strokeWidth="3"
          opacity="0.7"
        />
      </svg>

      {/* Bottom Left - Quarter circle GRAY with wavy edge */}
      <svg 
        className="absolute bottom-0 left-0 w-[250px] h-[250px]" 
        viewBox="0 0 200 200"
        style={{ opacity: 0.6 }}
      >
        <path 
          d="M 0 200 L 0 0 Q 20 20 30 40 Q 40 60 50 80 Q 60 100 80 120 Q 100 140 120 150 Q 140 160 160 170 Q 180 180 200 200 Z" 
          fill="#3e4345"
        />
        {/* Green irregular stripe */}
        <path 
          d="M 15 50 Q 30 65 40 80 Q 55 95 70 105 Q 85 120 100 130 Q 115 140 130 150 Q 145 160 160 175" 
          fill="none"
          stroke="#407b41"
          strokeWidth="3"
          opacity="0.7"
        />
      </svg>

      {/* Bottom Right - Quarter circle GREEN with wavy edge */}
      <svg 
        className="absolute bottom-0 right-0 w-[250px] h-[250px]" 
        viewBox="0 0 200 200"
        style={{ opacity: 0.6 }}
      >
        <path 
          d="M 200 200 L 200 0 Q 180 20 160 30 Q 140 40 120 50 Q 100 60 80 80 Q 60 100 50 120 Q 40 140 30 160 Q 20 180 0 200 Z" 
          fill="#407b41"
        />
        {/* Gray irregular stripe */}
        <path 
          d="M 185 50 Q 165 65 150 80 Q 135 90 120 105 Q 105 115 90 130 Q 75 145 60 155 Q 50 165 35 175" 
          fill="none"
          stroke="#3e4345"
          strokeWidth="3"
          opacity="0.7"
        />
      </svg>
    </div>
  );
};

export default DecorativeShapes;
