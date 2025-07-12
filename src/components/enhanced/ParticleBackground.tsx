import React, { useRef, useEffect } from 'react'

interface ParticleBackgroundProps {
  density?: number
  color?: 'gold' | 'white' | 'blue'
  opacity?: number
  size?: number
  speed?: number
}

export const ParticleBackground: React.FC<ParticleBackgroundProps> = ({
  density = 50,
  color = 'gold',
  opacity = 0.1,
  size = 2,
  speed = 0.5
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const particles: Array<{
      x: number
      y: number
      vx: number
      vy: number
      life: number
    }> = []

    const colorMap = {
      gold: '#d4af37',
      white: '#ffffff',
      blue: '#1e40af'
    }

    const resizeCanvas = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }

    const createParticle = () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      vx: (Math.random() - 0.5) * speed,
      vy: (Math.random() - 0.5) * speed,
      life: Math.random()
    })

    const initParticles = () => {
      for (let i = 0; i < density; i++) {
        particles.push(createParticle())
      }
    }

    const updateParticles = () => {
      particles.forEach(particle => {
        particle.x += particle.vx
        particle.y += particle.vy
        particle.life -= 0.001

        // Wrap around edges
        if (particle.x < 0) particle.x = canvas.width
        if (particle.x > canvas.width) particle.x = 0
        if (particle.y < 0) particle.y = canvas.height
        if (particle.y > canvas.height) particle.y = 0

        // Respawn if life depleted
        if (particle.life <= 0) {
          Object.assign(particle, createParticle())
        }
      })
    }

    const drawParticles = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      
      particles.forEach(particle => {
        ctx.beginPath()
        ctx.arc(particle.x, particle.y, size, 0, Math.PI * 2)
        ctx.fillStyle = `${colorMap[color]}${Math.floor(opacity * particle.life * 255).toString(16).padStart(2, '0')}`
        ctx.fill()
      })
    }

    const animate = () => {
      updateParticles()
      drawParticles()
      requestAnimationFrame(animate)
    }

    resizeCanvas()
    initParticles()
    animate()

    window.addEventListener('resize', resizeCanvas)

    return () => {
      window.removeEventListener('resize', resizeCanvas)
    }
  }, [density, color, opacity, size, speed])

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-0"
      style={{ opacity }}
    />
  )
}