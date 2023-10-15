import { defineConfig, loadEnv } from 'vite'

import { config } from 'dotenv'
import { writeFileSync } from 'fs'

// Charger les variables d'environnement depuis le fichier .env
config()

// Récupérer les URLs depuis les variables d'environnement
const urls = {
  homepage: process.env.HOMEPAGE_URL,
  metronome: process.env.METRONOME_URL
}

// Créer un objet JSON avec les URLs
const data = { imports: urls }

// Écris l'objet json dans le fichier importmap.json
// Le fichier importmap.json est créé dans le dossier public
// et est accessible depuis l'URL http://localhost:9000/importmap.json
writeFileSync('./public/importmap.json', JSON.stringify(data))

export default defineConfig(({ mode }) => ({
  server: {
    port: 4173
  },
  preview: {
    port: 4173
  },
  plugins: [
    {
      name: 'write-importmap',
      buildStart() {
        // Récupérer les URLs depuis les variables d'environnement

        const env = loadEnv(mode, process.cwd(), '')
        const urls = {
          homepage: env.HOMEPAGE_URL,
          metronome: env.METRONOME_URL
        }

        // Créer un objet JSON avec les URLs
        const data = { imports: urls }

        // Écris l'objet json dans le fichier importmap.json
        // Le fichier importmap.json est créé dans le dossier public
        // et est accessible depuis l'URL http://localhost:9000/importmap.json
        writeFileSync('./public/importmap.json', JSON.stringify(data))
      }
    }
  ],
  build: {}
}))
