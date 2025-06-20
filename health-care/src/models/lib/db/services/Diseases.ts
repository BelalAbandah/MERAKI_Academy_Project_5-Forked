import pool from "../index";

export type Disease = {
  id ?:number
  name: string;
  effectedBodyPart: [];
  symptoms: [];
  treatments: [];
};

export const AddDisease = async (newDisease: Disease) => {
  const result = await pool.query(
    "INSERT INTO diseases (name, effectedBodyPart, symptoms, treatments) VALUES ($1,$2,$3,$4) RETURNING *",
    [
      newDisease.name.toLowerCase(),
      newDisease.effectedBodyPart,
      newDisease.symptoms,
      newDisease.treatments,
    ]
  );

  return result.rows;
};

export const DiseaseByTreatments = async (treatments: string) => {
  const result = await pool.query(
    "SELECT * FROM diseases WHERE treatments @> ARRAY[$1]",
    [treatments]
  );

  return result.rows;
};

export const DiseaseBySymptoms = async (symptoms: string) => {
  const result = await pool.query(
    "SELECT * FROM diseases WHERE symptoms @> ARRAY[$1]",
    [symptoms]
  );

  return result.rows;
};

export const DiseaseByEffectedBodyPart = async (effectedBodyPart: string) => {
  const result = await pool.query(
    "SELECT * FROM diseases WHERE effectedBodyPart = ($1)",
    [effectedBodyPart]
  );

  return result.rows;
};
