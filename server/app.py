from flask import Flask, request, jsonify
from flask_cors import CORS, cross_origin
import openai

openai.api_key = "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"

app = Flask(__name__)
CORS(app, resources={r"/*": {"origins": "*", "methods": ["POST", "OPTIONS"], "allow_headers": ["Content-Type", "application/json"]}})


@app.route('/generate_image', methods=['POST'])
@cross_origin()
def generate_image():
    data = request.json
    prompt = data.get('prompt', '')
    print(prompt)
    try:
        response = openai.Image.create(
            prompt=prompt,
            n=1,
            size="1024x1024"
        )
        print(response)
        image_url = response['data'][0]['url']
        print(image_url)
        return jsonify({'imageURL': image_url})  # Wrap in JSON object
    except Exception as e:
        print(e)
        return jsonify({'error': 'OpenAI API call failed'}), 500


if __name__ == '__main__':
    app.run(port=5000)

