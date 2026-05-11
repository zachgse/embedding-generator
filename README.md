# Embedded Value Generator

A lightweight embedding generator built with Next.js and the `all-MiniLM-L6-v2` transformer model using Hugging Face Transformers.js.

This application converts text into vector embeddings for AI-powered applications such as:
- RAG (Retrieval-Augmented Generation)
- Semantic search
- AI chatbots
- Recommendation systems
- Similarity comparison

---

# Features

- Generate embeddings from text input
- Powered by `all-MiniLM-L6-v2`
- Lightweight and beginner-friendly
- Frontend loading states
- Backend error handling
- Toast notifications for feedback
- Modern responsive UI
- Built with Next.js + TypeScript

---

# Tech Stack

- Next.js 16
- React 19
- TypeScript
- Tailwind CSS v4
- Hugging Face Transformers.js
- React Hook Form
- React Toastify

---

# Installation

Clone the repository:

```bash
git clone <your-repository-url>
```

Install dependencies:

```bash
npm install
```

---

# Running the Project

Development server:

```bash
npm run dev
```

Production build:

```bash
npm run build
npm start
```

---

# How It Works

1. User enters text input
2. Frontend sends request to API route
3. Backend generates embeddings using `all-MiniLM-L6-v2`
4. Vector embeddings are returned as JSON
5. Results are displayed in the UI

---

# Example Response

```json
{
  "embedding": [
    0.021,
    -0.118,
    0.442
  ]
}
```

---

# Error Handling

The application includes:
- Backend try/catch error handling
- Invalid input validation
- Frontend loading states
- Toast notifications for failed requests
- Safe API response handling

---

# Use Cases

- Portfolio AI chatbot
- Semantic search engine
- Vector database preparation
- RAG pipelines
- AI experimentation
- Text similarity systems

---

# Model Used

`all-MiniLM-L6-v2`

A lightweight open-source sentence-transformer model optimized for semantic embeddings and fast inference.

---

# License

MIT