<template>
  <div class="page">
    <div class="card">
      <h2>Mood Check-in</h2>

      <input v-model="name" placeholder="Your name" />

      <textarea
        v-model="mood"
        placeholder="How are you feeling today?"
      ></textarea>

      <button @click="submitMood">Submit</button>

      <p v-if="aiMessage">AI Advisor: {{ aiMessage }}</p>
    </div>
  </div>
</template>

<script>
import api from "../services/api";

export default {
  data() {
    return {
      name: "",
      mood: "",
      aiMessage: ""
    };
  },
  methods: {
    async submitMood() {
      const res = await api.post("/mood", {
        full_name: this.name,
        mood_text: this.mood
      });
      this.aiMessage = res.data.ai_message;
    }
  }
};
</script>

<style scoped>
.page {
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background: linear-gradient(135deg, #e0f2fe, #f3e8ff);
  padding: 20px;
}

.card {
  width: 100%;
  max-width: 500px;
  background: white;
  border-radius: 20px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.12);
  padding: 30px;
}

h2 {
  margin-bottom: 20px;
  color: #1f2937;
  text-align: center;
}

input,
textarea {
  width: 100%;
  margin-bottom: 15px;
  padding: 12px 14px;
  border: 1px solid #d1d5db;
  border-radius: 12px;
  font-size: 15px;
  box-sizing: border-box;
}

textarea {
  min-height: 120px;
  resize: vertical;
}

button {
  width: 100%;
  padding: 14px;
  border: none;
  border-radius: 12px;
  background: #8b5cf6;
  color: white;
  font-size: 16px;
  font-weight: bold;
  cursor: pointer;
}

button:hover {
  background: #7c3aed;
}

p {
  margin-top: 20px;
  padding: 14px;
  border-radius: 12px;
  background: #f3f4f6;
  color: #374151;
}
</style>