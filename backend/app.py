from flask import Flask, request, jsonify
from flask_cors import CORS
from deepface import DeepFace
import base64
import numpy as np
import cv2

app = Flask(__name__)
CORS(app)

# Load the Haar Cascade for face detection
face_cascade = cv2.CascadeClassifier('../src/haarcascade_frontalface_default.xml')

@app.route('/', methods=['GET'])
def index():
    return "Emotion detection backend is running!"

@app.route('/analyze', methods=['POST'])
def analyze():
    try:
        data = request.get_json()
        if 'image' not in data:
            return jsonify({'error': 'No image data found'}), 400

        image_data = data['image'].split(',')[1]
        image_bytes = base64.b64decode(image_data)
        nparr = np.frombuffer(image_bytes, np.uint8)
        img = cv2.imdecode(nparr, cv2.IMREAD_COLOR)

        # Convert to grayscale for the cascade
        gray = cv2.cvtColor(img, cv2.COLOR_BGR2GRAY)

        # Detect faces
        faces = face_cascade.detectMultiScale(gray, 1.1, 4)

        if len(faces) == 0:
            return jsonify({'error': 'No face detected in the image.'}), 400

        # Use the first detected face
        (x, y, w, h) = faces[0]
        face_img = img[y:y+h, x:x+w]

        # Analyze the emotion on the detected face
        analysis = DeepFace.analyze(face_img, actions=['emotion'], enforce_detection=False)

        if isinstance(analysis, list):
            analysis = analysis[0]

        dominant_emotion = analysis['dominant_emotion']
        confidence = float(analysis['emotion'][dominant_emotion])
        all_emotions = {k: float(v) for k, v in analysis['emotion'].items()}

        return jsonify({
            'emotion': dominant_emotion,
            'confidence': confidence,
            'all_emotions': all_emotions,
            'method': 'DeepFace with Haar Cascade',
            'box': {
                'x': int(x),
                'y': int(y),
                'w': int(w),
                'h': int(h)
            }
        })

    except Exception as e:
        return jsonify({'error': str(e)}), 500

if __name__ == '__main__':
    app.run(port=5000, debug=True)
