import React, { useState, useEffect } from 'react'
import ShiftItem from './ShiftItem.jsx'

const STORAGE_KEY = 'shiftStates';

const Table = ({ shifts }) => {
  // Load from localStorage or init with empty object
  const [shiftStates, setShiftStates] = useState(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch {
        return {};
      }
    }
    return {};
  });

  // Initialize state for new shifts not yet in shiftStates
  useEffect(() => {
    setShiftStates((prev) => {
      const updated = { ...prev };
      shifts.forEach((shift) => {
        if (!updated[shift.id]) {
          updated[shift.id] = {
            dueTips: 0,
            tipsStatus: 'due',
          };
        }
      });
      return updated;
    });
  }, [shifts]);

  // Save shiftStates to localStorage on every change
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(shiftStates));
  }, [shiftStates]);

  // Handlers
  const onDueTipsChange = (shiftId, value) => {
    setShiftStates((prev) => ({
      ...prev,
      [shiftId]: {
        ...prev[shiftId],
        dueTips: value,
      },
    }));
  };

  const onTipsStatusToggle = (shiftId) => {
    setShiftStates((prev) => ({
      ...prev,
      [shiftId]: {
        ...prev[shiftId],
        tipsStatus: prev[shiftId].tipsStatus === 'due' ? 'paid' : 'due',
      },
    }));
  };

  const totalDueTips = Object.values(shiftStates)
    .filter((s) => s.tipsStatus === 'due')
    .reduce((acc, s) => acc + s.dueTips, 0)
    .toFixed(2);

  return (
    <div className='table'>
      <div style={{ marginBottom: '1rem', fontWeight: 'bold' }}>
        Total Due Tips: ${totalDueTips}
      </div>

      <table>
        <thead>
          <tr>
            {["Date", "Day", "Shift", "Tips", "Status", ""].map((i, index) => (
              <th key={index}>{i}</th>
            ))}
          </tr>
        </thead>

        <tbody>
          {shifts.map((shift) => (
            <tr key={shift.id}>
              <ShiftItem
                shift={shift}
                dueTips={shiftStates[shift.id]?.dueTips ?? 0}
                tipsStatus={shiftStates[shift.id]?.tipsStatus ?? 'due'}
                onDueTipsChange={onDueTipsChange}
                onTipsStatusToggle={onTipsStatusToggle}
              />
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Table;
