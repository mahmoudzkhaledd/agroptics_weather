"use client";
import BottomNavbar from "./_components/bottom-nav";
import MapProvider from "./_components/map-provider";
import Sidebar from "./_components/sidebar";

export default function MapPage() {
  return (
    <MapProvider>
      <main className="relative h-screen w-full">
        <BottomNavbar />
        <Sidebar />
        <div id="map-container" className="size-full" />
      </main>
    </MapProvider>
  );
}
