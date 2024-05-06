from re import DEBUG, sub
from flask import Flask, render_template, request, redirect, send_file, url_for
from werkzeug.utils import secure_filename, send_from_directory
import os
import subprocess
from flask_cors import CORS

app = Flask(__name__)
CORS(app, supports_credentials=True, resources={
     r"/*": {"origins": "http://localhost:3000"}})


uploads_dir = os.path.join(app.instance_path, 'uploads')

os.makedirs(uploads_dir, exist_ok=True)


@app.route("/")
def hello_world():
    print("hello")
    return render_template('index.html')


@app.route("/detect", methods=['POST'])
def detect():
    print("detect")

    if not request.method == "POST":
        return
    print("video")
    # body = request.json
    # video = body['video']
    video = request.files['video']
    print("video", video)
    video.save(os.path.join(uploads_dir, secure_filename(video.filename)))
    print(video)
    subprocess.run("ls")
    subprocess.run(['python3', 'detect.py', '--source',
                    os.path.join(uploads_dir, secure_filename(video.filename))])

    subprocess.run(["cat", "detected.txt"])
    detected_classes = []
    with open("detected.txt", "r") as file:
        for line in file.readlines():
            # detected_classes.append(line.rstrip())
            detected_classes.append(eval(line.rstrip()))
    print("classes of array", detected_classes[0])

    # return os.path.join(uploads_dir, secure_filename(video.filename))
    obj = secure_filename(video.filename)

    print("obj", obj)
    return detected_classes[0]
    # return obj


@app.route("/test", methods=["GET"])
def hello_world2():
    print("HWETYWUYH")
    return "hi"

# @app.route('/display/<filename>')
# def display_video(filename):
# 	#print('display_video filename: ' + filename)
# 	return redirect(url_for('static/video_1.mp4', code=200))
