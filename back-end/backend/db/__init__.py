from pathlib import Path
import os
from pymongo import MongoClient
from dotenv import load_dotenv


env_path = Path(__file__).resolve().parent.parent / '.env'
load_dotenv(dotenv_path=env_path)

# connecting to mongoDB
client = MongoClient(os.environ.get('DATABASE_URL'))

# db connection
db = client['inked-memories']

user_collection = db["users"]
design_collection = db['designs']
cart_collection = db["cart"]
order_collection = db["orders"]