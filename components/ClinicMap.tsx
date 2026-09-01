"use client";

import { useEffect, useRef } from "react";
import {
  Map as MLMap,
  Marker,
  Popup,
  LngLatBounds,
  NavigationControl,
} from "maplibre-gl";
import "maplibre-gl/dist/maplibre-gl.css";

export type MapMarker = {
  slug: string;
  name: string;
  city: string;
  lng: number;
  lat: number;
  rating: number | null;
  reviews: number;
  image: string;
};

const PIN_SVG = "<svg xmlns=\"http://www.w3.org/2000/svg\" width=\"31\" height=\"48\" viewBox=\"0 0 141 220\"><defs><linearGradient id=\"g\" x1=\"885.69\" y1=\"539.56\" x2=\"1034.94\" y2=\"539.56\" gradientUnits=\"userSpaceOnUse\"><stop offset=\"0\" stop-color=\"#F67E50\"></stop><stop offset=\".5\" stop-color=\"#F15A25\"></stop><stop offset=\"1\" stop-color=\"#D14A1A\"></stop></linearGradient></defs><g transform=\"translate(0 0) scale(0.910219) translate(-883 -418.7)\"><path d=\"M960.31,421.46c-42.58,0-74.61,34.52-74.61,77.09,0,49.69,29.66,78.86,50.84,112.98,15.87,25.59,17.94,46.12,23.78,46.12s7.92-20.53,23.79-46.12c21.18-34.13,50.84-63.29,50.84-112.98,0-42.58-32.06-77.09-74.63-77.09ZM1004.06,546.56c-10.11,9.7-20.85,18.51-29.9,29.15-8.72,9.89-15.87,21.23-19.26,33.87-.97,3.63-1.54,7.48-1.54,11.43.15.89-1.08,1.42-1.57.63-4.89-7.61-4.69-17.35-2.4-25.78,6.16-20.8,24-35.78,42.4-45.67,3.73-1.81,7.49-3.54,11.32-5.05.84-.36,1.61.79.94,1.42ZM1017.03,515.12c-7.24,15.28-23.73,17.96-47.96,28.52-21.14,9.2-30.89,26.22-35.12,36.88-.68,1.74-3.06,1.97-4.07.38-14.64-23.08-27.08-46.24-27.08-77.92,0-36.11,25.26-64.4,57.51-64.4s57.53,28.29,57.53,64.4c0,3.9-.22,7.66-.58,11.32-.02.29-.1.56-.22.82ZM960.31,462.99c-15.57,0-28.21,12.64-28.21,28.21s12.64,28.22,28.21,28.22,28.22-12.64,28.22-28.22-12.64-28.21-28.22-28.21ZM960.31,506.06c-8.18,0-14.85-6.67-14.85-14.86s6.67-14.85,14.85-14.85,14.86,6.67,14.86,14.85-6.67,14.86-14.86,14.86Z\" fill=\"url(#g)\"></path></g></svg>";

const STYLE = "https://tiles.openfreemap.org/styles/liberty";

export default function ClinicMap({
  markers,
  hoveredSlug,
  className,
  interactive = true,
}: {
  markers: MapMarker[];
  hoveredSlug?: string | null;
  className?: string;
  interactive?: boolean;
}) {
  const container = useRef<HTMLDivElement>(null);
  const mapRef = useRef<MLMap | null>(null);
  const els = useRef<Map<string, HTMLElement>>(new Map());

  useEffect(() => {
    if (!container.current) return;
    const map = new MLMap({
      container: container.current,
      style: STYLE,
      interactive,
      attributionControl: { compact: true },
      cooperativeGestures: interactive,
    });
    mapRef.current = map;
    if (interactive) {
      map.addControl(new NavigationControl({ showCompass: false }), "top-right");
    }

    const bounds = new LngLatBounds();
    markers.forEach((m) => {
      bounds.extend([m.lng, m.lat]);
      const el = document.createElement("div");
      el.className = "ct-pin";
      el.innerHTML = PIN_SVG;
      els.current.set(m.slug, el);

      const marker = new Marker({ element: el, anchor: "bottom" })
        .setLngLat([m.lng, m.lat])
        .addTo(map);

      if (interactive) {
        const popupHtml = `
          <a href="/clinic/${m.slug}" class="ct-popup">
            <img src="${m.image}" alt="" />
            <span class="ct-popup-body">
              <span class="ct-popup-name">${m.name}</span>
              <span class="ct-popup-meta">${m.city}${
                m.rating ? ` · ★ ${m.rating.toFixed(1)} (${m.reviews})` : ""
              }</span>
            </span>
          </a>`;
        marker.setPopup(
          new Popup({ offset: 28, closeButton: false, maxWidth: "260px" }).setHTML(
            popupHtml
          )
        );
      }
    });

    if (markers.length === 1) {
      map.jumpTo({ center: [markers[0].lng, markers[0].lat], zoom: 13 });
    } else if (markers.length > 1) {
      map.fitBounds(bounds, { padding: 70, duration: 0, maxZoom: 11 });
    }

    return () => {
      els.current.clear();
      map.remove();
      mapRef.current = null;
    };
    // markers identity is stable per search render; re-init on list change
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [JSON.stringify(markers.map((m) => m.slug)), interactive]);

  useEffect(() => {
    els.current.forEach((el, slug) => {
      el.classList.toggle("ct-pin-active", slug === hoveredSlug);
    });
  }, [hoveredSlug]);

  return <div ref={container} className={className} />;
}
