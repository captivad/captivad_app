// ─────────────────────────────────────────────────────────────────────────────
// HOOK — intersection observer untuk lazy-render section
// ─────────────────────────────────────────────────────────────────────────────

import React, { useEffect } from "react";
import { useState } from "react";

function useSectionVisibility(keys: string[], threshold = 0.2) {
  const [visible, setVisible] = useState<Record<string, boolean>>(() =>
    Object.fromEntries(keys.map((k) => [k, false]))
  );

  const refs = React.useMemo(
    () =>
      Object.fromEntries(
        keys.map((k) => [k, React.createRef<HTMLDivElement>()])
      ),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  );

  useEffect(() => {
    const observers = Object.entries(refs).map(([key, ref]) => {
      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting)
            setVisible((prev) => ({ ...prev, [key]: true }));
        },
        { threshold }
      );
      if (ref.current) observer.observe(ref.current);
      return observer;
    });

    return () => observers.forEach((obs) => obs.disconnect());
  }, [refs, threshold]);

  return { visible, refs };
}

export default useSectionVisibility;
