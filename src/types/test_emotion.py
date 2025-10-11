import requests
import base64
import json

# Test the emotion detection endpoint
def test_emotion_detection():
    # You can test with a sample image URL or use a local image
    url = "http://127.0.0.1:5000/api/detect-emotion"
    
    # For now, just test the connection
    try:
        response = requests.get("http://127.0.0.1:5000/api/health")
        print("Health check:", response.json())
        
        # Test POST request structure (without actual image data)
        test_data = {
            "image": "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAABAAEDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAUEAEAAAAAAAAAAAAAAAAAAAAA/8QAFQEBAQAAAAAAAAAAAAAAAAAAAAX/xAAUEQEAAAAAAAAAAAAAAAAAAAAA/9oADAMBAAIRAxEAPwCdABmX/9k="
        }
        
        response = requests.post(url, json=test_data)
        print("Emotion detection test:", response.json())
        
    except Exception as e:
        print("Error:", e)

if __name__ == "__main__":
    test_emotion_detection()