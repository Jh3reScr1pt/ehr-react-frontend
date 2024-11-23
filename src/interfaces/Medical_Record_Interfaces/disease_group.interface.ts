export interface DiseaseGroup {
  id: number;
  name: string; // Nombre único del grupo de enfermedades
  description?: string; // Descripción opcional del grupo
  createdAt: Date;
  updatedAt: Date;
}

export type CreateDiseaseGroup = Omit<
  DiseaseGroup,
  'id' | 'createdAt' | 'updatedAt'
>;
