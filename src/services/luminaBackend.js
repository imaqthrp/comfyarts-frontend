/**
 * Lumina Backend Service
 * Connects ComfyArts frontend to Lumina Studio backend
 */

class LuminaBackendService {
  constructor() {
    this.baseURL = process.env.REACT_APP_BACKEND_URL || 'https://comfyarts.com/api';
    console.log('🔌 Lumina Backend initialized:', this.baseURL);
  }

  async fileToBase64(file) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        const base64String = reader.result.split(',')[1];
        resolve(base64String);
      };
      reader.onerror = error => reject(error);
    });
  }

  async urlToFile(imageUrl) {
    try {
      const response = await fetch(imageUrl);
      const blob = await response.blob();
      return new File([blob], 'image.jpg', { type: blob.type || 'image/jpeg' });
    } catch (error) {
      console.error('URL to File conversion failed:', error);
      throw error;
    }
  }

  async analyzeImage(imageFile, customPrompt = null) {
    try {
      console.log('📸 Analyzing image:', imageFile?.name || 'virtual image');

      const imageBase64 = await this.fileToBase64(imageFile);
      const mimeType = imageFile.type || 'image/jpeg';

      const prompt = customPrompt || 
        "Analyze this image. Describe style, lighting, character details, and composition in a single, high-density AI art prompt.";

      const response = await fetch(`${this.baseURL}/analyze-image`, {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          prompt,
          imageBase64,
          mimeType
        })
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`Backend error ${response.status}: ${errorText}`);
      }
      
      const data = await response.json();
      console.log('✅ Analysis complete');
      
      return data.analysis || 'Analysis failed - no content returned';
      
    } catch (error) {
      console.error('❌ analyzeImage error:', error);
      throw error;
    }
  }

  async buildStory(imageFile, config = {}) {
    try {
      console.log('📖 Building story with config:', config);

      const imageBase64 = await this.fileToBase64(imageFile);
      const mimeType = imageFile.type || 'image/jpeg';

      const requestBody = {
        imageBase64,
        imageDescription: config.idea || '',
        sceneCount: config.sceneCount || 6,
        style: config.style || 'Cinematic',
        preset: config.preset || '',
        themes: config.themes || [],
        aspectRatio: config.aspectRatio || '16:9',
        mimeType
      };

      const response = await fetch(`${this.baseURL}/build-story`, {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestBody)
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`Backend error ${response.status}: ${errorText}`);
      }
      
      const data = await response.json();
      console.log('✅ Story built:', data.scenes?.length || 0, 'scenes');
      
      return {
        analysis: data.analysis || '',
        scenes: data.scenes || []
      };
      
    } catch (error) {
      console.error('❌ buildStory error:', error);
      throw error;
    }
  }

  async brewPrompts(concept) {
    try {
      console.log('🧪 Brewing prompts for:', concept);

      const response = await fetch(`${this.baseURL}/brew-prompts`, {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ concept })
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`Backend error ${response.status}: ${errorText}`);
      }
      
      const data = await response.json();
      console.log('✅ Brewed', data.prompts?.length || 0, 'prompt variants');
      
      return data.prompts || [];
      
    } catch (error) {
      console.error('❌ brewPrompts error:', error);
      throw error;
    }
  }

  async checkHealth() {
    try {
      const healthURL = this.baseURL.replace('/api', '') + '/health';
      console.log('🏥 Checking backend health:', healthURL);

      const response = await fetch(healthURL);
      const data = await response.json();
      
      console.log('✅ Backend health:', data);
      return data;
      
    } catch (error) {
      console.error('❌ Backend health check failed:', error);
      return { 
        status: 'error', 
        message: error.message,
        backend: this.baseURL 
      };
    }
  }
}

export default new LuminaBackendService();