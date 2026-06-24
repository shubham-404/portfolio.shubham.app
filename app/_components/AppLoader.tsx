"use client";

import { useEffect, useState } from "react";
import Loader from "./Loader";

export default function AppLoader({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isReady, setIsReady] = useState(false);
  const [showLoader, setShowLoader] = useState(false);

  useEffect(() => {
    const hasLoadedBefore = sessionStorage.getItem(
      "shubham-404-initial-load"
    );

    if (hasLoadedBefore) {
      setIsReady(true);
      return;
    }

    setShowLoader(true);
  }, []);

  const handleLoaderComplete = () => {
    sessionStorage.setItem(
      "shubham-404-initial-load",
      "true"
    );

    setShowLoader(false);
    setIsReady(true);
  };

  if (!isReady && showLoader) {
    return <Loader onComplete={handleLoaderComplete} />;
  }

  if (!isReady) {
    return null;
  }

  return <>{children}</>;
}