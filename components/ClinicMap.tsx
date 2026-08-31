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

const PIN_SVG = `<svg viewBox="0 0 26 30" width="34" height="39" aria-hidden="true"><path d="M13 1C6.9 1 2 5.8 2 11.7 2 19.6 13 29 13 29s11-9.4 11-17.3C24 5.8 19.1 1 13 1z" fill="#F37521" stroke="#ffffff" stroke-width="1.4"/><circle cx="13" cy="11.4" r="4.2" fill="#ffffff"/></svg>`;

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
