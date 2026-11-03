import { useEffect, useState } from 'react';
import { admissionsYear } from '../lib/logic';

export default function AdmissionsYear() {
  const [year, setYear] = useState(() => {
    // Match the prerendered year first, then refresh from the visitor's current date.
    const builtYear =
      typeof document === 'undefined'
        ? undefined
        : document.getElementById('root')?.dataset.admissionsYear;
    return builtYear || admissionsYear();
  });

  useEffect(() => {
    setYear(admissionsYear());
    // Refresh a tab left open across midnight without a manual annual edit.
    const timer = window.setInterval(() => setYear(admissionsYear()), 1000);
    return () => window.clearInterval(timer);
  }, []);

  return <span className="admissions-year">{year}</span>;
}
