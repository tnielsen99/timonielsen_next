import { useEffect, useRef } from 'react';

// Themes: three treasures, simple virtues, true greatness
// Visualization: A grid where dots move with patience and humility, showing how simplicity leads to harmony

const RhythmicPulseGrid = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    canvas.width = 550;
    canvas.height = 550;

    let time = 0;
    let animationFrameId = null;
    const lineCount = 20;
    const lineSpacing = canvas.height / (lineCount + 1);
    const verticalLineCount = 20;
    const verticalLineSpacing = canvas.width / (verticalLineCount + 1);

    // Three patterns representing simplicity, patience, and humility
    const dotPatterns = [];
    for (let i = 0; i < 3; i++) {
      const pattern = [];
      const frequency = 0.5 + i * 0.3;  // Each virtue moves at its own pace
      const amplitude = 100 + i * 50;    // Each finds its own space

      for (let j = 0; j < 15; j++) {
        pattern.push({
          baseX: canvas.width / 2,
          baseY: (j + 1) * (canvas.height / 16),
          frequency: frequency,
          amplitude: amplitude,
          phase: j * 0.2
        });
      }
      dotPatterns.push(pattern);
    }

    const animate = () => {
      ctx.fillStyle = '#F0EEE6';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      time += 0.0045; // Further reduced to 56.25% of original speed

      // Draw horizontal lines with pulse effect
      for (let i = 1; i <= lineCount; i++) {
        const y = i * lineSpacing;
        const pulse = Math.sin(time + i * 0.1) * 0.5 + 0.5;

        ctx.strokeStyle = `rgba(0, 0, 0, 0.1)`; // 10% black
        ctx.lineWidth = 1;

        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(canvas.width, y);
        ctx.stroke();
      }

      // Draw vertical lines
      for (let i = 1; i <= verticalLineCount; i++) {
        const x = i * verticalLineSpacing;

        ctx.strokeStyle = `rgba(0, 0, 0, 0.1)`; // 10% black
        ctx.lineWidth = 1;

        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, canvas.height);
        ctx.stroke();
      }

      // Draw dot patterns
      dotPatterns.forEach((pattern, patternIndex) => {
        pattern.forEach(dot => {
          const x = dot.baseX + Math.sin(time * dot.frequency + dot.phase) * dot.amplitude;
          const y = dot.baseY;

          // Find nearest line and snap to it
          const nearestLine = Math.round(y / lineSpacing) * lineSpacing;

          const sizeMultiplier = 1 + Math.sin(time * 1.5 + patternIndex + dot.phase) * 0.3; // Reduced to 75% pulse speed
          const size = 3 * sizeMultiplier;

          ctx.fillStyle = `rgba(40, 40, 40, ${0.6 + Math.sin(time * 1.125 + dot.phase) * 0.3})`; // Reduced to 75% opacity pulse speed
          ctx.beginPath();
          ctx.arc(x, nearestLine, size, 0, Math.PI * 2);
          ctx.fill();
        });
      });

      animationFrameId = requestAnimationFrame(animate);
    };

    animate();

    // Cleanup function
    return () => {
      if (animationFrameId) {
        cancelAnimationFrame(animationFrameId);
        animationFrameId = null;
      }

      if (canvas && ctx) {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
      }

      dotPatterns.length = 0;
    };
  }, []);

  return (
    <div style={{ width: '550px', height: '550px', backgroundColor: '#F0EEE6' }}>
      <canvas ref={canvasRef} />
    </div>
  );
};

export default RhythmicPulseGrid;