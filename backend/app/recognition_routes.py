from flask import Flask,Blueprint, request, jsonify
from flask_cors import CORS
from tensorflow.keras.models import load_model
from tensorflow.keras.preprocessing.image import img_to_array
import numpy as np
import io
from PIL import Image

resnet_model = load_model('recognition_model/package_model.h5') ##should change
bp = Blueprint('product', __name__)

@bp.route('/predict', methods=['POST'])
def predict():
    if 'file' not in request.files:
        return jsonify({'error': 'No file provided'}), 400

    file = request.files['file']
    if file.filename == '':
        return jsonify({'error': 'No selected file'}), 400

    img = Image.open(io.BytesIO(file.read()))
    img = img.convert('RGB')  # Ensure the image is in RGB format
    img = img.resize((300, 300))  # Resize according to the model's requirements
    x = img_to_array(img)  # Convert the image to an array
    x = np.expand_dims(x, axis=0)  # Add the batch dimension
    x = x / 255.0  # Normalize if the model was trained with normalization

    try:
        y_pred = resnet_model.predict(x)
        class_names = ['Ascozin', 'Bioflu', 'Biogesic', 'Bonamine', 'Buscopan', 'DayZinc', 'Decolgen', 'Flanax',
                       'Imodium', 'Lactezin', 'Lagundi', 'Midol', 'Myra_E', 'Neurogen_E', 'Omeprazole', 'Rinityn',
                       'Rogin_E', 'Sinecod', 'Tempra', 'Tuseran']

        # Get the predicted class index and confidence score
        class_idx = np.argmax(y_pred, axis=1)[0]
        confidence_score = y_pred[0][class_idx]
        class_name = class_names[class_idx]  # Map to class name

        print(f'Predicted Class name: {class_name}')  # Output prediction result to server log
        print(f'Confidence Score: {confidence_score}')  # Output confidence to server log

        return jsonify({'predictions': class_name, 'confidence': float(confidence_score)})
    except Exception as e:
        return jsonify({'error': str(e)}), 500
