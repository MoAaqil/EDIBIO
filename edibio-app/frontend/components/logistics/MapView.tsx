'use client';
import React, { useEffect, useRef, useState } from 'react';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import { Compass, Info, Map, Layers, Navigation } from 'lucide-react';

interface MapViewProps {
  pickupLat?: number;
  pickupLng?: number;
  deliveryLat?: number;
  deliveryLng?: number;
  currentLat?: number;
  currentLng?: number;
  pickupCity?: string;
  deliveryCity?: string;
  loadNumber?: string;
  status?: string;
}

export default function MapView({
  pickupLat = 41.8781,
  pickupLng = -87.6298,
  deliveryLat = 32.7767,
  deliveryLng = -96.7970,
  currentLat,
  currentLng,
  pickupCity = 'Origin',
  deliveryCity = 'Destination',
  loadNumber = 'LS-00000',
  status = 'upcoming'
}: MapViewProps) {
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [mapError, setMapError] = useState<boolean>(false);
  const [mapLoaded, setMapLoaded] = useState<boolean>(false);
  const [mapStyle, setMapStyle] = useState<'streets-v12' | 'satellite-streets-v12' | 'dark-v11'>('dark-v11');

  const token = process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN || '';

  // Effect to initialize Mapbox Map
  useEffect(() => {
    if (!token || !mapContainerRef.current) {
      setMapError(true);
      return;
    }

    mapboxgl.accessToken = token;
    setMapError(false);

    try {
      const map = new mapboxgl.Map({
        container: mapContainerRef.current,
        style: `mapbox://styles/mapbox/${mapStyle}`,
        center: [currentLng || (pickupLng + deliveryLng) / 2, currentLat || (pickupLat + deliveryLat) / 2],
        zoom: 4.5,
      });

      map.addControl(new mapboxgl.NavigationControl(), 'top-right');

      map.on('load', () => {
        setMapLoaded(true);

        // 1. Add route polyline
        map.addSource('route', {
          type: 'geojson',
          data: {
            type: 'Feature',
            properties: {},
            geometry: {
              type: 'LineString',
              coordinates: [
                [pickupLng, pickupLat],
                ...(currentLng && currentLat ? [[currentLng, currentLat]] : []),
                [deliveryLng, deliveryLat]
              ]
            }
          }
        });

        map.addLayer({
          id: 'route-line',
          type: 'line',
          source: 'route',
          layout: {
            'line-join': 'round',
            'line-cap': 'round'
          },
          paint: {
            'line-color': '#3B82F6',
            'line-width': 4,
            'line-dasharray': [2, 1]
          }
        });

        // 2. Add Markers
        // Pickup Marker (Green)
        const pickupEl = document.createElement('div');
        pickupEl.className = 'w-6 h-6 rounded-full bg-emerald-500 border-4 border-white shadow-lg flex items-center justify-center text-[10px] font-bold text-white';
        pickupEl.innerText = 'P';
        new mapboxgl.Marker(pickupEl)
          .setLngLat([pickupLng, pickupLat])
          .setPopup(new mapboxgl.Popup().setHTML(`<b>Pickup:</b> ${pickupCity}`))
          .addTo(map);

        // Delivery Marker (Red)
        const deliveryEl = document.createElement('div');
        deliveryEl.className = 'w-6 h-6 rounded-full bg-rose-500 border-4 border-white shadow-lg flex items-center justify-center text-[10px] font-bold text-white';
        deliveryEl.innerText = 'D';
        new mapboxgl.Marker(deliveryEl)
          .setLngLat([deliveryLng, deliveryLat])
          .setPopup(new mapboxgl.Popup().setHTML(`<b>Delivery:</b> ${deliveryCity}`))
          .addTo(map);

        // Live Truck Marker (Blue pulsating)
        if (currentLat && currentLng) {
          const truckEl = document.createElement('div');
          truckEl.className = 'relative flex items-center justify-center w-8 h-8';
          truckEl.innerHTML = `
            <div class="absolute inset-0 bg-blue-500 rounded-full animate-ping opacity-60"></div>
            <div class="relative w-5 h-5 bg-blue-600 border-2 border-white rounded-full flex items-center justify-center shadow-lg">
              <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="3"><polygon points="3 11 22 2 13 21 11 13 3 11"/></svg>
            </div>
          `;
          new mapboxgl.Marker(truckEl)
            .setLngLat([currentLng, currentLat])
            .setPopup(new mapboxgl.Popup().setHTML(`<b>Load:</b> ${loadNumber}<br/><b>Status:</b> ${status}`))
            .addTo(map);
        }

        // Adjust bounds
        const bounds = new mapboxgl.LngLatBounds()
          .extend([pickupLng, pickupLat])
          .extend([deliveryLng, deliveryLat]);
        
        if (currentLng && currentLat) {
          bounds.extend([currentLng, currentLat]);
        }

        map.fitBounds(bounds, { padding: 50, duration: 1500 });
      });

      return () => map.remove();
    } catch (e) {
      console.error(e);
      setMapError(true);
    }
  }, [pickupLat, pickupLng, deliveryLat, deliveryLng, currentLat, currentLng, token, mapStyle]);

  // Effect to draw Canvas Fallback Simulator (premium custom design)
  useEffect(() => {
    if (!mapError && token) return;

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let progress = 0.45; // Start truck at 45% along the route
    let dir = 0.001;

    const drawFallbackMap = () => {
      // Clear canvas
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // 1. Draw elegant dark background
      ctx.fillStyle = '#0F172A';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // 2. Draw map grids
      ctx.strokeStyle = 'rgba(255,255,255,0.03)';
      ctx.lineWidth = 1;
      const gridSize = 40;
      for (let x = 0; x < canvas.width; x += gridSize) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, canvas.height);
        ctx.stroke();
      }
      for (let y = 0; y < canvas.height; y += gridSize) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(canvas.width, y);
        ctx.stroke();
      }

      // 3. Draw coordinates and labels
      ctx.font = '10px monospace';
      ctx.fillStyle = 'rgba(255,255,255,0.2)';
      ctx.fillText(`${loadNumber} Route Simulation Mode`, 20, 30);
      ctx.fillText(`GPS Tracker Link: ACTIVE`, 20, 45);

      // Coordinates
      const startX = 100;
      const startY = canvas.height - 100;
      const endX = canvas.width - 100;
      const endY = 100;

      // Draw connection curved path
      ctx.beginPath();
      ctx.moveTo(startX, startY);
      // Quad curve
      const cpX = (startX + endX) / 2 + 100;
      const cpY = (startY + endY) / 2 - 50;
      ctx.quadraticCurveTo(cpX, cpY, endX, endY);
      ctx.strokeStyle = 'rgba(59,130,246,0.3)';
      ctx.lineWidth = 4;
      ctx.stroke();

      // Draw dashed active route
      ctx.beginPath();
      ctx.moveTo(startX, startY);
      ctx.quadraticCurveTo(cpX, cpY, endX, endY);
      ctx.strokeStyle = '#3B82F6';
      ctx.lineWidth = 2;
      ctx.setLineDash([5, 5]);
      ctx.stroke();
      ctx.setLineDash([]);

      // 4. Calculate truck position along quadratic curve
      // Bezier formula: B(t) = (1-t)^2 * P0 + 2(1-t)t * P1 + t^2 * P2
      const t = progress;
      const px = Math.pow(1 - t, 2) * startX + 2 * (1 - t) * t * cpX + Math.pow(t, 2) * endX;
      const py = Math.pow(1 - t, 2) * startY + 2 * (1 - t) * t * cpY + Math.pow(t, 2) * endY;

      // Draw Pickup point (Origin)
      ctx.beginPath();
      ctx.arc(startX, startY, 8, 0, 2 * Math.PI);
      ctx.fillStyle = '#10B981';
      ctx.fill();
      ctx.strokeStyle = 'white';
      ctx.lineWidth = 2;
      ctx.stroke();

      ctx.font = 'bold 12px sans-serif';
      ctx.fillStyle = 'white';
      ctx.fillText(`[Pickup] ${pickupCity}`, startX - 40, startY + 25);

      // Draw Delivery point (Destination)
      ctx.beginPath();
      ctx.arc(endX, endY, 8, 0, 2 * Math.PI);
      ctx.fillStyle = '#F43F5E';
      ctx.fill();
      ctx.strokeStyle = 'white';
      ctx.lineWidth = 2;
      ctx.stroke();

      ctx.fillText(`[Delivery] ${deliveryCity}`, endX - 50, endY - 20);

      // Draw intermediate checkpoint/transit state
      if (status === 'in_transit' || status === 'delayed') {
        // Pulse ring around truck
        ctx.beginPath();
        const pulse = 10 + 6 * Math.sin(Date.now() / 150);
        ctx.arc(px, py, pulse, 0, 2 * Math.PI);
        ctx.fillStyle = 'rgba(59,130,246,0.2)';
        ctx.fill();

        // Truck center circle
        ctx.beginPath();
        ctx.arc(px, py, 6, 0, 2 * Math.PI);
        ctx.fillStyle = '#3B82F6';
        ctx.fill();
        ctx.strokeStyle = 'white';
        ctx.lineWidth = 1.5;
        ctx.stroke();

        ctx.font = '11px sans-serif';
        ctx.fillStyle = '#60A5FA';
        ctx.fillText(`Transit: ${Math.round(progress * 100)}%`, px + 12, py + 4);
      }

      // Animate progress slightly
      if (status === 'in_transit') {
        progress += dir;
        if (progress > 0.95 || progress < 0.05) {
          dir = -dir;
        }
      } else if (status === 'delivered') {
        progress = 1.0;
      } else if (status === 'upcoming') {
        progress = 0.0;
      }

      animationFrameId = requestAnimationFrame(drawFallbackMap);
    };

    // Ensure proper sizing
    const handleResize = () => {
      const parent = canvas.parentElement;
      if (parent) {
        canvas.width = parent.clientWidth;
        canvas.height = parent.clientHeight || 350;
      }
    };
    window.addEventListener('resize', handleResize);
    handleResize();

    drawFallbackMap();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', handleResize);
    };
  }, [mapError, token, pickupCity, deliveryCity, loadNumber, status]);

  return (
    <div className="relative w-full h-full min-h-[350px] bg-slate-900 overflow-hidden flex flex-col">
      {/* Mapbox Map Container */}
      {!mapError && (
        <div ref={mapContainerRef} className="absolute inset-0 w-full h-full" />
      )}

      {/* Canvas Fallback Container */}
      {mapError && (
        <div className="relative flex-1 w-full h-full">
          <canvas ref={canvasRef} className="block w-full h-full" />
          <div className="absolute top-4 right-4 bg-slate-950/80 backdrop-blur-md px-3 py-1.5 rounded-lg border border-slate-800 text-[10px] text-amber-400 font-semibold flex items-center gap-1.5">
            <Info size={12} />
            <span>Mapbox Token Missing — Simulated Route</span>
          </div>
        </div>
      )}

      {/* Map Control Layers overlay (only visible if Mapbox load is successful) */}
      {!mapError && mapLoaded && (
        <div className="absolute bottom-4 left-4 bg-slate-950/85 backdrop-blur-md px-3 py-2 rounded-xl border border-slate-800 flex gap-2 text-xs font-semibold shadow-xl">
          <button
            onClick={() => setMapStyle('dark-v11')}
            className={`px-2 py-1 rounded-lg transition-all ${mapStyle === 'dark-v11' ? 'bg-blue-600 text-white' : 'text-slate-400 hover:text-white'}`}
          >
            Dark Map
          </button>
          <button
            onClick={() => setMapStyle('streets-v12')}
            className={`px-2 py-1 rounded-lg transition-all ${mapStyle === 'streets-v12' ? 'bg-blue-600 text-white' : 'text-slate-400 hover:text-white'}`}
          >
            Streets
          </button>
          <button
            onClick={() => setMapStyle('satellite-streets-v12')}
            className={`px-2 py-1 rounded-lg transition-all ${mapStyle === 'satellite-streets-v12' ? 'bg-blue-600 text-white' : 'text-slate-400 hover:text-white'}`}
          >
            Satellite
          </button>
        </div>
      )}
    </div>
  );
}
