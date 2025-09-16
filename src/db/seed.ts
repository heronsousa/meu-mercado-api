import { v7 as uuidv7 } from "uuid";
import { db } from ".";
import { category } from "./schema";

const categories = [
  {"code": "01","description": "Animais vivos"},
  {"code": "02","description": "Carnes"},
  {"code": "03","description": "Peixes"},
  {"code": "04","description": "Laticínios"},
  {"code": "0407","description": "Ovos"},
  {"code": "05","description": "Produtos animais"},
  {"code": "06","description": "Floricultura"},
  {"code": "07","description": "Legumes e Verduras"},
  {"code": "08","description": "Frutas"},
  {"code": "09","description": "Café e especiarias"},
  {"code": "10","description": "Cereais"},
  {"code": "11","description": "Moagem"},
  {"code": "12","description": "Sementes e oleaginosas"},
  {"code": "13","description": "Resinas vegetais"},
  {"code": "14","description": "Plantas medicinais"},
  {"code": "15","description": "Óleos e gorduras"},
  {"code": "16","description": "Preparações carne"},
  {"code": "17","description": "Açúcares"},
  {"code": "18","description": "Chocolates"},
  {"code": "19","description": "Cereais"},
  {"code": "1902","description": "Massas"},
  {"code": "20","description": "Preparações vegetais"},
  {"code": "21","description": "Alimentos diversos"},
  {"code": "22","description": "Bebidas alcoólicas"},
  {"code": "23","description": "Resíduos alimentares"},
  {"code": "24","description": "Tabaco"},
  {"code": "25","description": "Minerais básicos"},
  {"code": "26","description": "Minérios"},
  {"code": "27","description": "Combustíveis minerais"},
  {"code": "28","description": "Químicos inorgânicos"},
  {"code": "29","description": "Químicos orgânicos"},
  {"code": "30","description": "Farmacêuticos"},
  {"code": "31","description": "Fertilizantes"},
  {"code": "32","description": "Tintas e pigmentos"},
  {"code": "33","description": "Perfumaria"},
  {"code": "34","description": "Produtos limpeza"},
  {"code": "35","description": "Enzimas e colas"},
  {"code": "36","description": "Explosivos"},
  {"code": "37","description": "Fotografia"},
  {"code": "38","description": "Químicos diversos"},
  {"code": "39","description": "Plásticos"},
  {"code": "40","description": "Borracha"},
  {"code": "41","description": "Couros"},
  {"code": "42","description": "Bolsas e malas"},
  {"code": "43","description": "Peles"},
  {"code": "44","description": "Madeira"},
  {"code": "45","description": "Cortiça"},
  {"code": "46","description": "Cestaria"},
  {"code": "47","description": "Papel reciclado"},
  {"code": "48","description": "Papel e cartão"},
  {"code": "49","description": "Publicações"},
  {"code": "50","description": "Seda"},
  {"code": "51","description": "Lã"},
  {"code": "52","description": "Algodão"},
  {"code": "53","description": "Fibras vegetais"},
  {"code": "54","description": "Filamentos sintéticos"},
  {"code": "55","description": "Fibras sintéticas"},
  {"code": "56","description": "Tecidos especiais"},
  {"code": "57","description": "Tapetes"},
  {"code": "58","description": "Tecidos decorativos"},
  {"code": "59","description": "Tecidos técnicos"},
  {"code": "60","description": "Malhas"},
  {"code": "61","description": "Vestuário malha"},
  {"code": "62","description": "Vestuário"},
  {"code": "63","description": "Artigos têxteis"},
  {"code": "64","description": "Calçados"},
  {"code": "65","description": "Chapéus"},
  {"code": "66","description": "Guarda-chuvas"},
  {"code": "67","description": "Penas e cabelo"},
  {"code": "68","description": "Pedra e gesso"},
  {"code": "69","description": "Cerâmica"},
  {"code": "70","description": "Vidro"},
  {"code": "71","description": "Metais preciosos"},
  {"code": "72","description": "Ferro e aço"},
  {"code": "73","description": "Metais trabalhados"},
  {"code": "74","description": "Cobre"},
  {"code": "75","description": "Níquel"},
  {"code": "76","description": "Alumínio"},
  {"code": "78","description": "Chumbo"},
  {"code": "79","description": "Zinco"},
  {"code": "80","description": "Estanho"},
  {"code": "81","description": "Metais comuns"},
  {"code": "82","description": "Ferramentas"},
  {"code": "83","description": "Metais diversos"},
  {"code": "84","description": "Máquinas mecânicas"},
  {"code": "85","description": "Máquinas elétricas"},
  {"code": "86","description": "Trilhos e veículos"},
  {"code": "87","description": "Veículos automóveis"},
  {"code": "88","description": "Aeronaves"},
  {"code": "89","description": "Embarcações"},
  {"code": "90","description": "Instrumentos ópticos"},
  {"code": "91","description": "Relógios"},
  {"code": "92","description": "Instrumentos musicais"},
  {"code": "93","description": "Armas"},
  {"code": "94","description": "Móveis"},
  {"code": "95","description": "Brinquedos"},
  {"code": "96","description": "Diversos"},
  {"code": "97","description": "Arte e coleção"},
  {"code": "-","description": "Outros"}
]


async function main() {
  try {
    await db.delete(category);

    for (const categoryData of categories) {
      await db.insert(category).values({
        id: uuidv7(),
        description: categoryData.description,
        code: categoryData.code
      });
    }
  } catch (error) {
    console.error("❌ Error during seeding:", error);
    throw error;
  }
}

main().catch(console.error);