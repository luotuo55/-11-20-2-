export enum SlideType {
  INTRO = 'INTRO',
  WARMUP = 'WARMUP',
  CONCEPT_ABACUS = 'CONCEPT_ABACUS',
  LEARN_11 = 'LEARN_11',
  LEARN_15 = 'LEARN_15',
  LEARN_20 = 'LEARN_20',
  SUMMARY = 'SUMMARY',
  PRACTICE = 'PRACTICE'
}

export interface SlideData {
  id: SlideType;
  title: string;
  description: string;
  voiceOverText: string; // Text for the AI to elaborate on
}

export interface AbacusProps {
  tens: number;
  ones: number;
  interactive?: boolean;
  onUpdate?: (tens: number, ones: number) => void;
}

export interface StickBundleProps {
  count: number; // Total number (e.g., 11)
}