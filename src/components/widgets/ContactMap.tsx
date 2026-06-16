"use client";

import { useEffect, useRef } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { useTheme } from "next-themes";

export default function ContactMap() {
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const mapRef = useRef<L.Map | null>(null);
  const { resolvedTheme } = useTheme();

  useEffect(() => {
    if (!mapContainerRef.current) return;

    let timeoutId: any;

    // Initialize map if not already initialized
    if (!mapRef.current) {
      const position: L.LatLngExpression = [-7.8171, 112.0114]; // Kediri Center
      
      const map = L.map(mapContainerRef.current, {
        center: position,
        zoom: 12,
        zoomControl: false, // We will position zoom control or customize it
        scrollWheelZoom: false, // Prevents accidental scroll zoom when scrolling page
      });

      // Add custom zoom control at bottom right
      L.control.zoom({
        position: 'bottomright'
      }).addTo(map);

      mapRef.current = map;

      // Add glowing marker at Kediri center
      const customIcon = L.divIcon({
        className: "custom-glowing-marker",
        html: `
          <div class="relative flex items-center justify-center w-8 h-8">
            <span class="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-500 opacity-60"></span>
            <span class="relative inline-flex rounded-full h-4 w-4 bg-blue-600 border-2 border-white dark:border-zinc-900 shadow-md"></span>
          </div>
        `,
        iconSize: [32, 32],
        iconAnchor: [16, 16],
      });

      const marker = L.marker(position, { icon: customIcon }).addTo(map);
      
      // Beautiful Popup
      const popupContent = `
        <div class="p-1 font-sans text-xs">
          <h4 class="font-bold text-slate-800 dark:text-slate-100 text-sm mb-1">Kediri Base</h4>
          <p class="text-slate-600 dark:text-slate-300 leading-normal">
            Creative Space & Development Hub. Open to global remote collaborations!
          </p>
        </div>
      `;
      marker.bindPopup(popupContent, {
        className: 'custom-leaflet-popup'
      });

      // Draw Kediri highlight zone
      L.circle(position, {
        radius: 12000, // 12 km
        color: "#3b82f6", // Blue
        fillColor: "#3b82f6",
        fillOpacity: 0.08,
        weight: 1.5,
        dashArray: "6, 6",
      }).addTo(map);

      // Trigger redraw to fit flexible containers
      timeoutId = setTimeout(() => {
        if (mapRef.current) {
          mapRef.current.invalidateSize();
        }
      }, 200);
    }

    return () => {
      if (timeoutId) {
        clearTimeout(timeoutId);
      }
      // Clean up map on unmount
      if (mapRef.current) {
        mapRef.current.remove();
        mapRef.current = null;
      }
    };
  }, []);

  // Update map tile layer based on active theme
  useEffect(() => {
    if (!mapRef.current) return;
    const map = mapRef.current;

    // Remove existing tile layers
    map.eachLayer((layer) => {
      if (layer instanceof L.TileLayer) {
        map.removeLayer(layer);
      }
    });

    // Determine tile URL based on theme
    const isDark = resolvedTheme === "dark";
    const tileUrl = isDark
      ? "https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
      : "https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png";

    const attribution = isDark
      ? '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>'
      : '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>';

    L.tileLayer(tileUrl, {
      attribution,
      maxZoom: 19,
    }).addTo(map);
  }, [resolvedTheme]);

  return (
    <div className="relative w-full h-full min-h-[300px] md:min-h-0 rounded-2xl overflow-hidden border border-border shadow-inner">
      <div ref={mapContainerRef} className="w-full h-full z-10" />
      {/* Decorative overlay for glass/tech feel */}
      <div className="absolute inset-0 pointer-events-none border border-white/5 dark:border-white/5 rounded-2xl z-20 shadow-[inset_0_0_20px_rgba(0,0,0,0.15)]" />
    </div>
  );
}
