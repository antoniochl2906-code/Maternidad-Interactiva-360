export interface CalculatorResult {
  fecha: string;
  resultado: string;
  tipo: string;
  detalles?: Record<string, any>;
}

const STORAGE_KEY = "mi360_calculator_history";

export function saveCalculatorResult(result: CalculatorResult): void {
  if (typeof window === "undefined") return;
  
  try {
    const existing = getCalculatorHistory();
    const newHistory = [result, ...existing].slice(0, 50); // Mantener solo los últimos 50
    localStorage.setItem(STORAGE_KEY, JSON.stringify(newHistory));
  } catch (error) {
    console.error("Error saving calculator result:", error);
  }
}

export function getCalculatorHistory(): CalculatorResult[] {
  if (typeof window === "undefined") return [];
  
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (!stored) return [];
    return JSON.parse(stored);
  } catch (error) {
    console.error("Error reading calculator history:", error);
    return [];
  }
}

export function getCalculatorHistoryByType(tipo: string): CalculatorResult[] {
  return getCalculatorHistory().filter(r => r.tipo === tipo);
}

export function clearCalculatorHistory(): void {
  if (typeof window === "undefined") return;
  localStorage.removeItem(STORAGE_KEY);
}

