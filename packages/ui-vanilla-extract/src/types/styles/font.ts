export type FontVariant = 'H1' | 'H2' | 'H3' | 'H4' | 'B1' | 'B2' | 'B3' | 'C1' | 'C2' | 'C3';

export type FontVariantStyle = {
  fontSize: string;
  letterSpacing: number;
  lineHeight: string;
};

export type FontVariantInfo = { [T in FontVariant]: FontVariantStyle };

export type FontWeight = 'regular' | 'medium' | 'bold';

export type FontWeightStyle = {
  fontWeight: number;
};

export type FontWeightInfo = { [T in FontWeight]: FontWeightStyle };
