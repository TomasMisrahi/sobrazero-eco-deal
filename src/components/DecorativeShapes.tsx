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
          d="M 10 190 Q 30 170 50 150 Q 70 130 90 110 Q 110 90 130 70 Q 150 50 170 30 Q 180 20 190 10" 
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
          d="M 190 190 Q 170 170 150 150 Q 130 130 110 110 Q 90 90 70 70 Q 50 50 30 30 Q 20 20 10 10" 
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
          d="M 10 10 Q 20 30 30 50 Q 50 70 70 90 Q 90 110 110 130 Q 130 150 150 170 Q 170 180 190 190" 
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
          d="M 190 10 Q 180 30 170 50 Q 150 70 130 90 Q 110 110 90 130 Q 70 150 50 170 Q 30 180 10 190" 
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
