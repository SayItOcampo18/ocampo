<template>
  <div class="page">
    <div class="card">
      <div class="header">
        <h1>Mood Check-in</h1>
        <p>Share how you feel today and receive a supportive AI response.</p>
      </div>

      <form class="form" @submit.prevent="submitMood">
        <div class="form-group">
          <label for="name">Your Name</label>
          <input
            id="name"
            v-model="name"
            type="text"
            placeholder="Enter your name"
            required
          />
        </div>

        <div class="form-group">
          <label for="mood">How are you feeling today?</label>
          <textarea
            id="mood"
            v-model="mood"
            rows="5"
            placeholder="Write your thoughts here..."
            required
          ></textarea>
        </div>

        <button type="submit" :disabled="loading">
          {{ loading ? "Submitting..." : "Submit Mood" }}
        </button>
      </form>

      <div v-if="aiMessage" class="response-box">
        <h3>AI Advisor Response</h3>
        <p>{{ aiMessage }}</p>
      </div>

      <div v-if="errorMessage" class="error-box">
        <p>{{ errorMessage }}</p>
      </div>
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
      aiMessage: "",
      errorMessage: "",
      loading: false
    };
  },
  methods: {
    async submitMood() {
      this.loading = true;
      this.errorMessage = "";
      this.aiMessage = "";

      try {
        const res = await api.post("/mood", {
          full_name: this.name,
          mood_text: this.mood
        });

        this.aiMessage = res.data.ai_message;
        this.name = "";
        this.mood = "";
      } catch (error) {
        this.errorMessage =
          error.response?.data?.error || "Something went wrong. Please try again.";
      } finally {
        this.loading = false;
      }
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
  background: #ffffff;
  border-radius: 20px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.12);
  padding: 30px;
}

.header {
  text-align: center;
  margin-bottom: 25px;
}

.header h1 {
  margin: 0;
  font-size: 28px;
  color: #1f2937;
}

.header p {
  margin-top: 8px;
  color: #6b7280;
  font-size: 15px;
}

.form {
  display: flex;
  flex-direction: column;
  gap: 18px;
}

.form-group {
  display: flex;
  flex-direction: column;
}

label {
  margin-bottom: 8px;
  font-weight: 600;
  color: #374151;
}

input,
textarea {
  padding: 12px 14px;
  border: 1px solid #d1d5db;
  border-radius: 12px;
  font-size: 15px;
  outline: none;
  transition: 0.3s ease;
}

input:focus,
textarea:focus {
  border-color: #8b5cf6;
  box-shadow: 0 0 0 3px rgba(139, 92, 246, 0.15);
}

button {
  padding: 14px;
  border: none;
  border-radius: 12px;
  background: #8b5cf6;
  color: white;
  font-size: 16px;
  font-weight: bold;
  cursor: pointer;
  transition: 0.3s ease;
}

button:hover {
  background: #7c3aed;
}

button:disabled {
  background: #c4b5fd;
  cursor: not-allowed;
}

.response-box {
  margin-top: 24px;
  padding: 18px;
  border-radius: 14px;
  background: #f3f4f6;
  border-left: 5px solid #8b5cf6;
}

.response-box h3 {
  margin: 0 0 8px;
  color: #1f2937;
}

.response-box p {
  margin: 0;
  color: #374151;
  line-height: 1.5;
}

.error-box {
  margin-top: 16px;
  padding: 14px;
  border-radius: 12px;
  background: #fef2f2;
  color: #b91c1c;
  font-size: 14px;
}
</style>