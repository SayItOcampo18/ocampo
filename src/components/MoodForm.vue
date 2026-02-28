<template>
  <div>
    <h2>Mood Check-in</h2>
    <input v-model="name" placeholder="Your name" />
    <textarea v-model="mood" placeholder="How are you feeling today?"></textarea>
    <button @click="submitMood">Submit</button>
    <p v-if="aiMessage">AI Advisor: {{ aiMessage }}</p>
  </div>
</template>

<script>
import api from '../services/api';

export default {
  data() {
    return { name: '', mood: '', aiMessage: '' };
  },
  async submitMood() {
    const res = await api.post('/mood', {
      full_name: this.name,
      mood_text: this.mood
    });
    this.aiMessage = res.data.ai_message;
  }
};
</script>