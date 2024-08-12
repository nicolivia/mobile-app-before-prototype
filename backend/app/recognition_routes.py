from flask import Flask, Blueprint, request, jsonify
from flask_cors import CORS
from tensorflow.keras.models import load_model
from tensorflow.keras.preprocessing.image import img_to_array
import numpy as np
import io
from PIL import Image
import base64

resnet_model = load_model('recognition_model/package_model.h5')  # Update path if needed
bp = Blueprint('product', __name__)

@bp.route('/predict', methods=['POST'])
def predict():
    data = request.json
    if 'image' not in data:
        return jsonify({'error': 'No image provided'}), 400

    image_data = data['image']
    try:
        # Decode base64 image data
        image_data = image_data.split(',')[1]  # Remove the data URL scheme part
        image_bytes = base64.b64decode(image_data)
        img = Image.open(io.BytesIO(image_bytes))
        img = img.convert('RGB')  # Ensure the image is in RGB format
        img = img.resize((300, 300))  # Resize according to the model's requirements
        x = img_to_array(img)  # Convert the image to an array
        x = np.expand_dims(x, axis=0)  # Add the batch dimension
        x = x / 255.0  # Normalize if the model was trained with normalization

        y_pred = resnet_model.predict(x)
        class_names = ['Ascozin', 'Bioflu', 'Biogesic', 'Bonamine', 'Buscopan', 'DayZinc', 'Decolgen', 'Flanax',
                       'Imodium', 'Lactezin', 'Lagundi', 'Midol', 'Myra_E', 'Neurogen_E', 'Omeprazole', 'Rinityn',
                       'Rogin_E', 'Sinecod', 'Tempra', 'Tuseran']

        class_idx = np.argmax(y_pred, axis=1)[0]
        confidence_score = y_pred[0][class_idx]
        class_name = class_names[class_idx]

        return jsonify({'predictions': class_name})
    except Exception as e:
        return jsonify({'error': str(e)}), 500