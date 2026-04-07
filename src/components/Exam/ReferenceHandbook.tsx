import React, { useState } from 'react';
import { BookOpen, X } from 'lucide-react';

/**
 * Reference Handbook Panel Component
 * Toggle-able reference material for the exam
 * In production, this would contain actual exam reference materials
 */
const ReferenceHandbook: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {/* Toggle Button */}
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 flex items-center gap-2 bg-primary-600 text-white px-4 py-3 rounded-lg shadow-lg hover:bg-primary-700 transition z-40"
      >
        <BookOpen size={20} />
        <span>Reference Handbook</span>
      </button>

      {/* Modal Overlay */}
      {isOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-96 flex flex-col">
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b border-slate-200">
              <div className="flex items-center gap-3">
                <BookOpen className="text-primary-600" size={24} />
                <h2 className="text-xl font-bold text-slate-900">Reference Handbook</h2>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="p-1 hover:bg-slate-100 rounded transition"
              >
                <X size={24} />
              </button>
            </div>

            {/* Content */}
            <div className="flex-1 overflow-y-auto p-6">
              <div className="space-y-6">
                {/* Section 1: Hydraulics */}
                <div>
                  <h3 className="text-lg font-bold text-slate-900 mb-3 pb-2 border-b border-slate-200">
                    Hydraulics Formulas
                  </h3>
                  <div className="space-y-3 text-sm text-slate-700 font-mono">
                    <div>
                      <p className="font-semibold">Manning Equation:</p>
                      <p>V = (1.49/n) × R^(2/3) × S^(1/2)</p>
                      <p className="text-xs text-slate-600 mt-1">Where: V=velocity (ft/s), n=Manning coefficient, R=hydraulic radius, S=slope</p>
                    </div>
                    <div>
                      <p className="font-semibold">Darcy-Weisbach Equation:</p>
                      <p>hf = f × (L/D) × (V²/2g)</p>
                      <p className="text-xs text-slate-600 mt-1">Where: hf=head loss, f=friction factor, L=pipe length, D=diameter, V=velocity, g=gravity</p>
                    </div>
                  </div>
                </div>

                {/* Section 2: Hydrology */}
                <div>
                  <h3 className="text-lg font-bold text-slate-900 mb-3 pb-2 border-b border-slate-200">
                    Hydrology Concepts
                  </h3>
                  <ul className="space-y-2 text-sm text-slate-700">
                    <li>• <strong>Rainfall Runoff:</strong> Q = C × I × A (Rational Method)</li>
                    <li>• <strong>Runoff Coefficient:</strong> Typical values: paved = 0.8-0.95, lawns = 0.05-0.35</li>
                    <li>• <strong>Concentration Time:</strong> Time for water to flow from furthest point to outlet</li>
                  </ul>
                </div>

                {/* Section 3: Unit Conversions */}
                <div>
                  <h3 className="text-lg font-bold text-slate-900 mb-3 pb-2 border-b border-slate-200">
                    Common Conversions
                  </h3>
                  <div className="grid grid-cols-2 gap-2 text-xs text-slate-700 font-mono">
                    <div>1 acre = 43,560 ft²</div>
                    <div>1 hp = 0.746 kW</div>
                    <div>1 psi = 2.31 ft H₂O</div>
                    <div>1 ft³/s = 448.8 gpm</div>
                    <div>1 MGD = 1.547 ft³/s</div>
                    <div>1 m³/s = 35.31 ft³/s</div>
                  </div>
                </div>

                {/* Disclaimer */}
                <div className="bg-blue-50 border border-blue-200 rounded p-4 text-xs text-blue-900">
                  <p>
                    <strong>Note:</strong> This is a sample reference handbook. In a production environment, 
                    this would contain the complete official NCEES reference materials.
                  </p>
                </div>
              </div>
            </div>

            {/* Footer */}
            <div className="flex items-center justify-end gap-3 p-6 border-t border-slate-200 bg-slate-50">
              <button
                onClick={() => setIsOpen(false)}
                className="px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition font-medium"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ReferenceHandbook;
