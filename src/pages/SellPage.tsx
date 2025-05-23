// src/pages/SellPage.tsx

import { useState } from 'react'
import { createClient } from '@supabase/supabase-js'

// 🔧 Crée le client Supabase ici (plus d'import cassé)
const supabase = createClient(
  'https://qlwrbditbshcvaclomqw.supabase.co',
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InFsd3JiZGl0YnNoY3ZhY2xvbXF3Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDc5MzMxMjYsImV4cCI6MjA2MzUwOTEyNn0.UyNyJyzUtJoNVy9sFxoBvl4UX1Q1i79o3vNpFpjKIiQ'
)

export default function SellPage() {
  const [formData, setFormData] = useState({
    nom: '',
    categorie: 'Femme',
    description: '',
    prix: '',
    localisation: '',
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { id, value } = e.target
    setFormData({ ...formData, [id]: value })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    const { error } = await supabase.from('articles').insert([{
      nom: formData.nom,
      categorie: formData.categorie,
      description: formData.description,
      prix: Number(formData.prix),
      localisation: formData.localisation
    }])

    if (error) {
      alert('❌ Erreur : ' + error.message)
    } else {
      alert('✅ Article ajouté avec succès !')
      setFormData({
        nom: '',
        categorie: 'Femme',
        description: '',
        prix: '',
        localisation: '',
      })
    }
  }

  return (
    <div style={{ padding: '2rem', maxWidth: 600, margin: 'auto' }}>
      <h1>🛍️ Vendre un article</h1>
      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        <input id="nom" value={formData.nom} onChange={handleChange} placeholder="Nom du produit" required />
        <select id="categorie" value={formData.categorie} onChange={handleChange}>
          <option>Femme</option>
          <option>Homme</option>
          <option>Enfant</option>
          <option>Maison</option>
          <option>Électronique</option>
        </select>
        <textarea id="description" value={formData.description} onChange={handleChange} placeholder="Description" />
        <input type="number" id="prix" value={formData.prix} onChange={handleChange} placeholder="Prix en FCFA" />
        <input id="localisation" value={formData.localisation} onChange={handleChange} placeholder="Localisation" />
        <button type="submit">Mettre en vente</button>
      </form>
    </div>
  )
}
